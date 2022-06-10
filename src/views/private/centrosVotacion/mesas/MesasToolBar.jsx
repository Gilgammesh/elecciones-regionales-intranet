/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import MesasToolBarDptos from './MesasToolBarDptos'
import MesasToolBarProvs from './MesasToolBarProvs'
import MesasToolBarDists from './MesasToolBarDists'
import MesasToolBarLocal from './MesasToolBarLocal'
import MesasToolBarMesa from './MesasToolBarMesa'

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
        {rol.super && <MesasToolBarDptos />}
        <MesasToolBarProvs />
        <MesasToolBarDists />
        <MesasToolBarLocal />
        <MesasToolBarMesa />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasToolBar
