/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'

/*******************************************************************************************************/
// Función para iniciar establecer el query de búsqueda personalizado de los gobernadores //
/*******************************************************************************************************/
export const startSetGobernadoresSearch = (tipo: string, value: string | string[]) => {
  return (dispatch: Dispatch) => {
    dispatch(setGobernadoresSearch(tipo, value))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer la organización de los gobernadores //
/*******************************************************************************************************/
export const startSetGobernadoresOrganizacion = (organizacion: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setGobernadoresOrganizacion(organizacion))
  }
}
/*******************************************************************************************************/
// Función para iniciar establecer el departamento de los gobernadores //
/*******************************************************************************************************/
export const startSetGobernadoresDepartamento = (departamento: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setGobernadoresDepartamento(departamento))
  }
}
/*******************************************************************************************************/
// Función para iniciar restablecer los gobernadores //
/*******************************************************************************************************/
export const startResetGobernadores = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetGobernadores())
  }
}

/*******************************************************************************************************/
// Acción para establecer el query de búsqueda personalizado de los gobernadores //
/*******************************************************************************************************/
export const setGobernadoresSearch = (tipo: string, value: string | string[]) => {
  return {
    type: types.setGobernadoresSearch,
    payload: {
      tipo,
      value
    }
  }
}
/*******************************************************************************************************/
// Acción para establecer la organización de los gobernadores //
/*******************************************************************************************************/
export const setGobernadoresOrganizacion = (organizacion: string) => {
  return {
    type: types.setGobernadoresOrganizacion,
    payload: organizacion
  }
}
/*******************************************************************************************************/
// Acción para establecer el departamento de los gobernadores //
/*******************************************************************************************************/
export const setGobernadoresDepartamento = (departamento: string) => {
  return {
    type: types.setGobernadoresDepartamento,
    payload: departamento
  }
}
/*******************************************************************************************************/
// Acción para restablecer los gobernadores //
/*******************************************************************************************************/
export const resetGobernadores = () => {
  return {
    type: types.resetGobernadores
  }
}
