/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Provincial - Editar ToolBar - Provincia //
/*******************************************************************************************************/
const MonitoreoActaProvEditToolBarProv = props => {
  // Obtenemos las propiedades del componente
  const { provincia } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel htmlFor="input-monitoreo-acta-provincial-provincia">Provincia</InputLabel>
      <Input id="input-monitoreo-acta-provincial-provincia" type="text" value={provincia.nombre} readOnly />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaProvEditToolBarProv.propTypes = {
  provincia: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaProvEditToolBarProv
