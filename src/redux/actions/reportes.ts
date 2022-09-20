/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el query de búsqueda personalizado del reportes //
/*******************************************************************************************************/
export const startSetReportesTipo = (tipo: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setReportesTipo(tipo))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el departamento de reportes //
/*******************************************************************************************************/
export const startSetReportesDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setReportesDepartamento(departamento, provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la provincia de reportes //
/*******************************************************************************************************/
export const startSetReportesProvincia = (provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setReportesProvincia(provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el distrito de reportes //
/*******************************************************************************************************/
export const startSetReportesDistrito = (distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setReportesDistrito(distrito))
  }
}

/*******************************************************************************************************/
// Acción para establecer el tipo de reportes //
/*******************************************************************************************************/
export const setReportesTipo = (tipo: string) => {
  return {
    type: types.setReportesTipo,
    payload: tipo
  }
}
/*******************************************************************************************************/
// Acción para establecer el departamento de reportes //
/*******************************************************************************************************/
export const setReportesDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return {
    type: types.setReportesDepartamento,
    payload: { departamento, provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer la provincia de reportes //
/*******************************************************************************************************/
export const setReportesProvincia = (provincia: string, distrito: string) => {
  return {
    type: types.setReportesProvincia,
    payload: { provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer el distrito de reportes //
/*******************************************************************************************************/
export const setReportesDistrito = (distrito: string) => {
  return {
    type: types.setReportesDistrito,
    payload: { distrito }
  }
}
