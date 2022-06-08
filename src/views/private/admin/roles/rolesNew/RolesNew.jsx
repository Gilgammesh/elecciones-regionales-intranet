/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Formsy from 'formsy-react'
import PageCarded from 'components/core/PageCarded'
import RolesNewHeader from './RolesNewHeader'
import RolesNewForm from './RolesNewForm'
import useForm from 'hooks/useForm'
import { fetchData } from 'services/fetch'
import { validateFetchData } from 'helpers/validateFetchData'
import { Toast } from 'configs/settings'
import { startResetPermisos } from 'redux/actions/permisos'

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Rol Nuevo //
/*******************************************************************************************************/
const RolesNew = () => {
  // Llamamos al history de las rutas
  const history = useHistory()

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos la lista de permisos del Rol
  const permisos = useSelector(state => state.permisos)

  // Estado inicial si el formulario es válido
  const [isFormValid, setIsFormValid] = useState(false)

  // Estado inicial del formulario
  const initialForm = {
    codigo: 1,
    nombre: '',
    descripcion: ''
  }

  // Usamos el Hook personalizado de formularios
  const [formValues, handleInputChange, resetForm] = useForm(initialForm)

  // Efecto para limpiar los submodulos de redux
  useEffect(() => {
    dispatch(startResetPermisos())
  }, [dispatch])

  // Función que se ejecuta cuando se envia el formulario
  const handleSubmit = async () => {
    // Guardamos la data del rol
    const result = await fetchData(
      'admin/roles',
      { isTokenReq: true },
      'POST',
      {
        ...formValues,
        permisos
      }
    )
    // Validamos el resultado
    if (validateFetchData(result)) {
      // Reseteamos el formulario
      resetForm(initialForm)
      // Avisamos con un toast alert
      Toast.fire({
        icon: 'success',
        title: result.data.msg
      })
      // Redireccionamos a lista de roles
      history.push('/admin/roles')
    }
  }

  // Función que deshabilita el botón de envio si el formulario no es válido
  const disableButton = () => {
    setIsFormValid(false)
  }

  // Función que habilita el botón de envio si el formulario es válido
  const enableButton = () => {
    setIsFormValid(true)
  }

  // Renderizamos el componente
  return (
    <Formsy
      onValidSubmit={handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
    >
      <PageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
        }}
        header={<RolesNewHeader isFormValid={isFormValid} />}
        contentToolbar={
          <div className="px-16 sm:px-24">
            <h2>Registro</h2>
          </div>
        }
        content={
          <RolesNewForm
            formValues={formValues}
            handleInputChange={handleInputChange}
          />
        }
        innerScroll
      />
    </Formsy>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default RolesNew
