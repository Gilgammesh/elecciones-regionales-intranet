/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Formsy from 'formsy-react'
import PageCarded from 'components/core/PageCarded'
import ContrasenhaHeader from './ContrasenhaHeader'
import ContrasenhaForm from './ContrasenhaForm'
import useForm from 'hooks/useForm'
import { fetchData } from 'services/fetch'
import { validateFetchData } from 'helpers/validateFetchData'
import { Toast } from 'configs/settings'
import { startLogout } from 'redux/actions/auth'

/*******************************************************************************************************/
// Definimos la Vista del componente Contraseña //
/*******************************************************************************************************/
const Contrasenha = () => {
  // Recuperamos el state de authentication de usuario
  const usuario = useSelector(state => state.auth.usuario)

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Estado inicial si el formulario es válido
  const [isFormValid, setIsFormValid] = useState(false)

  // Estado inicial del formulario
  const initialForm = {
    password: '',
    newPassword: '',
    newPassword_: ''
  }

  // Usamos el Hook personalizado de formularios
  const [formValues, handleInputChange] = useForm(initialForm)

  // Función que se ejecuta cuando se envia el formulario
  const handleSubmit = async () => {
    // Actualizamos la contraseña del usuario
    const result = await fetchData('auth/cambiar-password', { isTokenReq: true }, 'POST', formValues)
    // Validamos el resultado
    if (validateFetchData(result)) {
      // Avisamos con un toast alert
      Toast.fire({
        icon: 'success',
        title: result.data.msg
      })
      // Cerramos sesión y redireccionamos a login
      dispatch(startLogout())
      // Avisamos con un toast alert
      Toast.fire({
        icon: 'success',
        title: 'Inicie sesión nuevamente!!'
      })
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
        header={<ContrasenhaHeader isFormValid={isFormValid} />}
        contentToolbar={
          <div className="px-16 sm:px-24">
            <h3>
              Usuario: {usuario.nombres.trim()} {usuario.apellidos.trim()}
            </h3>
          </div>
        }
        content={<ContrasenhaForm formValues={formValues} handleInputChange={handleInputChange} />}
        innerScroll
      />
    </Formsy>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Contrasenha
