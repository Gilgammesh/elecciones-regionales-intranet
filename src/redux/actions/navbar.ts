/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para el evento Iniciar Alternar el Menú para Plegado //
/*******************************************************************************************************/
export const startNavbarToggleFolded = () => {
  return (dispatch: Dispatch) => {
    dispatch(navbarToggleFolded())
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Abrir el Menú para Plegado //
/*******************************************************************************************************/
export const startNavbarOpenFolded = () => {
  return (dispatch: Dispatch) => {
    dispatch(navbarOpenFolded())
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Cerrar el Menú para Plegado //
/*******************************************************************************************************/
export const startNavbarCloseFolded = () => {
  return (dispatch: Dispatch) => {
    dispatch(navbarCloseFolded())
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Alternar el Menú para Móviles //
/*******************************************************************************************************/
export const startNavbarToggleMobile = () => {
  return (dispatch: Dispatch) => {
    dispatch(navbarToggleMobile())
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Abrir el Menú para Móviles //
/*******************************************************************************************************/
export const startNavbarOpenMobile = () => {
  return (dispatch: Dispatch) => {
    dispatch(navbarOpenMobile())
  }
}

/*******************************************************************************************************/
// Función para el evento Iniciar Cerrar el Menú para Móviles //
/*******************************************************************************************************/
export const startNavbarCloseMobile = () => {
  return (dispatch: Dispatch) => {
    dispatch(navbarCloseMobile())
  }
}

/*******************************************************************************************************/
// Accion para el evento Alternar el Menú para Plegado //
/*******************************************************************************************************/
export const navbarToggleFolded = () => {
  return {
    type: types.navbarToggleFolded
  }
}

/*******************************************************************************************************/
// Accion para el evento Abrir el Menú para Plegado //
/*******************************************************************************************************/
export const navbarOpenFolded = () => {
  return {
    type: types.navbarOpenFolded
  }
}

/*******************************************************************************************************/
// Accion para el evento Cerrar el Menú para Plegado //
/*******************************************************************************************************/
export const navbarCloseFolded = () => {
  return {
    type: types.navbarCloseFolded
  }
}

/*******************************************************************************************************/
// Accion para el evento Alternar el Menú para Móviles //
/*******************************************************************************************************/
export const navbarToggleMobile = () => {
  return {
    type: types.navbarToggleMobile
  }
}

/*******************************************************************************************************/
// Accion para el evento Abrir el Menú para Móviles //
/*******************************************************************************************************/
export const navbarOpenMobile = () => {
  return {
    type: types.navbarOpenMobile
  }
}

/*******************************************************************************************************/
// Accion para el evento Cerrar el Menú para Móviles //
/*******************************************************************************************************/
export const navbarCloseMobile = () => {
  return {
    type: types.navbarCloseMobile
  }
}
