/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Formsy from 'formsy-react'
import {
  Button,
  CircularProgress,
  Icon,
  IconButton,
  InputAdornment,
  Typography
} from '@material-ui/core'
import { GoSignIn } from 'react-icons/go'
import useForm from 'hooks/useForm'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import { startLogin } from 'redux/actions/auth'

/*******************************************************************************************************/
// Definimos el componente Formulario del Login //
/*******************************************************************************************************/
const LoginFormulario = () => {
  // Llamamos al history de las rutas
  const history = useHistory()

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Estado inicial si el formulario es válido
  const [isFormValid, setIsFormValid] = useState(false)
  // Estado inicial para mostrar la contraseña
  const [showPassword, setShowPassword] = useState(false)
  // Estado inicial si está cargando el formulario enviado
  const [isLoading, setIsLoading] = useState(false)

  // Usamos el Hook personalizado de formularios
  const [formValues, handleInputChange] = useForm({
    dni: '',
    password: ''
  })
  const { dni, password } = formValues

  // Función que se ejecuta cuando se envia el formulario
  const handleSubmit = async () => {
    setIsLoading(true)
    dispatch(startLogin(formValues, history))
    setIsLoading(false)
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
    <div className="mt-16 text-center">
      <Typography variant="h5" className="mb-24">
        Inicie Sesión
      </Typography>
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        className="flex flex-col justify-center w-full"
      >
        <TextFieldFormsy
          className="mb-20"
          type="text"
          name="dni"
          label="DNI"
          accept="onlyNumber"
          value={dni}
          onChange={handleInputChange}
          validations={{
            minLength: 8,
            maxLength: 8
          }}
          validationErrors={{
            minLength: 'El dni debe tener 08 dígitos',
            maxLength: 'El dni debe tener 08 dígitos'
          }}
          inputProps={{
            maxLength: 8
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  contacts
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
        />

        <TextFieldFormsy
          className="mb-16"
          type="password"
          name="password"
          label="Contraseña"
          value={password}
          onChange={handleInputChange}
          validations={{
            minLength: 6
          }}
          validationErrors={{
            minLength: 'La contraseña debe tener mínimo 06 dígitos'
          }}
          InputProps={{
            className: 'pr-2',
            type: showPassword ? 'text' : 'password',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  <Icon className="text-20" color="action">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </Icon>
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 py-8 normal-case"
          aria-label="LOG IN"
          startIcon={
            isLoading ? (
              <CircularProgress className="text-white" size={20} />
            ) : (
              <GoSignIn />
            )
          }
          disabled={!isFormValid}
        >
          Ingresar
        </Button>
      </Formsy>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default LoginFormulario
