/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ConsejerosToolBarNomApe from './ConsejerosToolBarNomApe'
import ConsejerosToolBarOrgs from './ConsejerosToolBarOrgs'
import ConsejerosToolBarDptos from './ConsejerosToolBarDptos'
import ConsejerosToolBarProvs from './ConsejerosToolBarProvs'

/*******************************************************************************************************/
// Definimos la Vista del componente Consejeros ToolBar //
/*******************************************************************************************************/
const ConsejerosToolBar = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <ConsejerosToolBarNomApe resetPages={resetPages} />
        <ConsejerosToolBarOrgs resetPages={resetPages} />
        {rol.super && <ConsejerosToolBarDptos resetPages={resetPages} />}
        <ConsejerosToolBarProvs resetPages={resetPages} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ConsejerosToolBar.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ConsejerosToolBar
