/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'
import {
  IPermisoModReducer,
  IPermisoSubModReducer
} from 'redux/reducers/permisosReducer'

/*******************************************************************************************************/
// Función para iniciar el evento Añadir Permiso de un Módulo //
/*******************************************************************************************************/
export const startAddModulo = (
  permisos: Array<IPermisoModReducer>,
  row: IPermisoModReducer
) => {
  return (dispatch: Dispatch) => {
    const array = [...permisos, row]
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Remover Permiso de un Módulo //
/*******************************************************************************************************/
export const startRemoveModulo = (
  permisos: Array<IPermisoModReducer>,
  row: IPermisoModReducer
) => {
  return async (dispatch: Dispatch) => {
    const promises = permisos
      .filter(ele => ele.modulo !== row.modulo)
      .map(ele => ele)
    const array = await Promise.all(promises)
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Añadir Permiso a un Submódulo de un Módulo //
/*******************************************************************************************************/
export const startAddSubModulo = (
  permisos: Array<IPermisoModReducer>,
  tag: string,
  row: IPermisoSubModReducer
) => {
  return async (dispatch: Dispatch) => {
    const promises = permisos.map(ele => {
      if (ele.modulo === tag) {
        ele.permisos = [...ele.permisos, row]
        return ele
      }
      return ele
    })
    const array = await Promise.all(promises)
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Remover Permiso a un Submódulo de un Módulo //
/*******************************************************************************************************/
export const startRemoveSubModulo = (
  permisos: Array<IPermisoModReducer>,
  tag: string,
  row: IPermisoSubModReducer
) => {
  return async (dispatch: Dispatch) => {
    const promises = permisos.map(ele => {
      if (ele.modulo === tag) {
        ele.permisos = ele.permisos.filter(
          ele => ele.submodulo !== row.submodulo
        )
        return ele
      }
      return ele
    })
    const array = await Promise.all(promises)
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Añadir Permiso a una Acción de un Módulo //
/*******************************************************************************************************/
export const startAddAccionModulo = (
  permisos: Array<IPermisoModReducer>,
  tag: string,
  nombre: string
) => {
  return async (dispatch: Dispatch) => {
    const promises = permisos.map(ele => {
      if (ele.modulo === tag) {
        ele.acciones = [...ele.acciones, nombre]
        return ele
      }
      return ele
    })
    const array = await Promise.all(promises)
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Remover Permiso a una Acción de un Módulo //
/*******************************************************************************************************/
export const startRemoveAccionModulo = (
  permisos: Array<IPermisoModReducer>,
  tag: string,
  nombre: string
) => {
  return async (dispatch: Dispatch) => {
    const promises = permisos.map(ele => {
      if (ele.modulo === tag) {
        ele.acciones = ele.acciones.filter(ele => ele !== nombre)
        return ele
      }
      return ele
    })
    const array = await Promise.all(promises)
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Añadir Permiso a una Acción de un SubMódulo //
/*******************************************************************************************************/
export const startAddAccionSubModulo = (
  permisos: Array<IPermisoModReducer>,
  tagMod: string,
  tagSubMod: string,
  nombre: string
) => {
  return async (dispatch: Dispatch) => {
    const promises = permisos.map(async ele => {
      if (ele.modulo === tagMod) {
        const promises_ = ele.permisos.map(ele_ => {
          if (ele_.submodulo === tagSubMod) {
            ele_.acciones = [...ele_.acciones, nombre]
            return ele_
          }
          return ele_
        })
        const array_ = await Promise.all(promises_)
        ele.permisos = array_
        return ele
      }
      return ele
    })
    const array = await Promise.all(promises)
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Remover Permiso a una Acción de un SubMódulo //
/*******************************************************************************************************/
export const startRemoveAccionSubModulo = (
  permisos: Array<IPermisoModReducer>,
  tagMod: string,
  tagSubMod: string,
  nombre: string
) => {
  return async (dispatch: Dispatch) => {
    const promises = permisos.map(async ele => {
      if (ele.modulo === tagMod) {
        const promises_ = ele.permisos.map(ele_ => {
          if (ele_.submodulo === tagSubMod) {
            ele_.acciones = ele_.acciones.filter(ele => ele !== nombre)
            return ele_
          }
          return ele_
        })
        const array_ = await Promise.all(promises_)
        ele.permisos = array_
        return ele
      }
      return ele
    })
    const array = await Promise.all(promises)
    dispatch(setPermisos(array))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Establecer los Permisos de un ROL //
/*******************************************************************************************************/
export const startSetPermisos = (permisos: Array<IPermisoModReducer>) => {
  return (dispatch: Dispatch) => {
    dispatch(setPermisos(permisos))
  }
}

/*******************************************************************************************************/
// Función para iniciar el evento Resetear los Permisos de un ROL //
/*******************************************************************************************************/
export const startResetPermisos = () => {
  return (dispatch: Dispatch) => {
    dispatch(resetPermisos())
  }
}

/*******************************************************************************************************/
// Acción para el evento Establecer los Permisos de un ROL //
/*******************************************************************************************************/
export const setPermisos = (permisos: Array<IPermisoModReducer>) => {
  return {
    type: types.setPermisos,
    payload: permisos
  }
}

/*******************************************************************************************************/
// Acción para el evento Resetear los Permisos de un ROL //
/*******************************************************************************************************/
export const resetPermisos = () => {
  return {
    type: types.resetPermisos
  }
}
