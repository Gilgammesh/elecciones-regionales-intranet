/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Checkbox, TextField, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { KeyboardDatePicker } from '@material-ui/pickers'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'

/*******************************************************************************************************/
// Checkbox personalizado //
/*******************************************************************************************************/
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />)

/*******************************************************************************************************/
// Definimos la Vista del componente Elección Nuevo Formulario //
/*******************************************************************************************************/
const EleccionesNewForm = props => {
  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange, setForm } = props
  // Obtenemos los valores del formulario
  const { anho, fecha, tipo, actual } = formValues

  // Función para cambiar la fecha
  const handleDateChange = date => {
    // Guardamos los datos en el formulario
    setForm({
      ...formValues,
      fecha: date
    })
  }

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full p-16 sm:p-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <TextFieldFormsy
          className="col-span-12 sm:col-span-2"
          type="number"
          name="anho"
          label="Año"
          accept="onlyNumber"
          value={anho}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            maxLength: 4,
            min: new Date().getFullYear()
          }}
          required
        />
        <KeyboardDatePicker
          className="col-span-12 sm:col-span-2"
          autoOk
          variant="inline"
          inputVariant="outlined"
          format="DD/MM/yyyy"
          name="fecha"
          label="Fecha de Elección"
          value={fecha}
          onChange={handleDateChange}
          InputAdornmentProps={{ position: 'start' }}
          invalidDateMessage="Fecha Inválida"
          required
        />
        <TextField
          select
          className="col-span-12 sm:col-span-4"
          name="tipo"
          label="Tipo de Elección"
          value={tipo}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          <MenuItem value="regional">Elecciones Regionales </MenuItem>
        </TextField>
        <FormControlLabel
          className="col-span-12 sm:col-span-3"
          control={<GreenCheckbox checked={actual} onChange={handleInputChange} name="actual" color="primary" />}
          label="¿Es el actual?"
        />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
EleccionesNewForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default EleccionesNewForm
