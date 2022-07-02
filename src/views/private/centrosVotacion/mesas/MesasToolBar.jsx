/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import MesasToolBarMesa from './MesasToolBarMesa'
import MesasToolBarLocal from './MesasToolBarLocal'
import MesasToolBarPersAsign from './MesasToolBarPersAsign'
import MesasToolBarDptos from './MesasToolBarDptos'
import MesasToolBarProvs from './MesasToolBarProvs'
import MesasToolBarDists from './MesasToolBarDists'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas ToolBar //
/*******************************************************************************************************/
const MesasToolBar = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <MesasToolBarMesa resetPages={resetPages} />
        <MesasToolBarLocal resetPages={resetPages} />
        <MesasToolBarPersAsign resetPages={resetPages} />
        {rol.super && <MesasToolBarDptos resetPages={resetPages} />}
        <MesasToolBarProvs resetPages={resetPages} />
        <MesasToolBarDists resetPages={resetPages} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MesasToolBar.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasToolBar
