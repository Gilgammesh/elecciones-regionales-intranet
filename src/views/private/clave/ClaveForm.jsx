/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, IconButton, InputAdornment } from '@material-ui/core'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'

/*******************************************************************************************************/
// Definimos la Vista del componente Usuario - Cambiar Clave Formulario //
/*******************************************************************************************************/
const ClaveForm = props => {
  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange } = props

  // Obtenemos los valores del formulario
  const { password, newPassword, newPassword_ } = formValues

  // Estado inicial para mostrar las contraseñas
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showNewPassword_, setShowNewPassword_] = useState(false)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full p-16 sm:p-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <TextFieldFormsy
          className="col-span-12 sm:col-span-4"
          type="text"
          name="password"
          label="Contraseña Actual"
          value={password}
          onChange={handleInputChange}
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
        <TextFieldFormsy
          className="col-span-12 sm:col-span-4"
          type="text"
          name="newPassword"
          label="Nueva Contraseña"
          value={newPassword}
          onChange={handleInputChange}
          validations={{
            minLength: 6
          }}
          validationErrors={{
            minLength: 'La contraseña debe tener mínimo 06 dígitos'
          }}
          InputProps={{
            className: 'pr-2',
            type: showNewPassword ? 'text' : 'password',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <Icon className="text-20" color="action">
                    {showNewPassword ? 'visibility' : 'visibility_off'}
                  </Icon>
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-4"
          type="text"
          name="newPassword_"
          label="Confirmar Nueva Contraseña"
          value={newPassword_}
          onChange={handleInputChange}
          validations={{
            equals: `${newPassword}`
          }}
          validationErrors={{
            equals: 'No coincide con la contraseña nueva'
          }}
          InputProps={{
            className: 'pr-2',
            type: showNewPassword_ ? 'text' : 'password',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword_(!showNewPassword_)}
                >
                  <Icon className="text-20" color="action">
                    {showNewPassword_ ? 'visibility' : 'visibility_off'}
                  </Icon>
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
        />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ClaveForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ClaveForm
