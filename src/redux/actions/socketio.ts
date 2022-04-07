/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import { Dispatch } from 'redux';
import { Socket } from 'socket.io-client';

/*******************************************************************************************************/
// Función para el evento IniciarEstablecer Socket de conexión con la Api o Endpoint //
/*******************************************************************************************************/
export const startSetSocketIO = (socket: Socket | null) => {
	return (dispatch: Dispatch) => {
		dispatch(setSocketIO(socket));
	};
};

/*******************************************************************************************************/
// Accion para el evento Establecer Socket de conexión con la Api //
/*******************************************************************************************************/
export const setSocketIO = (socket: Socket | null) => {
	return {
		type: types.setSocketIO,
		payload: socket
	};
};
