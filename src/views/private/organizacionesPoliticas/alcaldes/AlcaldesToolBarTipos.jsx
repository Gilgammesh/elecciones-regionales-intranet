/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { startSetAlcaldesSearch, startSetAlcaldesTipo } from 'redux/actions/alcaldes'

/*******************************************************************************************************/
// Definimos la Vista del componente Alcaldes ToolBar - Tipos //
/*******************************************************************************************************/
const AlcaldesToolBarTipos = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los datos por defecto de los alcaldes
  const { tipo } = useSelector(state => state.alcaldes)

  // Función para actualizar el valor del tipo
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetAlcaldesSearch('', ''))
    dispatch(startSetAlcaldesTipo(value))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-1">
      <InputLabel shrink id="select-alcaldes-tipo">
        Tipo
      </InputLabel>
      <Select labelId="select-alcaldes-tipo" className="col-span-12" value={tipo} onChange={handleChange} displayEmpty>
        <MenuItem value="todos">--Todos--</MenuItem>
        <MenuItem value="provincial">Provincial</MenuItem>
        <MenuItem value="distrital">Distrital</MenuItem>
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
AlcaldesToolBarTipos.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AlcaldesToolBarTipos
