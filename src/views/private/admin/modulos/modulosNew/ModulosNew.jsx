/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Formsy from 'formsy-react'
import PageCarded from 'components/core/PageCarded'
import ModulosNewHeader from './ModulosNewHeader'
import ModulosNewForm from './ModulosNewForm'
import useForm from 'hooks/useForm'
import { fetchData } from 'services/fetch'
import { validateFetchData } from 'helpers/validateFetchData'
import { Toast } from 'configs/settings'
import { startResetSubmodulos } from 'redux/actions/submodulos'

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Módulo Nuevo //
/*******************************************************************************************************/
const ModulosNew = () => {
  // Llamamos al history de las rutas
  const history = useHistory()

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
    type: 'item',
    icon: '',
    url: ''
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
    // Inicializamos la data
    let data = null
    // Si el tipo de módulo no tiene submódulos
    if (formValues.type === 'item') {
      data = formValues
    }
    // Si el tipo de módulo tiene submódulos
    if (formValues.type === 'collapse') {
      delete formValues.url
      data = {
        ...formValues,
        children: submodulos
      }
    }
    // Guardamos la data del módulo
    const result = await fetchData(
      'admin/modulos',
      { isTokenReq: true },
      'POST',
      data
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
        header={<ModulosNewHeader isFormValid={isFormValid} />}
        contentToolbar={
          <div className="px-16 sm:px-24">
            <h2>Registro</h2>
          </div>
        }
        content={
          <ModulosNewForm
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
export default ModulosNew
