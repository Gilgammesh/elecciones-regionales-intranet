/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'
import { IMonitoreoRow } from 'redux/reducers/monitoreoReducer'

/*******************************************************************************************************/
// Función para iniciar establecer el query de búsqueda personalizado del monitoreo //
/*******************************************************************************************************/
export const startSetMonitoreoSearch = (tipo: string, value: string | string[]) => {
  return (dispatch: Dispatch) => {
    dispatch(setMonitoreoSearch(tipo, value))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el departamento del monitoreo //
/*******************************************************************************************************/
export const startSetMonitoreoDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMonitoreoDepartamento(departamento, provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la provincia del monitoreo //
/*******************************************************************************************************/
export const startSetMonitoreoProvincia = (provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMonitoreoProvincia(provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el distrito del monitoreo //
/*******************************************************************************************************/
export const startSetMonitoreoDistrito = (distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMonitoreoDistrito(distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el estado del acta regional del monitoreo //
/*******************************************************************************************************/
export const startSetMonitoreoEstadoActaReg = (estado: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMonitoreoEstadoActaReg(estado))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el estado del acta regional del monitoreo //
/*******************************************************************************************************/
export const startSetMonitoreoEstadoActaProv = (estado: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMonitoreoEstadoActaProv(estado))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el Row del monitoreo //
/*******************************************************************************************************/
export const startSetMonitoreoRow = (row: IMonitoreoRow) => {
  return (dispatch: Dispatch) => {
    dispatch(setMonitoreoRow(row))
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer el row de monitoreo //
/*******************************************************************************************************/
export const startResetMonitoreoRow = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetMonitoreoRow())
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer el monitoreo //
/*******************************************************************************************************/
export const startResetMonitoreo = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetMonitoreo())
  }
}

/*******************************************************************************************************/
// Acción para establecer el query de búsqueda personalizado del monitoreo //
/*******************************************************************************************************/
export const setMonitoreoSearch = (tipo: string, value: string | string[]) => {
  return {
    type: types.setMonitoreoSearch,
    payload: {
      tipo,
      value
    }
  }
}
/*******************************************************************************************************/
// Acción para establecer el departamento del monitoreo //
/*******************************************************************************************************/
export const setMonitoreoDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return {
    type: types.setMonitoreoDepartamento,
    payload: { departamento, provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer la provincia del monitoreo //
/*******************************************************************************************************/
export const setMonitoreoProvincia = (provincia: string, distrito: string) => {
  return {
    type: types.setMonitoreoProvincia,
    payload: { provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer el distrito del monitoreo //
/*******************************************************************************************************/
export const setMonitoreoDistrito = (distrito: string) => {
  return {
    type: types.setMonitoreoDistrito,
    payload: { distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer el estado del acta regional del monitoreo //
/*******************************************************************************************************/
export const setMonitoreoEstadoActaReg = (estado: string) => {
  return {
    type: types.setMonitoreoEstadoActaReg,
    payload: estado
  }
}
/*******************************************************************************************************/
// Acción para establecer el estado del acta provincial del monitoreo //
/*******************************************************************************************************/
export const setMonitoreoEstadoActaProv = (estado: string) => {
  return {
    type: types.setMonitoreoEstadoActaProv,
    payload: estado
  }
}
/*******************************************************************************************************/
// Acción para establecer el Row del monitoreo //
/*******************************************************************************************************/
export const setMonitoreoRow = (row: IMonitoreoRow) => {
  return {
    type: types.setMonitoreoRow,
    payload: row
  }
}
/*******************************************************************************************************/
// Acción para restablecer el row de monitoreo //
/*******************************************************************************************************/
export const resetMonitoreoRow = () => {
  return {
    type: types.resetMonitoreoRow
  }
}
/*******************************************************************************************************/
// Acción para restablecer el monitoreo //
/*******************************************************************************************************/
export const resetMonitoreo = () => {
  return {
    type: types.resetMonitoreo
  }
}
