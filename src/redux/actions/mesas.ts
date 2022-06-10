/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el departamento de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasDepartamento = (
  departamento: string,
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(
      setMesasDepartamento(departamento, provincia, distrito, local, mesa)
    )
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer la provincia de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasProvincia = (
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasProvincia(provincia, distrito, local, mesa))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer el distrito de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasDistrito = (
  distrito: string,
  local: string,
  mesa: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasDistrito(distrito, local, mesa))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer el local de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasLocal = (local: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasLocal(local))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer la mesa de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasMesa = (mesa: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasMesa(mesa))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer el personero de las mesas de votación //
/*******************************************************************************************************/
export const startSetMesasPersonero = (personero: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setMesasPersonero(personero))
  }
}

/*******************************************************************************************************/
// Acción para establecer el departamento de las mesas de votación //
/*******************************************************************************************************/
export const setMesasDepartamento = (
  departamento: string,
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return {
    type: types.setMesasDepartamento,
    payload: { departamento, provincia, distrito, local, mesa }
  }
}
/*******************************************************************************************************/
// Acción para establecer la provincia de las mesas de votación //
/*******************************************************************************************************/
export const setMesasProvincia = (
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return {
    type: types.setMesasProvincia,
    payload: { provincia, distrito, local, mesa }
  }
}
/*******************************************************************************************************/
// Acción para establecer el distrito de las mesas de votación //
/*******************************************************************************************************/
export const setMesasDistrito = (
  distrito: string,
  local: string,
  mesa: string
) => {
  return {
    type: types.setMesasDistrito,
    payload: { distrito, local, mesa }
  }
}
/*******************************************************************************************************/
// Acción para establecer el local de las mesas de votación //
/*******************************************************************************************************/
export const setMesasLocal = (local: string) => {
  return {
    type: types.setMesasLocal,
    payload: local
  }
}
/*******************************************************************************************************/
// Acción para establecer la mesa de las mesas de votación //
/*******************************************************************************************************/
export const setMesasMesa = (mesa: string) => {
  return {
    type: types.setMesasMesa,
    payload: mesa
  }
}
/*******************************************************************************************************/
// Acción para establecer el personero de las mesas de votación //
/*******************************************************************************************************/
export const setMesasPersonero = (personero: string) => {
  return {
    type: types.setMesasPersonero,
    payload: personero
  }
}
