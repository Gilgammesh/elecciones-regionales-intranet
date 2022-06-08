/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Formsy from 'formsy-react'
import PageCarded from 'components/core/PageCarded'
import ModulosEditHeader from './ModulosEditHeader'
import ModulosEditForm from './ModulosEditForm'
import useForm from 'hooks/useForm'
import { fetchData } from 'services/fetch'
import { validateFetchData } from 'helpers/validateFetchData'
import { startResetSubmodulos } from 'redux/actions/submodulos'
import { Toast } from 'configs/settings'

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Módulo Editar //
/*******************************************************************************************************/
const ModulosEdit = () => {
  // Llamamos al history de las rutas
  const history = useHistory()

  // Obtenemos el id del módulo de los parámetros de la ruta
  const { id } = useParams()

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos la lista de submódulos
  const submodulos = useSelector(state => state.submodulos)

  // Estado inicial si el formulario es válido
  const [isFormValid, setIsFormValid] = useState(false)

  // Estado inicial del formulario
  const initialForm = {
    orden: 1,
    tag: '',
    nombre: '',
    descripcion: '',
    type: null,
    icon: '',
    url: '',
    estado: true
  }

  // Usamos el Hook personalizado de formularios
  const [formValues, handleInputChange, resetForm, setForm] =
    useForm(initialForm)

  // Efecto para limpiar los submodulos
  useEffect(() => {
    dispatch(startResetSubmodulos())
  }, [dispatch])

  // Función que se ejecuta cuando se envia el formulario
  const handleSubmit = async () => {
    // Actualizamos la data del módulo
    const result = await fetchData(
      `admin/modulos/${id}`,
      { isTokenReq: true },
      'PUT',
      {
        ...formValues,
        children: submodulos
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
      // Redireccionamos a lista de módulos
      history.push('/admin/modulos')
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
        header={<ModulosEditHeader isFormValid={isFormValid} />}
        contentToolbar={
          <div className="px-16 sm:px-24">
            <h2>Módulo</h2>
          </div>
        }
        content={
          <ModulosEditForm
            formValues={formValues}
            handleInputChange={handleInputChange}
            setForm={setForm}
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
export default ModulosEdit
