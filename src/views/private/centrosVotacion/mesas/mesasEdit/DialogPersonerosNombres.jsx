/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import validateInputRegexp from 'helpers/validateInputRegexp'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas - Personeros - Filtro Nombres //
/*******************************************************************************************************/
const DialogPersonerosNombres = props => {
  // Obtenemos las propiedades del componente
  const { nombres, setNombres } = props

  // Función para actualizar el valor de los nombres de búsqueda
  const handleInputChange = evt => {
    const { value } = evt.target
    if (!validateInputRegexp('onlyLetterAndSpace', value)) {
      return
    }
    setNombres(value)
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-3">
      <InputLabel htmlFor="input-centros-votacion-mesas-personeros-nombres">Nombres</InputLabel>
      <Input
        id="input-centros-votacion-mesas-personeros-nombres"
        type="text"
        value={nombres}
        onChange={handleInputChange}
      />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
DialogPersonerosNombres.propTypes = {
  nombres: PropTypes.string.isRequired,
  setNombres: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogPersonerosNombres
