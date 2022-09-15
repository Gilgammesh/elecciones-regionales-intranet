/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Formsy from 'formsy-react'
import PageCarded from 'components/core/PageCarded'
import GobernadoresEditHeader from './GobernadoresEditHeader'
import GobernadoresEditForm from './GobernadoresEditForm'
import useForm from 'hooks/useForm'
import { fetchData } from 'services/fetch'
import { validateFetchData } from 'helpers/validateFetchData'
import { Toast } from 'configs/settings'

/*******************************************************************************************************/
// Definimos la Vista del componente Gobernador Editar //
/*******************************************************************************************************/
const GobernadoresEdit = () => {
  // Llamamos al history de las rutas
  const history = useHistory()

  // Obtenemos el id del usuario de los parámetros de la ruta
  const { id } = useParams()

  // Obtenemos los datos de Usuario
  const usuario = useSelector(state => state.auth.usuario)

  // Estado inicial si el formulario es válido
  const [isFormValid, setIsFormValid] = useState(false)

  // Estado del archivo de imagen
  const [fileState, setFileState] = useState('none')

  // Estado inicial del formulario
  const initialForm = {
    nombres: '',
    apellidos: '',
    dni: '',
    organizacion: '',
    departamento: usuario.departamento ? usuario.departamento._id : '',
    file: null
  }

  // Usamos el Hook personalizado de formularios
  const [formValues, handleInputChange, resetForm, setForm] = useForm(initialForm)

  // Función que se ejecuta cuando se envia el formulario
  const handleSubmit = async () => {
    // Convertimos los valores del formulario a form-data
    let formData = new FormData()
    // Recorremos los valores del formulario y guardamos
    Object.keys(formValues).forEach(key => {
      formData.append(key, formValues[key])
    })
    // Actualizamos la data del gobernador
    const result = await fetchData(
      `organizaciones-politicas/gobernadores/${id}?fileState=${fileState}`,
      { isTokenReq: true, contentType: 'multipart/form-data' },
      'PUT',
      formData
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
      // Redireccionamos a lista de gobernadores
      history.push('/organizaciones-politicas/gobernadores')
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
    <Formsy onValidSubmit={handleSubmit} onValid={enableButton} onInvalid={disableButton}>
      <PageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
        }}
        header={<GobernadoresEditHeader isFormValid={isFormValid} />}
        contentToolbar={
          <div className="px-16 sm:px-24">
            <h2>Gobernador</h2>
          </div>
        }
        content={
          <GobernadoresEditForm
            setFileState={setFileState}
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
export default GobernadoresEdit
