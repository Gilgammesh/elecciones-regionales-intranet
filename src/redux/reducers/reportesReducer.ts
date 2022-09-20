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
export enum EReportesTipo {
  GOBERNADORES = 'gobernadores',
  ALCALDES = 'alcaldes'
}
export interface IReportesReducer {
  tipo: string
  departamento: string
  provincia: string
  distrito: string
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IReportesReducer = {
  tipo: EReportesTipo.GOBERNADORES,
  departamento: 'todos',
  provincia: 'todos',
  distrito: 'todos'
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const ReportesReducer = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case types.setReportesTipo:
      return {
        ...state,
        tipo: payload
      }
    case types.setReportesDepartamento:
      return {
        ...state,
        ...payload
      }
    case types.setReportesProvincia:
      return {
        ...state,
        ...payload
      }
    case types.setReportesDistrito:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default ReportesReducer
