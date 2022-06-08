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
export interface ICentrosVotacionReducer {
  departamento: string
  provincia: string
  distrito: string
  local: string
  mesa: string
  personero: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: ICentrosVotacionReducer = {
  departamento: 'todos',
  provincia: 'todos',
  distrito: 'todos',
  local: 'todos',
  mesa: 'todos',
  personero: ''
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const centrosVotacionReducer = (
  state = initialState,
  { type, payload }: IAction
) => {
  switch (type) {
    case types.setCentrosVotacionDepartamento:
      return {
        ...state,
        ...payload
      }
    case types.setCentrosVotacionProvincia:
      return {
        ...state,
        ...payload
      }
    case types.setCentrosVotacionDistrito:
      return {
        ...state,
        ...payload
      }
    case types.setCentrosVotacionLocal:
      return {
        ...state,
        local: payload
      }
    case types.setCentrosVotacionMesa:
      return {
        ...state,
        mesa: payload
      }
    case types.setCentrosVotacionPersonero:
      return {
        ...state,
        personero: payload
      }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default centrosVotacionReducer
