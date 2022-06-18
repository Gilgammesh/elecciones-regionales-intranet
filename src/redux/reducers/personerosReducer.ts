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
export interface IPersonerosReducer {
  search: {
    tipo: string
    value: string | string[]
  }
  tipo: string
  estado: string | boolean
  departamento: string
  change: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IPersonerosReducer = {
  search: {
    tipo: '',
    value: ''
  },
  tipo: 'todos',
  estado: 'todos',
  departamento: 'todos',
  change: ''
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const personerosReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setPersonerosSearch:
      return {
        ...state,
        search: payload
      }
    case types.setPersonerosTipo:
      return {
        ...state,
        tipo: payload
      }
    case types.setPersonerosEstado:
      return {
        ...state,
        estado: payload
      }
    case types.setPersonerosDepartamento:
      return {
        ...state,
        departamento: payload
      }
    case types.resetPersoneros:
      return { ...initialState, change: `${new Date()}` }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default personerosReducer
