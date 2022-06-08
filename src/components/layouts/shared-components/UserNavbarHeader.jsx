/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import male from 'assets/images/avatars/male.jpg'
import female from 'assets/images/avatars/female.jpg'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    '&.user': {
      '& .username, & .email': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      }
    }
  },
  avatar: {
    width: 72,
    height: 72,
    position: 'absolute',
    top: 92,
    padding: 8,
    background: theme.palette.background.default,
    boxSizing: 'content-box',
    left: '50%',
    transform: 'translateX(-50%)',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    }),
    '& > img': {
      borderRadius: '50%'
    }
  }
}))

/*******************************************************************************************************/
// Definimos el componente del Layout - Cabecera de NavBar de Usuario //
/*******************************************************************************************************/
const UserNavbarHeader = () => {
  // Recuperamos el state de authentication de usuario
  const auth = useSelector(state => state.auth)
  const { usuario } = auth

  // Instanciamos los estilos
  const styles = useStyles()

  // Definimos el avatar del usuario de acuerdo al género
  let userAvatar = ''
  if (usuario.genero === 'M') {
    userAvatar = male
  }
  if (usuario.genero === 'F') {
    userAvatar = female
  }

  // Renderizamos el componente
  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      classes={{ root: styles.root }}
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
    >
      <Typography
        className="username text-16 whitespace-no-wrap"
        color="inherit"
      >
        {`${usuario.nombres.trim().split(' ')[0]} ${
          usuario.apellidos.trim().split(' ')[0]
        }`}
      </Typography>
      <Typography
        className="email text-13 mt-8 opacity-50 whitespace-no-wrap"
        color="inherit"
      >
        {`DNI: ${usuario.dni}`}
      </Typography>
      <Avatar
        className={clsx(styles.avatar, 'avatar')}
        alt="foto usuario"
        src={usuario.img ? usuario.img : userAvatar}
      />
    </AppBar>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default UserNavbarHeader
