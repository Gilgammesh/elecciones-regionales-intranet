/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import validateInputRegexp from 'helpers/validateInputRegexp'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas - Personeros - Filtro Apellidos //
/*******************************************************************************************************/
const DialogPersonerosApellidos = props => {
  // Obtenemos las propiedades del componente
  const { apellidos, setApellidos } = props

  // Función para actualizar el valor de los apellidos de búsqueda
  const handleInputChange = evt => {
    const { value } = evt.target
    if (!validateInputRegexp('onlyLetterAndSpace', value)) {
      return
    }
    setApellidos(value)
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-3">
      <InputLabel htmlFor="input-centros-votacion-mesas-personeros-apellidos">Apellidos</InputLabel>
      <Input
        id="input-centros-votacion-mesas-personeros-apellidos"
        type="text"
        value={apellidos}
        onChange={handleInputChange}
      />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
DialogPersonerosApellidos.propTypes = {
  apellidos: PropTypes.string.isRequired,
  setApellidos: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogPersonerosApellidos
