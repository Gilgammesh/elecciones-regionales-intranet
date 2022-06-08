/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import TextField from '@material-ui/core/TextField'
import { withFormsy } from 'formsy-react'
import _ from 'lodash'
import validateInputRegexp from 'helpers/validateInputRegexp'

/*******************************************************************************************************/
// Definimos el componente de TexField un formulario Formsy //
/*******************************************************************************************************/
const TextFieldFormsy = props => {
  // Importamos las propiedades
  const importedProps = _.pick(props, [
    'accept',
    'autoComplete',
    'autoFocus',
    'children',
    'className',
    'defaultValue',
    'disabled',
    'FormHelperTextProps',
    'fullWidth',
    'id',
    'InputLabelProps',
    'inputProps',
    'InputProps',
    'inputRef',
    'label',
    'multiline',
    'name',
    'onBlur',
    'onChange',
    'onFocus',
    'placeholder',
    'required',
    'rows',
    'rowsMax',
    'select',
    'SelectProps',
    'type',
    'variant',
    'maxLength'
  ])

  // Instanciamos el mensaje de error
  const { errorMessage } = props

  // Definimos el value si es pasado
  const value = props.value || ''

  // Si existe un cambio en el formulario devolvemos el value
  const changeValue = event => {
    if (props.accept && props.accept !== '') {
      if (!validateInputRegexp(props.accept, event.currentTarget.value)) {
        return
      }
    }
    if (props.type === 'number') {
      if (props.inputProps.min) {
        if (event.currentTarget.value < props.inputProps.min) {
          return
        }
      }
      if (props.inputProps.max) {
        if (event.currentTarget.value > props.inputProps.max) {
          return
        }
      }
      if (props.inputProps.maxLength) {
        if (event.currentTarget.value.length > props.inputProps.maxLength) {
          return
        }
      }
    }
    props.setValue(event.currentTarget.value)
    if (props.onChange) {
      props.onChange(event)
    }
  }

  // Renderizamos el componente
  return (
    <TextField
      {...importedProps}
      onChange={changeValue}
      value={value}
      error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
      helperText={errorMessage}
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(withFormsy(TextFieldFormsy))
