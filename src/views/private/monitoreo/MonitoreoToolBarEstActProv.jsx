/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { startSetMonitoreoSearch, startSetMonitoreoEstadoActaProv } from 'redux/actions/monitoreo'
import _ from 'lodash'
import { EMesaEstadoActa } from 'enums/mesas'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo ToolBar - Estado Acta Provincial //
/*******************************************************************************************************/
const MonitoreoToolBarEstActProv = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los estados por defecto de monitoreo
  const { estadoActaProv } = useSelector(state => state.monitoreo)

  // Función para actualizar el valor del estado del acta provincial
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetMonitoreoSearch('', ''))
    dispatch(startSetMonitoreoEstadoActaProv(value))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-monitoreo-estado-acta-provincial">
        Estado Acta Provincial
      </InputLabel>
      <Select
        labelId="select-monitoreo-estado-acta-provincial"
        className="col-span-12"
        value={estadoActaProv}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        <MenuItem value={EMesaEstadoActa.Enviado} className="text-green">
          {_.capitalize(EMesaEstadoActa.Enviado)}
        </MenuItem>
        <MenuItem value={EMesaEstadoActa.PorEnviar} className="text-red">
          {_.capitalize(EMesaEstadoActa.PorEnviar)}
        </MenuItem>
        <MenuItem value={EMesaEstadoActa.Reabierto} className="text-blue">
          {_.capitalize(EMesaEstadoActa.Reabierto)}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoToolBarEstActProv.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoToolBarEstActProv
