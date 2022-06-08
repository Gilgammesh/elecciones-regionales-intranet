/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { getToken } from 'helpers/authToken'
import { IPermisoModReducer } from './permisosReducer'

/*******************************************************************************************************/
// Interface de Action //
/*******************************************************************************************************/
interface IAction {
  type: string
  payload: any
}

/*******************************************************************************************************/
// Interface del Reducer //
/*******************************************************************************************************/
export interface IAuthUsuarioReducer {
  _id: string
  nombres: string
  apellidos: string
  dni: string
  genero: string
  img?: string
  rol: {
    _id: string
    super: boolean
  }
  departamento?: {
    _id: string
    codigo: string
    nombre: string
  }
}
export interface IAuthLoggedUsuarioReducer extends IAuthUsuarioReducer {
  isLogged: boolean
}
export interface IAuthReducer {
  token: string
  usuario: IAuthLoggedUsuarioReducer
  permisos: Array<IPermisoModReducer>
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IAuthReducer = {
  token: getToken(), // Token del usuario
  usuario: {
    isLogged: false,
    _id: '',
    nombres: '',
    apellidos: '',
    dni: '',
    genero: '',
    rol: {
      _id: '',
      super: false
    }
  }, // Datos del usuario logueado
  permisos: [] // Permisos del usuario
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const authReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setAuth:
      return {
        ...state,
        usuario: { isLogged: true, ...payload.usuario },
        permisos: payload.permisos
      }
    case types.login:
      return {
        ...state,
        token: payload.token,
        usuario: { isLogged: true, ...payload.usuario },
        permisos: payload.permisos
      }
    case types.logout:
      return {
        token: '',
        usuario: { isLogged: false },
        permisos: []
      }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default authReducer
