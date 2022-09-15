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
export interface IConsejerosReducer {
  search: {
    tipo: string
    value: string | string[]
  }
  organizacion: string
  departamento: string
  provincia: string
  change: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IConsejerosReducer = {
  search: {
    tipo: '',
    value: ''
  },
  organizacion: 'todos',
  departamento: 'todos',
  provincia: 'todos',
  change: ''
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const consejerosReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setConsejerosSearch:
      return {
        ...state,
        search: payload
      }
    case types.setConsejerosOrganizacion:
      return {
        ...state,
        organizacion: payload
      }
    case types.setConsejerosDepartamento:
      return {
        ...state,
        ...payload
      }
    case types.setConsejerosProvincia:
      return {
        ...state,
        ...payload
      }
    case types.resetConsejeros:
      return { ...initialState, change: `${new Date()}` }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default consejerosReducer
