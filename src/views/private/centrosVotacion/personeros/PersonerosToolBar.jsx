/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import PersonerosToolBarNomApe from './PersonerosToolBarNomApe'
import PersonerosToolBarDni from './PersonerosToolBarDni'
import PersonerosToolBarCelular from './PersonerosToolBarCelular'
import PersonerosToolBarTipos from './PersonerosToolBarTipos'
import PersonerosToolBarEstados from './PersonerosToolBarEstados'
import PersonerosToolBarDptos from './PersonerosToolBarDptos'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar //
/*******************************************************************************************************/
const PersonerosToolBar = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <PersonerosToolBarNomApe resetPages={resetPages} />
        <PersonerosToolBarDni resetPages={resetPages} />
        <PersonerosToolBarCelular resetPages={resetPages} />
        <PersonerosToolBarTipos resetPages={resetPages} />
        <PersonerosToolBarEstados resetPages={resetPages} />
        {rol.super && <PersonerosToolBarDptos resetPages={resetPages} />}
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosToolBar.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosToolBar
