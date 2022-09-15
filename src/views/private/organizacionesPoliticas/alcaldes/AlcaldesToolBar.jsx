/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AlcaldesToolBarNomApe from './AlcaldesToolBarNomApe'
import AlcaldesToolBarOrgs from './AlcaldesToolBarOrgs'
import AlcaldesToolBarDptos from './AlcaldesToolBarDptos'
import AlcaldesToolBarProvs from './AlcaldesToolBarProvs'
import AlcaldesToolBarDist from './AlcaldesToolBarDist'
import AlcaldesToolBarTipos from './AlcaldesToolBarTipos'

/*******************************************************************************************************/
// Definimos la Vista del componente Alcaldes ToolBar //
/*******************************************************************************************************/
const AlcaldesToolBar = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <AlcaldesToolBarNomApe resetPages={resetPages} />
        <AlcaldesToolBarTipos resetPages={resetPages} />
        <AlcaldesToolBarOrgs resetPages={resetPages} />
        {rol.super && <AlcaldesToolBarDptos resetPages={resetPages} />}
        <AlcaldesToolBarProvs resetPages={resetPages} />
        <AlcaldesToolBarDist resetPages={resetPages} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
AlcaldesToolBar.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AlcaldesToolBar
