/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import OrganizacionesToolBarNombre from './OrganizacionesToolBarNombre'

/*******************************************************************************************************/
// Definimos la Vista del componente Organizaciones ToolBar //
/*******************************************************************************************************/
const OrganizacionesToolBar = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <OrganizacionesToolBarNombre resetPages={resetPages} />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
OrganizacionesToolBar.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default OrganizacionesToolBar
