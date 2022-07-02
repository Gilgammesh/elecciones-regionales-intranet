/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el query de búsqueda personalizado de los personeros //
/*******************************************************************************************************/
export const startSetPersonerosSearch = (tipo: string, value: string | string[]) => {
  return (dispatch: Dispatch) => {
    dispatch(setPersonerosSearch(tipo, value))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el tipo de los personeros //
/*******************************************************************************************************/
export const startSetPersonerosTipo = (tipo: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setPersonerosTipo(tipo))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el estado de los personeros //
/*******************************************************************************************************/
export const startSetPersonerosEstado = (estado: string | boolean) => {
  return (dispatch: Dispatch) => {
    dispatch(setPersonerosEstado(estado))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el departamento de los personeros //
/*******************************************************************************************************/
export const startSetPersonerosDepartamento = (departamento: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setPersonerosDepartamento(departamento))
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer los personeros //
/*******************************************************************************************************/
export const startResetPersoneros = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetPersoneros())
  }
}

/*******************************************************************************************************/
// Acción para establecer el query de búsqueda personalizado de los personeros //
/*******************************************************************************************************/
export const setPersonerosSearch = (tipo: string, value: string | string[]) => {
  return {
    type: types.setPersonerosSearch,
    payload: {
      tipo,
      value
    }
  }
}
/*******************************************************************************************************/
// Acción para establecer el tipo de los personeros //
/*******************************************************************************************************/
export const setPersonerosTipo = (tipo: string) => {
  return {
    type: types.setPersonerosTipo,
    payload: tipo
  }
}
/*******************************************************************************************************/
// Acción para establecer el estado de los personeros //
/*******************************************************************************************************/
export const setPersonerosEstado = (estado: string | boolean) => {
  return {
    type: types.setPersonerosEstado,
    payload: estado
  }
}
/*******************************************************************************************************/
// Acción para establecer el departamento de los personeros //
/*******************************************************************************************************/
export const setPersonerosDepartamento = (departamento: string) => {
  return {
    type: types.setPersonerosDepartamento,
    payload: departamento
  }
}
/*******************************************************************************************************/
// Acción para restablecer los personeros //
/*******************************************************************************************************/
export const resetPersoneros = () => {
  return {
    type: types.resetPersoneros
  }
}
