/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import Animate from '../Animate'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles({
  root: {
    '&.horizontal': {},
    '&.vertical': {
      flexDirection: 'column'
    }
  },
  title: {
    color: '#034495',
    fontWeight: '700'
  }
})

/*******************************************************************************************************/
// Definimos el componente que titulo de la aplicación //
/*******************************************************************************************************/
const Title = props => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Obtenemos los datos del usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Renderizamos
  return (
    <div className={clsx(styles.root, 'flex flex-1', props.className)}>
      <Animate
        enter={{
          animation: 'transition.expandIn'
        }}
        className="flex flex-1 flex-col"
      >
        <Typography variant="h6" className={styles.title}>
          Elecciones Regionales {usuario.anho}
          {!usuario.rol.super && ` - Región ${usuario.departamento.nombre}`}
        </Typography>
      </Animate>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado y con rutas //
/*******************************************************************************************************/
export default React.memo(Title)
