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
  search: {
    tipo: string
    value: string
  }
  assign: string | boolean
  departamento: string
  provincia: string
  distrito: string
  change: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IMesasReducer = {
  search: {
    tipo: '',
    value: ''
  },
  assign: 'todos',
  departamento: 'todos',
  provincia: 'todos',
  distrito: 'todos',
  change: ''
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const mesasReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setMesasSearch:
      return {
        ...state,
        search: payload
      }
    case types.setMesasAssign:
      return {
        ...state,
        assign: payload
      }
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
    case types.setMesasChange:
      return {
        ...state,
        change: `${new Date()}`
      }
    case types.resetMesas:
      return { ...initialState, change: `${new Date()}` }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default mesasReducer
