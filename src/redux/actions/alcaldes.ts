/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el query de búsqueda personalizado de los alcaldes //
/*******************************************************************************************************/
export const startSetAlcaldesSearch = (tipo: string, value: string | string[]) => {
  return (dispatch: Dispatch) => {
    dispatch(setAlcaldesSearch(tipo, value))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la organización de los alcaldes //
/*******************************************************************************************************/
export const startSetAlcaldesTipo = (tipo: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAlcaldesTipo(tipo))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la organización de los alcaldes //
/*******************************************************************************************************/
export const startSetAlcaldesOrganizacion = (organizacion: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAlcaldesOrganizacion(organizacion))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el departamento de los alcaldes //
/*******************************************************************************************************/
export const startSetAlcaldesDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAlcaldesDepartamento(departamento, provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la provincia de los alcaldes //
/*******************************************************************************************************/
export const startSetAlcaldesProvincia = (provincia: string, distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAlcaldesProvincia(provincia, distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el distrito de los alcaldes //
/*******************************************************************************************************/
export const startSetAlcaldesDistrito = (distrito: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAlcaldesDistrito(distrito))
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer los alcaldes //
/*******************************************************************************************************/
export const startResetAlcaldes = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetAlcaldes())
  }
}

/*******************************************************************************************************/
// Acción para establecer el query de búsqueda personalizado de los alcaldes //
/*******************************************************************************************************/
export const setAlcaldesSearch = (tipo: string, value: string | string[]) => {
  return {
    type: types.setAlcaldesSearch,
    payload: {
      tipo,
      value
    }
  }
}
/*******************************************************************************************************/
// Acción para establecer el tipo de los alcaldes //
/*******************************************************************************************************/
export const setAlcaldesTipo = (tipo: string) => {
  return {
    type: types.setAlcaldesTipo,
    payload: tipo
  }
}
/*******************************************************************************************************/
// Acción para establecer la organización de los alcaldes //
/*******************************************************************************************************/
export const setAlcaldesOrganizacion = (organizacion: string) => {
  return {
    type: types.setAlcaldesOrganizacion,
    payload: organizacion
  }
}
/*******************************************************************************************************/
// Acción para establecer el departamento de los alcaldes //
/*******************************************************************************************************/
export const setAlcaldesDepartamento = (departamento: string, provincia: string, distrito: string) => {
  return {
    type: types.setAlcaldesDepartamento,
    payload: { departamento, provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer la provincia de los alcaldes //
/*******************************************************************************************************/
export const setAlcaldesProvincia = (provincia: string, distrito: string) => {
  return {
    type: types.setAlcaldesProvincia,
    payload: { provincia, distrito }
  }
}
/*******************************************************************************************************/
// Acción para establecer el distrito de los alcaldes //
/*******************************************************************************************************/
export const setAlcaldesDistrito = (distrito: string) => {
  return {
    type: types.setAlcaldesDistrito,
    payload: { distrito }
  }
}
/*******************************************************************************************************/
// Acción para restablecer los alcaldes //
/*******************************************************************************************************/
export const resetAlcaldes = () => {
  return {
    type: types.resetAlcaldes
  }
}
