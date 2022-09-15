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
export interface IGobernadoresReducer {
  search: {
    tipo: string
    value: string | string[]
  }
  organizacion: string
  departamento: string
  change: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IGobernadoresReducer = {
  search: {
    tipo: '',
    value: ''
  },
  organizacion: 'todos',
  departamento: 'todos',
  change: ''
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const gobernadoresReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setGobernadoresSearch:
      return {
        ...state,
        search: payload
      }
    case types.setGobernadoresOrganizacion:
      return {
        ...state,
        organizacion: payload
      }
    case types.setGobernadoresDepartamento:
      return {
        ...state,
        departamento: payload
      }
    case types.resetGobernadores:
      return { ...initialState, change: `${new Date()}` }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default gobernadoresReducer
