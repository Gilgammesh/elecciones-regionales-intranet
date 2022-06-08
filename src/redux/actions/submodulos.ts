/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'
import _ from 'lodash'
import { ISubmoduloReducer } from 'redux/reducers/submodulosReducer'

/*******************************************************************************************************/
// Función para iniciar el evento Establecer los Submódulos de un módulo //
/*******************************************************************************************************/
export const startSetSubmodulos = (submodulos: Array<ISubmoduloReducer>) => {
  return (dispatch: Dispatch) => {
    dispatch(setSubmodulos(submodulos))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Añadir un Submódulo //
/*******************************************************************************************************/
export const startAddSubmodulo = (
  submodulos: Array<ISubmoduloReducer>,
  submodulo: ISubmoduloReducer
) => {
  return (dispatch: Dispatch) => {
    const array = [...submodulos, submodulo]
    dispatch(setSubmodulos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Actualizar un Submódulo //
/*******************************************************************************************************/
export const startUpdateSubmodulo = (
  submodulos: Array<ISubmoduloReducer>,
  submodulo: ISubmoduloReducer,
  orden: number
) => {
  return async (dispatch: Dispatch) => {
    const promises = submodulos
      .filter(ele => ele.orden !== orden)
      .map(ele => ele)
    await Promise.all(promises)
    const array = [...submodulos.filter(ele => ele.orden !== orden), submodulo]
    dispatch(resetSubmodulos())
    dispatch(setSubmodulos(_.orderBy(array, ['orden'], ['asc'])))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Remover un Submódulo //
/*******************************************************************************************************/
export const startRemoveSubmodulo = (
  submodulos: Array<ISubmoduloReducer>,
  orden: number
) => {
  return async (dispatch: Dispatch) => {
    const promises = submodulos
      .filter((ele: ISubmoduloReducer) => ele.orden !== orden)
      .map(ele => ele)
    const array = await Promise.all(promises)
    dispatch(setSubmodulos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Resetear los Submódulos de un módulo //
/*******************************************************************************************************/
export const startResetSubmodulos = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetSubmodulos())
  }
}

/*******************************************************************************************************/
// Acción para el evento Establecer los Submódulos de un módulo //
/*******************************************************************************************************/
export const setSubmodulos = (submodulos: Array<ISubmoduloReducer>) => {
  return {
    type: types.setSubmodulos,
    payload: submodulos
  }
}

/*******************************************************************************************************/
// Acción para el evento Resetear los Submódulos de un módulo //
/*******************************************************************************************************/
export const resetSubmodulos = () => {
  return {
    type: types.resetSubmodulos
  }
}
