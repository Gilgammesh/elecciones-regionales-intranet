/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { cloneElement, forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import { VelocityComponent } from 'velocity-react'
import 'velocity-animate/velocity.ui'

/*******************************************************************************************************/
// Definimos el componente de Animación //
/*******************************************************************************************************/
const Animate = forwardRef((props, ref) => {
  // Definimos el componente hijo y le pasamos las propiedades
  const children = cloneElement(props.children, {
    style: {
      ...props.children.style,
      visibility: 'hidden'
    }
  })

  // Renderizamos el componente y pasamos las propiedades a los hijos
  return (
    <VelocityComponent ref={ref} {...props}>
      {children}
    </VelocityComponent>
  )
})

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
Animate.propTypes = {
  children: PropTypes.element.isRequired
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
Animate.defaultProps = {
  animation: 'transition.fadeIn',
  runOnMount: true,
  targetQuerySelector: null,
  interruptBehavior: 'stop',
  visibility: 'visible',
  duration: 300,
  delay: 50,
  easing: [0.4, 0.0, 0.2, 1],
  display: null,
  setRef: undefined
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Animate)
