/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import PersonerosToolBarNomApe from './PersonerosToolBarNomApe'
import PersonerosToolBarDni from './PersonerosToolBarDni'
import PersonerosToolBarCelular from './PersonerosToolBarCelular'
import PersonerosToolBarTipos from './PersonerosToolBarTipos'
import PersonerosToolBarEstados from './PersonerosToolBarEstados'
import PersonerosToolBarDptos from './PersonerosToolBarDptos'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar //
/*******************************************************************************************************/
const PersonerosToolBar = () => {
  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <PersonerosToolBarNomApe />
        <PersonerosToolBarDni />
        <PersonerosToolBarCelular />
        <PersonerosToolBarTipos />
        <PersonerosToolBarEstados />
        {rol.super && <PersonerosToolBarDptos />}
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosToolBar
