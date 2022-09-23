/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { RouteComponentProps } from 'react-router-dom'
import { deleteToken, setToken, getToken } from 'helpers/authToken'
import { fetchData } from 'services/fetch'
import { validateFetchData } from 'helpers/validateFetchData'
import { startResetNavigation, startSetNavigation } from './navigation'
import { apiBaseUrl, apiGeolocUrl, appBaseUrl } from 'configs/settings'
import { io } from 'socket.io-client'
import { startSetSocketIO } from './socketio'
import { Dispatch } from 'redux'
import { IAuthUsuarioReducer } from 'redux/reducers/authReducer'
import { IPermisoModReducer } from 'redux/reducers/permisosReducer'
import { IModuloReducer } from 'redux/reducers/navigationReducer'
import { IRootReducers } from 'redux/store'
import { browserName, isDesktop, isMobile, isTablet } from 'react-device-detect'

/*******************************************************************************************************/
// Interfac de Login //
/*******************************************************************************************************/
interface ILogin {
  dni: string
  password: string
}

/*******************************************************************************************************/
// Función para iniciar el evento Establecer los datos de Autenticación //
/*******************************************************************************************************/
export const startSetAuth = (
  usuario: IAuthUsuarioReducer,
  permisos: Array<IPermisoModReducer>,
  modulos: Array<IModuloReducer>
) => {
  return async (dispatch: Dispatch) => {
    // Intentamos obtener la IPv4 del usuario
    let ipv4 = ''
    try {
      const resGeo = await fetch(apiGeolocUrl)
      const dataGeo = await resGeo.json()
      ipv4 = dataGeo.IPv4 as string
    } catch (error) {
      ipv4 = '127.0.0.0'
    }
    // Dispositivo del origen
    let device = ''
    if (isMobile) device = 'Mobile'
    if (isTablet) device = 'Tablet'
    if (isDesktop) device = 'Desktop'

    // Establecemos el socket de conexión con el api
    const socket = io(apiBaseUrl, { 
      auth: {
        token: getToken(),
        source: 'intranet',
        origin: appBaseUrl,
        ip: ipv4,
        device,
        browser: browserName
      }
    })
    // Si establecimos conexión, guardamos el socket en el store
    socket.on('connect', async () => {
      dispatch<any>(startSetSocketIO(socket))
    })

    // Establecemos la navegacion
    dispatch<any>(startSetNavigation(usuario, permisos, modulos))

    // Establecemos los datos del usuario
    dispatch(setAuth(usuario, permisos))
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Login //
/*******************************************************************************************************/
export const startLogin = (body: ILogin, history: RouteComponentProps['history']) => {
  return async (dispatch: Dispatch) => {
    // Hacemos la petición al servidor con los datos del usuario
    const result = await fetchData('auth/login', { isTokenReq: false }, 'POST', body)
    // Validamos el resultado de la petición
    if (validateFetchData(result)) {
      // Si existe un data en el resultado
      if (result.data) {
        // Intentamos obtener la IPv4 del usuario
        let ipv4 = ''
        try {
          const resGeo = await fetch(apiGeolocUrl)
          const dataGeo = await resGeo.json()
          ipv4 = dataGeo.IPv4 as string
        } catch (error) {
          ipv4 = '127.0.0.0'
        }
        // Dispositivo del origen
        let device = ''
        if (isMobile) device = 'Mobile'
        if (isTablet) device = 'Tablet'
        if (isDesktop) device = 'Desktop'

        // Establecemos el socket de conexión con el api
        const socket = io(apiBaseUrl, {
          auth: {
            token: result.data.token,
            source: 'intranet',
            origin: appBaseUrl,
            ip: ipv4,
            device,
            browser: browserName
          }
        })
        // Si establecimos conexión, guardamos el socket en el store
        socket.on('connect', () => {
          dispatch<any>(startSetSocketIO(socket))
        })
        // Establecemos el token
        setToken(result.data.token)

        // Establecemos la navegación
        dispatch<any>(startSetNavigation(result.data.usuario, result.data.permisos, result.data.modulos))

        // Redireccionamos
        history.replace('/reportes')

        // Establecemos los datos del usuario
        dispatch(login(result.data.token, result.data.usuario, result.data.permisos))
      }
    }
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Logout //
/*******************************************************************************************************/
export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    // Eliminamos el token
    deleteToken()

    // Reseteamos los módulos del usuario
    dispatch<any>(startResetNavigation())
    // Limpiamos el socket de conexión
    dispatch<any>(startSetSocketIO(null))

    // Eliminamos los datos del usuario
    dispatch(logout())
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Obtener acciones de un módulo //
/*******************************************************************************************************/
export const startGetAccionesModulo = (modulo: string) => {
  return async (dispatch: Dispatch, getState: () => IRootReducers) => {
    // Obtenemos los permisos del Rol de usuario
    const { permisos } = getState().auth

    // Recorremos los permisos para ubicar el módulo
    let acciones: string[] = []
    // Recorremos los permisos del módulo
    const promises = permisos.map((ele: IPermisoModReducer) => {
      // Si el módulo coincide con el módulo seleccionado
      if (ele.modulo === modulo) {
        // Retornamos las acciones del módulo
        acciones = ele.acciones
      }
      return null
    })
    await Promise.all(promises)

    // Retornamos las acciones del módulo
    return acciones
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Obtener acciones de un submódulo de un Módulo //
/*******************************************************************************************************/
export const startGetAccionesSubModulo = (modulo: string, submodulo: string) => {
  return async (dispatch: Dispatch, getState: () => IRootReducers) => {
    // Obtenemos los permisos del Rol de usuario
    const { permisos } = getState().auth

    // Recorremos los permisos para ubicar el módulo y el submódulo
    let acciones: string[] = []
    // Recorremos los permisos del módulo
    const promises = permisos.map((ele: IPermisoModReducer) => {
      // Si el módulo coincide con el módulo seleccionado
      if (ele.modulo === modulo) {
        // Recorremos los permisos del submódulo
        ele.permisos.map(ele_ => {
          // Si el submódulo coincide con el submódulo seleccionado
          if (ele_.submodulo === submodulo) {
            // Retornamos las acciones del submódulo
            acciones = ele_.acciones
          }
          return null
        })
      }
      return null
    })
    await Promise.all(promises)

    // Retornamos las acciones del submnódulo
    return acciones
  }
}

/*******************************************************************************************************/
// Acción para el evento Establecer los datos de Autenticación //
/*******************************************************************************************************/
export const setAuth = (usuario: IAuthUsuarioReducer, permisos: Array<IPermisoModReducer>) => {
  return {
    type: types.setAuth,
    payload: {
      usuario,
      permisos
    }
  }
}

/*******************************************************************************************************/
// Accion para el evento login //
/*******************************************************************************************************/
export const login = (token: string, usuario: IAuthUsuarioReducer, permisos: Array<IPermisoModReducer>) => {
  return {
    type: types.login,
    payload: {
      token,
      usuario,
      permisos
    }
  }
}

/*******************************************************************************************************/
// Accion para el evento logout //
/*******************************************************************************************************/
export const logout = () => {
  return {
    type: types.logout
  }
}
