/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Icon, Typography } from '@material-ui/core'
import Animate from 'components/core/Animate'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Header //
/*******************************************************************************************************/
const MonitoreoHeader = () => {
  // Renderizamos el componente
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Animate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">desktop_windows</Icon>
        </Animate>
        <Animate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Monitoreo de Mesas y Actas de Votación
          </Typography>
        </Animate>
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoHeader
