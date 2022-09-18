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
interface IPersonero {
  _id: string
  nombres: string
  apellidos: string
  dni: string
}
interface IUbigeo {
  _id: string
  nombre: string
}
export interface IMonitoreoRow {
  _id: string
  mesa: string
  local: string
  votantes: number
  ubigeo: string
  personero_mesa: IPersonero
  personero_local: IPersonero
  departamento: IUbigeo
  provincia: IUbigeo
  distrito: IUbigeo
  anho: number
}
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
  row: IMonitoreoRow
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialStateRow: IMonitoreoRow = {
  _id: '',
  mesa: '',
  local: '',
  votantes: 0,
  ubigeo: '',
  personero_mesa: {
    _id: '',
    nombres: '',
    apellidos: '',
    dni: ''
  },
  personero_local: {
    _id: '',
    nombres: '',
    apellidos: '',
    dni: ''
  },
  departamento: {
    _id: '',
    nombre: ''
  },
  provincia: {
    _id: '',
    nombre: ''
  },
  distrito: {
    _id: '',
    nombre: ''
  },
  anho: 0
}
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
  change: '',
  row: initialStateRow
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
    case types.setMonitoreoRow:
      return {
        ...state,
        row: payload
      }
    case types.resetMonitoreoRow:
      return {
        ...state,
        row: initialStateRow
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
