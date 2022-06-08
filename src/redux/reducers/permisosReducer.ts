/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'

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
export interface IPermisoSubModReducer {
  _id: string
  submodulo: string
  acciones: string[]
}
export interface IPermisoModReducer {
  _id: string
  modulo: string
  acciones: string[]
  permisos: Array<IPermisoSubModReducer>
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: Array<IPermisoModReducer> = []

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const permisosReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setPermisos:
      return payload
    case types.resetPermisos:
      return initialState
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default permisosReducer
