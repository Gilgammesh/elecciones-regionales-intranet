/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Provincial ToolBar - Personero Mesa //
/*******************************************************************************************************/
const MonitoreoActaProvToolBarMesaPers = props => {
  // Obtenemos las propiedades del componente
  const { personero } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel htmlFor="input-monitoreo-acta-provincial-personero">Personero Mesa</InputLabel>
      {personero ? (
        <Input
          id="input-monitoreo-acta-regional-provincial"
          type="text"
          value={`${personero.nombres} ${personero.apellidos}`}
          readOnly
        />
      ) : (
        <Input
          id="input-monitoreo-acta-regional-provincial"
          type="text"
          className="text-red"
          value="--Sin asignar--"
          readOnly
        />
      )}
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaProvToolBarMesaPers.propTypes = {
  personero: PropTypes.object
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaProvToolBarMesaPers
