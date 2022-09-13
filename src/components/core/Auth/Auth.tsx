/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'services/fetch'
import { startLogout, startSetAuth } from 'redux/actions/auth'
import SplashScreen from '../SplashScreen'
import { getToken } from 'helpers/authToken'
import { store_lastpath, store_settings } from 'configs/settings'
import { IRootReducers } from 'redux/store'

/*******************************************************************************************************/
// Props para el componente //
/*******************************************************************************************************/
type Props = {
  children: React.ReactNode
}

/*******************************************************************************************************/
// Definimos el componente de Authenticación de la aplicación //
/*******************************************************************************************************/
const Auth = (props: Props) => {
  // Llamamos al history de las rutas
  const history = useHistory()

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Recuperamos el state de los settings del usuario
  const settings = useSelector((state: IRootReducers) => state.settings)

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector((state: IRootReducers) => state.socketio)

  // Estado inicial si espera por validar la autenticacion
  const [waitAuthCheck, setWaitAuthCheck] = useState(true)

  // Efecto para verificar la autenticación del usuario
  useEffect(() => {
    let mounted = true

    const authToken = () => {
      // Obtenemos el token del usuario en caso exista
      const token = getToken()
      // Si existe un token verificamos
      if (token && token !== '') {
        // Validamos el token en el servidor
        fetchData('auth/check', { isTokenReq: false }, 'POST', { token }).then(result => {
          if (result && mounted && result.data) {
            if (result.data.status) {
              dispatch(startSetAuth(result.data.usuario, result.data.permisos, result.data.modulos))
              history.push(localStorage.getItem(store_lastpath) || '')
              setWaitAuthCheck(false)
            } else {
              dispatch(startLogout())
              history.push('/auth')
              setWaitAuthCheck(false)
            }
          }
        })
      } else {
        dispatch(startLogout())
        history.push('/auth')
        setWaitAuthCheck(false)
      }
    }
    authToken()

    // Limpiamos el mounted
    return () => {
      mounted = false
    }
  }, [dispatch, history])

  // Si existe un cambio en los settings almacenamos en el localstorage
  useEffect(() => {
    localStorage.setItem(store_settings, JSON.stringify(settings))
  }, [settings])

  // Monitoreamos los eventos del socket
  useEffect(() => {
    // Si existe un socket
    if (socket) {
      // Si una sesión fue cerrada
      socket.on('admin-sesion-cerrada', () => {
        dispatch(startLogout())
      })
    }
  }, [socket, dispatch])

  if (waitAuthCheck) {
    return <SplashScreen />
  }

  // Renderizamos el componente y pasamos las propiedades a los hijos
  return <>{props.children}</>
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Auth)
