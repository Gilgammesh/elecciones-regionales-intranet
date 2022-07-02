/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { startSetPersonerosSearch, startSetPersonerosTipo } from 'redux/actions/personeros'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar - Tipos //
/*******************************************************************************************************/
const PersonerosToolBarTipos = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los estados por defecto de la vista personeros
  const { tipo } = useSelector(state => state.personeros)

  // Función para actualizar el valor del tipo de personero
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetPersonerosSearch('', ''))
    dispatch(startSetPersonerosTipo(value))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-centros-votacion-personeros-tipo">
        Tipo de Personero
      </InputLabel>
      <Select
        labelId="select-centros-votacion-personeros-tipo"
        className="col-span-12"
        value={tipo}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        <MenuItem value="mesa">Personero de Mesa</MenuItem>
        <MenuItem value="local">Personero de Local</MenuItem>
        <MenuItem value="distrito">Personero de Distrito</MenuItem>
        <MenuItem value="provincia">Personero de Provincia</MenuItem>
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosToolBarTipos.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosToolBarTipos
