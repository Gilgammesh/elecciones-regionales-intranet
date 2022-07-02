/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { startSetMesasSearch, startSetMesasAssign } from 'redux/actions/mesas'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas ToolBar - Asignado Personero //
/*******************************************************************************************************/
const MesasToolBarPersAsign = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los estados por defecto de la vista mesas de votación
  const { assign } = useSelector(state => state.mesas)

  // Función para actualizar el valor del estado del personero
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetMesasSearch('', ''))
    dispatch(startSetMesasAssign(value))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-centros-votacion-mesas-asignado">
        Estado Personero
      </InputLabel>
      <Select
        labelId="select-centros-votacion-mesas-asignado"
        className="col-span-12"
        value={assign}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        <MenuItem value={true} className="text-green">
          Asignado
        </MenuItem>
        <MenuItem value={false} className="text-red">
          Sin Asignar
        </MenuItem>
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MesasToolBarPersAsign.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasToolBarPersAsign
