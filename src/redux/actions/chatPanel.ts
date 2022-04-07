/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import { Dispatch } from 'redux';

/*******************************************************************************************************/
// Función para el evento Iniciar Alternar el Panel del Chat //
/*******************************************************************************************************/
export const startToggleChatPanel = () => {
	return (dispatch: Dispatch) => {
		dispatch(toggleChatPanel());
	};
};

/*******************************************************************************************************/
// Accion para el evento Alternar el Panel del Chat //
/*******************************************************************************************************/
export const toggleChatPanel = () => {
	return {
		type: types.toggleChatPanel
	};
};

/*******************************************************************************************************/
// Accion para el evento Abrir el Panel del Chat //
/*******************************************************************************************************/
export const openChatPanel = () => {
	return {
		type: types.openChatPanel
	};
};

/*******************************************************************************************************/
// Accion para el evento Cerrar el Panel del Chat //
/*******************************************************************************************************/
export const closeChatPanel = () => {
	return {
		type: types.closeChatPanel
	};
};
