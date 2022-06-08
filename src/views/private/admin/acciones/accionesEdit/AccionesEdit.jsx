/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Formsy from 'formsy-react'
import PageCarded from 'components/core/PageCarded'
import AccionesEditHeader from './AccionesEditHeader'
import AccionesEditForm from './AccionesEditForm'
import useForm from 'hooks/useForm'
import { fetchData } from 'services/fetch'
import { validateFetchData } from 'helpers/validateFetchData'
import { Toast } from 'configs/settings'

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Accion Editar //
/*******************************************************************************************************/
const AccionesEdit = () => {
  // Llamamos al history de las rutas
  const history = useHistory()

  // Obtenemos el id del usuario de los parámetros de la ruta
  const { id } = useParams()

  // Estado inicial si el formulario es válido
  const [isFormValid, setIsFormValid] = useState(false)

  // Estado inicial del formulario
  const initialForm = {
    nombre: '',
    descripcion: ''
  }

  // Usamos el Hook personalizado de formularios
  const [formValues, handleInputChange, resetForm, setForm] =
    useForm(initialForm)

  // Función que se ejecuta cuando se envia el formulario
  const handleSubmit = async () => {
    // Actualizamos la data de la acción
    const result = await fetchData(
      `admin/acciones/${id}`,
      { isTokenReq: true },
      'PUT',
      formValues
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
      // Redireccionamos a lista de acciones
      history.push('/admin/acciones')
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
        header={<AccionesEditHeader isFormValid={isFormValid} />}
        contentToolbar={
          <div className="px-16 sm:px-24">
            <h2>Acción</h2>
          </div>
        }
        content={
          <AccionesEditForm
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
export default AccionesEdit
