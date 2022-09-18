/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import MonitoreoActaProvToolBarMesa from './MonitoreoActaProvToolBarMesa'
import MonitoreoActaProvToolBarMesaPers from './MonitoreoActaProvToolBarMesaPers'
import MonitoreoActaProvToolBarLocal from './MonitoreoActaProvToolBarLocal'
import MonitoreoActaProvToolBarVotantes from './MonitoreoActaProvToolBarVotantes'
import MonitoreoActaProvToolBarDpto from './MonitoreoActaProvToolBarDpto'
import MonitoreoActaProvToolBarProv from './MonitoreoActaProvToolBarProv'
import MonitoreoActaProvToolBarDist from './MonitoreoActaProvToolBarDist'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Provincial ToolBar //
/*******************************************************************************************************/
const MonitoreoActaProvToolBar = props => {
  // Obtenemos las propiedades del componente
  const { row } = props

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <MonitoreoActaProvToolBarMesa mesa={row.mesa} />
        <MonitoreoActaProvToolBarMesaPers personero={row.personero_mesa} />
        <MonitoreoActaProvToolBarLocal local={row.local} />
        <MonitoreoActaProvToolBarVotantes votantes={row.votantes} />
        <MonitoreoActaProvToolBarDpto departamento={row.departamento} />
        <MonitoreoActaProvToolBarProv provincia={row.provincia} />
        <MonitoreoActaProvToolBarDist distrito={row.distrito} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaProvToolBar.propTypes = {
  row: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaProvToolBar
