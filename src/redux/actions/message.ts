/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types'
import { Dispatch } from 'redux'
import { IMessageOptionsReducer } from 'redux/reducers/messageReducer'

/*******************************************************************************************************/
// Función para el evento Iniciar Ocultar el Mensaje //
/*******************************************************************************************************/
export const startHideMessage = () => {
  return (dispatch: Dispatch) => {
    dispatch(hideMessage())
  }
}

/*******************************************************************************************************/
// Accion para el evento Mostrar el Mensaje //
/*******************************************************************************************************/
export const showMessage = (options: IMessageOptionsReducer) => {
  return {
    type: types.showMessage,
    payload: { options }
  }
}

/*******************************************************************************************************/
// Accion para el evento Ocultar el Mensaje //
/*******************************************************************************************************/
export const hideMessage = () => {
  return {
    type: types.hideMessage
  }
}
