/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import { Socket } from 'socket.io-client';

/*******************************************************************************************************/
// Interface de Action //
/*******************************************************************************************************/
interface IAction {
	type: string;
	payload: any;
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: Socket | null = null; // Socket de conexión con la api

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const socketioReducer = (state = initialState, { type, payload }: IAction) => {
	switch (type) {
		case types.setSocketIO:
			return payload;
		default:
			return state;
	}
};

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default socketioReducer;
