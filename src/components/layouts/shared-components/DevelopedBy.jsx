/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import logo from 'assets/images/logos/logo_santander.png'

/*******************************************************************************************************/
// Definimos el componente del Layout - Desarrollado Por  //
/*******************************************************************************************************/
const DevelopedBy = () => {
  // Renderizamos el componente
  return (
    <div className="flex items-center">
      <Typography
        component="span"
        className="normal-case font-bold flex text-white"
      >
        Desarrollado por:&nbsp;&nbsp;
      </Typography>
      <IconButton
        className="px-4"
        component="a"
        href="https://www.santandertech.com/"
        target="_blank"
        rel="noreferrer noopener"
        role="button"
      >
        <img src={logo} alt="santandertech" width="140" />
      </IconButton>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DevelopedBy
