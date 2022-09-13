/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import clsx from 'clsx'
import { Lottie } from '@crello/react-lottie'
import animation1 from 'assets/animations/searching/searching1'
import animation2 from 'assets/animations/searching/searching2'

/*******************************************************************************************************/
// Definimos el componente Animación - Buscando //
/*******************************************************************************************************/
const Searching = props => {
  // Obtenemos las propiedades del componente
  const { model, variant } = props

  // Usamos la animación de acuerdo a la variante
  let animation = null
  if (variant === 1) {
    animation = animation1
  }
  if (variant === 2) {
    animation = animation2
  }

  // Opciones de la animación por defecto
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  // Renderizamos el componente
  return (
    <div className={clsx('flex justify-center items-center', model === 'stretch' ? 'w-full' : 'flex-grow')}>
      <Lottie {...props} config={animationOptions} />
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Searching
