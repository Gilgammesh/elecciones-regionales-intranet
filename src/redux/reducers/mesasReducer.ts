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
export interface IMesasReducer {
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
const initialState: IMesasReducer = {
  departamento: 'todos',
  provincia: 'todos',
  distrito: 'todos',
  local: 'todos',
  mesa: 'todos',
  personero: 'todos'
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const mesasReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setMesasDepartamento:
      return {
        ...state,
        ...payload
      }
    case types.setMesasProvincia:
      return {
        ...state,
        ...payload
      }
    case types.setMesasDistrito:
      return {
        ...state,
        ...payload
      }
    case types.setMesasLocal:
      return {
        ...state,
        local: payload
      }
    case types.setMesasMesa:
      return {
        ...state,
        mesa: payload
      }
    case types.setMesasPersonero:
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
export default mesasReducer
