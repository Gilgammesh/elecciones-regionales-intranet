/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Icon, Typography } from '@material-ui/core'
import Animate from 'components/core/Animate'

/*******************************************************************************************************/
// Definimos la Vista del componente Bienvenida Header //
/*******************************************************************************************************/
const HomeHeader = () => {
  // Renderizamos el componente
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Animate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">home_work</Icon>
        </Animate>
        <Animate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Bienvenida
          </Typography>
        </Animate>
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default HomeHeader
