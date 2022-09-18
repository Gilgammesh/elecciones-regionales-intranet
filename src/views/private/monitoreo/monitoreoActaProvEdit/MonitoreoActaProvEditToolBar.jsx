/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import MonitoreoActaProvEditToolBarMesa from './MonitoreoActaProvEditToolBarMesa'
import MonitoreoActaProvEditToolBarMesaPers from './MonitoreoActaProvEditToolBarMesaPers'
import MonitoreoActaProvEditToolBarLocal from './MonitoreoActaProvEditToolBarLocal'
import MonitoreoActaProvEditToolBarVotantes from './MonitoreoActaProvEditToolBarVotantes'
import MonitoreoActaProvEditToolBarDpto from './MonitoreoActaProvEditToolBarDpto'
import MonitoreoActaProvEditToolBarProv from './MonitoreoActaProvEditToolBarProv'
import MonitoreoActaProvEditToolBarDist from './MonitoreoActaProvEditToolBarDist'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Provincial - Editar ToolBar //
/*******************************************************************************************************/
const MonitoreoActaProvEditToolBar = props => {
  // Obtenemos las propiedades del componente
  const { row } = props

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <MonitoreoActaProvEditToolBarMesa mesa={row.mesa} />
        <MonitoreoActaProvEditToolBarMesaPers personero={row.personero_mesa} />
        <MonitoreoActaProvEditToolBarLocal local={row.local} />
        <MonitoreoActaProvEditToolBarVotantes votantes={row.votantes} />
        <MonitoreoActaProvEditToolBarDpto departamento={row.departamento} />
        <MonitoreoActaProvEditToolBarProv provincia={row.provincia} />
        <MonitoreoActaProvEditToolBarDist distrito={row.distrito} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaProvEditToolBar.propTypes = {
  row: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaProvEditToolBar
