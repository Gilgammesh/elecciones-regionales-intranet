/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import GobernadoresToolBarNomApe from './GobernadoresToolBarNomApe'
import GobernadoresToolBarOrgs from './GobernadoresToolBarOrgs'
import GobernadoresToolBarDptos from './GobernadoresToolBarDptos'

/*******************************************************************************************************/
// Definimos la Vista del componente Gobernadores ToolBar //
/*******************************************************************************************************/
const GobernadoresToolBar = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <GobernadoresToolBarNomApe resetPages={resetPages} />
        <GobernadoresToolBarOrgs resetPages={resetPages} />
        {rol.super && <GobernadoresToolBarDptos resetPages={resetPages} />}
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
GobernadoresToolBar.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default GobernadoresToolBar
