/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional ToolBar - Personero Mesa //
/*******************************************************************************************************/
const MonitoreoActaRegToolBarMesaPers = props => {
  // Obtenemos las propiedades del componente
  const { personero } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel htmlFor="input-monitoreo-acta-regional-personero">Personero Mesa</InputLabel>
      {personero ? (
        <Input
          id="input-monitoreo-acta-regional-personero"
          type="text"
          value={`${personero.nombres} ${personero.apellidos}`}
          readOnly
        />
      ) : (
        <Input
          id="input-monitoreo-acta-regional-personero"
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
MonitoreoActaRegToolBarMesaPers.propTypes = {
  personero: PropTypes.object
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegToolBarMesaPers
