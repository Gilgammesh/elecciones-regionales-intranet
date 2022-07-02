/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el query de búsqueda personalizado de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasSearch = (tipo: string, value: string | string[]) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasSearch(tipo, value))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el estado de mesas con personeros asignados //
/*******************************************************************************************************/
export const startSetMesasAssign = (assign: string | boolean) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasAssign(assign))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el departamento de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasDepartamento(departamento, provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la provincia de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasProvincia = (provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasProvincia(provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el distrito de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasDistrito = (distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasDistrito(distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer cambio en las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasChange = () => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasChange())
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer las mesas de votación //
/*******************************************************************************************************/
export const startResetMesas = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetMesas())
  }
}

/*******************************************************************************************************/
// Acción para establecer el query de búsqueda personalizado de las mesas de votación //
/*******************************************************************************************************/
export const setMesasSearch = (tipo: string, value: string | string[]) => {
  return {
    type: types.setMesasSearch,
    payload: {
      tipo,
      value
    }
  }
}
/*******************************************************************************************************/
// Acción para establecer el estado de mesas con personeros asignados //
/*******************************************************************************************************/
export const setMesasAssign = (assign: string | boolean) => {
  return {
    type: types.setMesasAssign,
    payload: assign
  }
}
/*******************************************************************************************************/
// Acción para establecer el departamento de las mesas de votación //
/*******************************************************************************************************/
export const setMesasDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return {
    type: types.setMesasDepartamento,
    payload: { departamento, provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer la provincia de las mesas de votación //
/*******************************************************************************************************/
export const setMesasProvincia = (provincia: string, distrito: string) => {
  return {
    type: types.setMesasProvincia,
    payload: { provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer el distrito de las mesas de votación //
/*******************************************************************************************************/
export const setMesasDistrito = (distrito: string) => {
  return {
    type: types.setMesasDistrito,
    payload: { distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer cambio en las mesas de votación //
/*******************************************************************************************************/
export const setMesasChange = () => {
  return {
    type: types.setMesasChange
  }
}
/*******************************************************************************************************/
// Acción para restablecer las mesas de votación //
/*******************************************************************************************************/
export const resetMesas = () => {
  return {
    type: types.resetMesas
  }
}
