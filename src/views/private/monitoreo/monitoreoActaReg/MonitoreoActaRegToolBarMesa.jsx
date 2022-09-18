/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional ToolBar - Mesa //
/*******************************************************************************************************/
const MonitoreoActaRegToolBarMesa = props => {
  // Obtenemos las propiedades del componente
  const { mesa } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-1">
      <InputLabel htmlFor="input-monitoreo-acta-regional-mesa">Mesa</InputLabel>
      <Input id="input-monitoreo-acta-regional-mesa" type="text" value={mesa} readOnly />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegToolBarMesa.propTypes = {
  mesa: PropTypes.string.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegToolBarMesa
