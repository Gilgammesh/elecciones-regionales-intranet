/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'
import clsx from 'clsx'
import Animate from 'components/core/Animate'
import bg from 'assets/images/backgrounds/login-rigth.jpg'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  rightSection: {
    background: `url(${bg})`,
    color: '#FFFFFF',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '120% 100%'
  },
  bgColor: {
    background: `linear-gradient(to right, ${darken(
      'rgb(62,105,161,0.78)',
      0.2
    )} 0%, ${darken('rgb(249,68,37,0.78)', 0.2)} 100%)`
  }
}))

/*******************************************************************************************************/
// Definimos el componente Seccion Derecha del Login //
/*******************************************************************************************************/
const LoginRight = () => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Renderizamos el componente
  return (
    <div className={clsx(styles.rightSection, 'hidden md:flex flex-1')}>
      <div className={clsx(styles.bgColor, 'md:flex flex-1 p-56')}>
        <div className="flex flex-col items-center justify-center">
          <Animate animation="transition.slideUpIn" delay={400}>
            <Typography
              variant="h3"
              color="inherit"
              className="font-800 leading-tight"
            >
              Bienvenido a Elecciones Regionales y Municipales
            </Typography>
          </Animate>
          <Animate delay={500}>
            <Typography variant="subtitle1" color="inherit" className="mt-32">
              Sistema web interno del partido político para monitorear y
              gestionar el proceso de las elecciones regionales y municipales.
              <br />
              <br />
              Los personeros en cada mesa ingresan la información de las actas
              en línea, lo cual permite ver las estadísticas por departamento,
              provincia y distrito.
            </Typography>
          </Animate>
        </div>
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default LoginRight
