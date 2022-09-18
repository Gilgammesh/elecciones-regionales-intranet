/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional ToolBar - Departamento //
/*******************************************************************************************************/
const MonitoreoActaRegToolBarDpto = props => {
  // Obtenemos las propiedades del componente
  const { departamento } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-1">
      <InputLabel htmlFor="input-monitoreo-acta-regional-departamento">Departamento</InputLabel>
      <Input id="input-monitoreo-acta-regional-departamento" type="text" value={departamento.nombre} readOnly />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegToolBarDpto.propTypes = {
  departamento: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegToolBarDpto
