/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import MonitoreoToolBarMesa from './MonitoreoToolBarMesa'
import MonitoreoToolBarLocal from './MonitoreoToolBarLocal'
import MonitoreoToolBarDptos from './MonitoreoToolBarDptos'
import MonitoreoToolBarProvs from './MonitoreoToolBarProvs'
import MonitoreoToolBarDists from './MonitoreoToolBarDists'
import MonitoreoToolBarEstActReg from './MonitoreoToolBarEstActReg'
import MonitoreoToolBarEstActProv from './MonitoreoToolBarEstActProv'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo ToolBar //
/*******************************************************************************************************/
const MonitoreoToolBar = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <MonitoreoToolBarMesa resetPages={resetPages} />
        <MonitoreoToolBarLocal resetPages={resetPages} />
        {rol.super && <MonitoreoToolBarDptos resetPages={resetPages} />}
        <MonitoreoToolBarProvs resetPages={resetPages} />
        <MonitoreoToolBarDists resetPages={resetPages} />
        <MonitoreoToolBarEstActReg resetPages={resetPages} />
        <MonitoreoToolBarEstActProv resetPages={resetPages} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoToolBar.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoToolBar
