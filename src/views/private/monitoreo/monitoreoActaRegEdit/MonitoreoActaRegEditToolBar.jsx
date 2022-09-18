/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import MonitoreoActaRegEditToolBarMesa from './MonitoreoActaRegEditToolBarMesa'
import MonitoreoActaRegEditToolBarMesaPers from './MonitoreoActaRegEditToolBarMesaPers'
import MonitoreoActaRegEditToolBarLocal from './MonitoreoActaRegEditToolBarLocal'
import MonitoreoActaRegEditToolBarVotantes from './MonitoreoActaRegEditToolBarVotantes'
import MonitoreoActaRegEditToolBarDpto from './MonitoreoActaRegEditToolBarDpto'
import MonitoreoActaRegEditToolBarProv from './MonitoreoActaRegEditToolBarProv'
import MonitoreoActaRegEditToolBarDist from './MonitoreoActaRegEditToolBarDist'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional - Editar ToolBar //
/*******************************************************************************************************/
const MonitoreoActaRegEditToolBar = props => {
  // Obtenemos las propiedades del componente
  const { row } = props

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <MonitoreoActaRegEditToolBarMesa mesa={row.mesa} />
        <MonitoreoActaRegEditToolBarMesaPers personero={row.personero_mesa} />
        <MonitoreoActaRegEditToolBarLocal local={row.local} />
        <MonitoreoActaRegEditToolBarVotantes votantes={row.votantes} />
        <MonitoreoActaRegEditToolBarDpto departamento={row.departamento} />
        <MonitoreoActaRegEditToolBarProv provincia={row.provincia} />
        <MonitoreoActaRegEditToolBarDist distrito={row.distrito} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegEditToolBar.propTypes = {
  row: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegEditToolBar
