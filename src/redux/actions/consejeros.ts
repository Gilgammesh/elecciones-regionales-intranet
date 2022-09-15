/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el query de búsqueda personalizado de los consejeros //
/*******************************************************************************************************/
export const startSetConsejerosSearch = (tipo: string, value: string | string[]) => {
  return (dispatch: Dispatch) => {
    dispatch(setConsejerosSearch(tipo, value))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la organización de los consejeros //
/*******************************************************************************************************/
export const startSetConsejerosOrganizacion = (organizacion: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setConsejerosOrganizacion(organizacion))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el departamento de los consejeros //
/*******************************************************************************************************/
export const startSetConsejerosDepartamento = (departamento: string, provincia: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setConsejerosDepartamento(departamento, provincia))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la provincia de los consejeros //
/*******************************************************************************************************/
export const startSetConsejerosProvincia = (provincia: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setConsejerosProvincia(provincia))
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer los consejeros //
/*******************************************************************************************************/
export const startResetConsejeros = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetConsejeros())
  }
}

/*******************************************************************************************************/
// Acción para establecer el query de búsqueda personalizado de los consejeros //
/*******************************************************************************************************/
export const setConsejerosSearch = (tipo: string, value: string | string[]) => {
  return {
    type: types.setConsejerosSearch,
    payload: {
      tipo,
      value
    }
  }
}
/*******************************************************************************************************/
// Acción para establecer la organización de los consejeros //
/*******************************************************************************************************/
export const setConsejerosOrganizacion = (organizacion: string) => {
  return {
    type: types.setConsejerosOrganizacion,
    payload: organizacion
  }
}
/*******************************************************************************************************/
// Acción para establecer el departamento de los consejeros //
/*******************************************************************************************************/
export const setConsejerosDepartamento = (departamento: string, provincia: string) => {
  return {
    type: types.setConsejerosDepartamento,
    payload: { departamento, provincia }
  }
}
/*******************************************************************************************************/
// Acción para establecer la provincia de los consejeros //
/*******************************************************************************************************/
export const setConsejerosProvincia = (provincia: string) => {
  return {
    type: types.setConsejerosProvincia,
    payload: { provincia }
  }
}
/*******************************************************************************************************/
// Acción para restablecer los consejeros //
/*******************************************************************************************************/
export const resetConsejeros = () => {
  return {
    type: types.resetConsejeros
  }
}
