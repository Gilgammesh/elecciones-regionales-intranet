/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Provincial - Editar ToolBar - Distrito //
/*******************************************************************************************************/
const MonitoreoActaProvEditToolBarDist = props => {
  // Obtenemos las propiedades del componente
  const { distrito } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel htmlFor="input-monitoreo-acta-provincial-distrito">Distrito</InputLabel>
      <Input id="input-monitoreo-acta-provincial-distrito" type="text" value={distrito.nombre} readOnly />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaProvEditToolBarDist.propTypes = {
  distrito: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaProvEditToolBarDist
