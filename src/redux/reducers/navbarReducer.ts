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
export interface INavbarReducer {
  foldedOpen: boolean
  mobileOpen: boolean
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: INavbarReducer = {
  foldedOpen: false,
  mobileOpen: false
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const navbarReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.navbarToggleFolded:
      return {
        ...state,
        foldedOpen: !state.foldedOpen
      }
    case types.navbarOpenFolded:
      return {
        ...state,
        foldedOpen: true
      }
    case types.navbarCloseFolded:
      return {
        ...state,
        foldedOpen: false
      }
    case types.navbarToggleMobile:
      return {
        ...state,
        mobileOpen: !state.mobileOpen
      }
    case types.navbarOpenMobile:
      return {
        ...state,
        mobileOpen: true
      }
    case types.navbarCloseMobile:
      return {
        ...state,
        mobileOpen: false
      }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default navbarReducer
