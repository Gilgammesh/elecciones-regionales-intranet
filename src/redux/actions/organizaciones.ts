/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el nombre de las organizaciones //
/*******************************************************************************************************/
export const startSetOrganizacionesNombre = (nombre: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setOrganizacionesNombre(nombre))
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer las organizaciones //
/*******************************************************************************************************/
export const startResetOrganizaciones = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetOrganizaciones())
  }
}

/*******************************************************************************************************/
// Acción para establecer el nombre de las organizaciones //
/*******************************************************************************************************/
export const setOrganizacionesNombre = (nombre: string) => {
  return {
    type: types.setOrganizacionesNombre,
    payload: nombre
  }
}
/*******************************************************************************************************/
// Acción para restablecer las organizaciones //
/*******************************************************************************************************/
export const resetOrganizaciones = () => {
  return {
    type: types.resetOrganizaciones
  }
}
