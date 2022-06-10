/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import clsx from 'clsx'
import AppNavigation from 'components/core/Navigation'

/*******************************************************************************************************/
// Definimos el componente del Layout - Menú de Usuario //
/*******************************************************************************************************/
const Navigation = props => {
  // Renderizamos el componente y pasamos las propiedades
  return (
    <AppNavigation
      className={clsx('navigation', props.className)}
      layout={props.layout}
      dense={props.dense}
      active={props.active}
    />
  )
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
Navigation.defaultProps = {
  layout: 'vertical'
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Navigation
