/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Icon, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@material-ui/core'
import { startLogout } from 'redux/actions/auth'
import male from 'assets/images/avatars/male.jpg'
import female from 'assets/images/avatars/female.jpg'

/*******************************************************************************************************/
// Definimos el componente del Layout - Menú de Usuario //
/*******************************************************************************************************/
const UserMenu = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Llamamos al history de las rutas
  const history = useHistory()

  // Recuperamos el state de authentication de usuario
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Estado inicial del menú de usuario desplegable
  const [userMenu, setUserMenu] = useState(null)

  // Definimos el avatar del usuario de acuerdo al género
  let userAvatar = ''
  if (usuario.genero === 'M') {
    userAvatar = male
  }
  if (usuario.genero === 'F') {
    userAvatar = female
  }

  // Función que muestra el menú de usuario desplegable
  const userMenuClick = event => {
    setUserMenu(event.currentTarget)
  }

  // Función que oculta el menú de usuario desplegable
  const userMenuClose = () => {
    setUserMenu(null)
  }

  // Función para salir de la aplicación
  const handleLogout = () => {
    userMenuClose()
    dispatch(startLogout())
    history.push('/auth')
    socket.disconnect()
  }

  // Renderizamos el componente
  return (
    <>
      <Button className="min-h-40" onClick={userMenuClick}>
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="normal-case font-bold flex">
            {`${usuario.nombres.trim().split(' ')[0]} ${usuario.apellidos.trim().split(' ')[0]}`}
          </Typography>
        </div>

        <Avatar className="mx-4" alt="foto usuario" src={usuario.img ? usuario.img : userAvatar} />
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        <MenuItem component={Link} to="/cambiar-contraseña" onClick={userMenuClose} role="button">
          <ListItemIcon className="min-w-40">
            <Icon className="text-20">vpn_key</Icon>
          </ListItemIcon>
          <ListItemText primary="Cambiar contraseña" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon className="min-w-40">
            <Icon className="text-20">exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </MenuItem>
      </Popover>
    </>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default UserMenu
