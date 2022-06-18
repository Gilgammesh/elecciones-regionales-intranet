/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import validateInputRegexp from 'helpers/validateInputRegexp'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas - Personeros - Filtro Dni //
/*******************************************************************************************************/
const DialogPersonerosDni = props => {
  // Obtenemos las propiedades del componente
  const { dni, setDni } = props

  // Función para actualizar el valor de los nombres de búsqueda
  const handleInputChange = evt => {
    const { value } = evt.target
    if (!validateInputRegexp('onlyNumber', value)) {
      return
    }
    setDni(value)
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-2">
      <InputLabel htmlFor="input-centros-votacion-mesas-personeros-dni">DNI</InputLabel>
      <Input id="input-centros-votacion-mesas-personeros-dni" type="text" value={dni} onChange={handleInputChange} />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
DialogPersonerosDni.propTypes = {
  dni: PropTypes.string.isRequired,
  setDni: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogPersonerosDni
