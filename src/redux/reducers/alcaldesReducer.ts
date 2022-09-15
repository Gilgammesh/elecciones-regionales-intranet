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
export interface IAlcaldesReducer {
  search: {
    tipo: string
    value: string | string[]
  }
  tipo: string
  organizacion: string
  departamento: string
  provincia: string
  distrito: string
  change: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IAlcaldesReducer = {
  search: {
    tipo: '',
    value: ''
  },
  tipo: 'todos',
  organizacion: 'todos',
  departamento: 'todos',
  provincia: 'todos',
  distrito: 'todos',
  change: ''
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const alcaldesReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setAlcaldesSearch:
      return {
        ...state,
        search: payload
      }
    case types.setAlcaldesTipo:
      return {
        ...state,
        tipo: payload
      }
    case types.setAlcaldesOrganizacion:
      return {
        ...state,
        organizacion: payload
      }
    case types.setAlcaldesDepartamento:
      return {
        ...state,
        ...payload
      }
    case types.setAlcaldesProvincia:
      return {
        ...state,
        ...payload
      }
    case types.setAlcaldesDistrito:
      return {
        ...state,
        ...payload
      }
    case types.resetAlcaldes:
      return { ...initialState, change: `${new Date()}` }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default alcaldesReducer
