/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional - Editar ToolBar - Votantes //
/*******************************************************************************************************/
const MonitoreoActaRegEditToolBarVotantes = props => {
  // Obtenemos las propiedades del componente
  const { votantes } = props

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-1">
      <InputLabel htmlFor="input-monitoreo-acta-regional-votantes">Votantes</InputLabel>
      <Input id="input-monitoreo-acta-regional-votantes" type="text" value={votantes} readOnly />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegEditToolBarVotantes.propTypes = {
  votantes: PropTypes.number.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegEditToolBarVotantes
