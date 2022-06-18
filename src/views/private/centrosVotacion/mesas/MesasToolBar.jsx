/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import MesasToolBarMesa from './MesasToolBarMesa'
import MesasToolBarLocal from './MesasToolBarLocal'
import MesasToolBarPersAsign from './MesasToolBarPersAsign'
import MesasToolBarDptos from './MesasToolBarDptos'
import MesasToolBarProvs from './MesasToolBarProvs'
import MesasToolBarDists from './MesasToolBarDists'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas ToolBar //
/*******************************************************************************************************/
const MesasToolBar = () => {
  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <MesasToolBarMesa />
        <MesasToolBarLocal />
        <MesasToolBarPersAsign />
        {rol.super && <MesasToolBarDptos />}
        <MesasToolBarProvs />
        <MesasToolBarDists />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasToolBar
