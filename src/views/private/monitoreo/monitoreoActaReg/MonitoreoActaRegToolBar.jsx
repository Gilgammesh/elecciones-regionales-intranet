/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import MonitoreoActaRegToolBarMesa from './MonitoreoActaRegToolBarMesa'
import MonitoreoActaRegToolBarMesaPers from './MonitoreoActaRegToolBarMesaPers'
import MonitoreoActaRegToolBarLocal from './MonitoreoActaRegToolBarLocal'
import MonitoreoActaRegToolBarVotantes from './MonitoreoActaRegToolBarVotantes'
import MonitoreoActaRegToolBarDpto from './MonitoreoActaRegToolBarDpto'
import MonitoreoActaRegToolBarProv from './MonitoreoActaRegToolBarProv'
import MonitoreoActaRegToolBarDist from './MonitoreoActaRegToolBarDist'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional ToolBar //
/*******************************************************************************************************/
const MonitoreoActaRegToolBar = props => {
  // Obtenemos las propiedades del componente
  const { row } = props

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <MonitoreoActaRegToolBarMesa mesa={row.mesa} />
        <MonitoreoActaRegToolBarMesaPers personero={row.personero_mesa} />
        <MonitoreoActaRegToolBarLocal local={row.local} />
        <MonitoreoActaRegToolBarVotantes votantes={row.votantes} />
        <MonitoreoActaRegToolBarDpto departamento={row.departamento} />
        <MonitoreoActaRegToolBarProv provincia={row.provincia} />
        <MonitoreoActaRegToolBarDist distrito={row.distrito} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegToolBar.propTypes = {
  row: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegToolBar
