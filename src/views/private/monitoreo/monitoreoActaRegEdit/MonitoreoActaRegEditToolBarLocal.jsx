/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional - Editar ToolBar - Local //
/*******************************************************************************************************/
const MonitoreoActaRegEditToolBarLocal = props => {
  // Obtenemos las propiedades del componente
  const { local } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-3">
      <InputLabel htmlFor="input-monitoreo-acta-regional-local">Local</InputLabel>
      <Input id="input-monitoreo-acta-regional-local" type="text" value={local} readOnly />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegEditToolBarLocal.propTypes = {
  local: PropTypes.string.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegEditToolBarLocal
