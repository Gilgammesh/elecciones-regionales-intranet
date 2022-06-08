/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el departamento de los centros de votación //
/*******************************************************************************************************/
export const startSetCentrosVotacionDepartamento = (
  departamento: string,
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(
      setCentrosVotacionDepartamento(
        departamento,
        provincia,
        distrito,
        local,
        mesa
      )
    )
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer la provincia de los centros de votación //
/*******************************************************************************************************/
export const startSetCentrosVotacionProvincia = (
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(setCentrosVotacionProvincia(provincia, distrito, local, mesa))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer el distrito de los centros de votación //
/*******************************************************************************************************/
export const startSetCentrosVotacionDistrito = (
  distrito: string,
  local: string,
  mesa: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(setCentrosVotacionDistrito(distrito, local, mesa))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer el local de los centros de votación //
/*******************************************************************************************************/
export const startSetCentrosVotacionLocal = (local: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setCentrosVotacionLocal(local))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer la mesa de los centros de votación //
/*******************************************************************************************************/
export const startSetCentrosVotacionMesa = (mesa: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setCentrosVotacionMesa(mesa))
  }
}

/*******************************************************************************************************/
// Función para iniciar establecer el personero de los centros de votación //
/*******************************************************************************************************/
export const startSetCentrosVotacionPersonero = (personero: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setCentrosVotacionPersonero(personero))
  }
}

/*******************************************************************************************************/
// Acción para establecer el departamento de los centros de votación //
/*******************************************************************************************************/
export const setCentrosVotacionDepartamento = (
  departamento: string,
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return {
    type: types.setCentrosVotacionDepartamento,
    payload: { departamento, provincia, distrito, local, mesa }
  }
}
/*******************************************************************************************************/
// Acción para establecer la provincia de los centros de votación //
/*******************************************************************************************************/
export const setCentrosVotacionProvincia = (
  provincia: string,
  distrito: string,
  local: string,
  mesa: string
) => {
  return {
    type: types.setCentrosVotacionProvincia,
    payload: { provincia, distrito, local, mesa }
  }
}
/*******************************************************************************************************/
// Acción para establecer el distrito de los centros de votación //
/*******************************************************************************************************/
export const setCentrosVotacionDistrito = (
  distrito: string,
  local: string,
  mesa: string
) => {
  return {
    type: types.setCentrosVotacionDistrito,
    payload: { distrito, local, mesa }
  }
}
/*******************************************************************************************************/
// Acción para establecer el local de los centros de votación //
/*******************************************************************************************************/
export const setCentrosVotacionLocal = (local: string) => {
  return {
    type: types.setCentrosVotacionLocal,
    payload: local
  }
}
/*******************************************************************************************************/
// Acción para establecer la mesa de los centros de votación //
/*******************************************************************************************************/
export const setCentrosVotacionMesa = (mesa: string) => {
  return {
    type: types.setCentrosVotacionMesa,
    payload: mesa
  }
}
/*******************************************************************************************************/
// Acción para establecer el personero de los centros de votación //
/*******************************************************************************************************/
export const setCentrosVotacionPersonero = (personero: string) => {
  return {
    type: types.setCentrosVotacionPersonero,
    payload: personero
  }
}
