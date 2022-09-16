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
export interface IMonitoreoReducer {
  search: {
    tipo: string
    value: string
  }
  departamento: string
  provincia: string
  distrito: string
  estadoActaReg: string
  estadoActaProv: string
  change: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IMonitoreoReducer = {
  search: {
    tipo: '',
    value: ''
  },
  departamento: 'todos',
  provincia: 'todos',
  distrito: 'todos',
  estadoActaReg: 'todos',
  estadoActaProv: 'todos',
  change: ''
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const MonitoreoReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setMonitoreoSearch:
      return {
        ...state,
        search: payload
      }
    case types.setMonitoreoDepartamento:
      return {
        ...state,
        ...payload
      }
    case types.setMonitoreoProvincia:
      return {
        ...state,
        ...payload
      }
    case types.setMonitoreoDistrito:
      return {
        ...state,
        ...payload
      }
    case types.setMonitoreoEstadoActaReg:
      return {
        ...state,
        estadoActaReg: payload
      }
    case types.setMonitoreoEstadoActaProv:
      return {
        ...state,
        estadoActaProv: payload
      }
    case types.resetMonitoreo:
      return { ...initialState, change: `${new Date()}` }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default MonitoreoReducer
