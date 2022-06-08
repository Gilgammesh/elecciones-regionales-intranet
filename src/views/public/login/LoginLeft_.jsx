/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Card, CardContent } from '@material-ui/core'
import logo from 'assets/images/logos/logo__.png'
import Animate from 'components/core/Animate'
import LoginFormulario from './LoginFormulario'

/*******************************************************************************************************/
// Definimos el componente Seccion Izquierda del Login //
/*******************************************************************************************************/
const LoginLeft = () => {
  // Renderizamos el componente
  return (
    <Card
      className="flex flex-col w-full max-w-sm items-center justify-center"
      square
      elevation={0}
    >
      <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-400">
        <Animate delay={300}>
          <div className="flex flex-col items-center mb-32">
            <img className="logo-icon w-224 mb-10" src={logo} alt="logo" />
            <LoginFormulario />
          </div>
        </Animate>
      </CardContent>
    </Card>
  )
}

/*******************************************************************************************************/
// Exportamos el componente por defecto //
/*******************************************************************************************************/
export default LoginLeft
