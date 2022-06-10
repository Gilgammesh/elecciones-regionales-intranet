/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { ISubmoduloReducer } from './submodulosReducer'

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
export interface IModuloReducer {
  _id: string
  orden: number
  tag: string
  nombre: string
  descripcion?: string
  type: string
  url?: string
  icon?: string
  children?: Array<ISubmoduloReducer>
  estado: boolean
}
export interface INavigationSubModReducer {
  orden: number
  id: string
  title: string
  type: string
  url?: string
}
export interface INavigationModReducer {
  orden: number
  id: string
  title: string
  type: string
  icon?: string
  url?: string
  children?: Array<INavigationSubModReducer>
}
export interface INavigationReducer {
  id: string
  title: string
  type: string
  children: Array<INavigationModReducer>
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: INavigationReducer = {
  id: 'modulos',
  title: 'Módulos',
  type: 'group',
  children: []
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const navigationReducer = (
  state = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case types.setNavigation:
      return {
        ...state,
        children: payload
      }
    case types.resetNavigation:
      return {
        ...initialState
      }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default navigationReducer
