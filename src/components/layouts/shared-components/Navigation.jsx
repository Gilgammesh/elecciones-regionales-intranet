/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import clsx from 'clsx'
import AppNavigation from 'components/core/Navigation'
import { useSelector } from 'react-redux'
import defaultNavigation from 'configs/navigation'

/*******************************************************************************************************/
// Definimos el componente del Layout - Menú de Usuario //
/*******************************************************************************************************/
const Navigation = props => {
  // Recuperamos el state de la navegación de los módulos del usuario
  let navigation = useSelector(state => state.navigation)

  // Definimos la navegación y ordenamos
  const navigation_ = [...defaultNavigation, navigation].sort(
    (a, b) => a.orden - b.orden
  )

  // Renderizamos el componente y pasamos las propiedades
  return (
    <AppNavigation
      className={clsx('navigation', props.className)}
      navigation={navigation_}
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
