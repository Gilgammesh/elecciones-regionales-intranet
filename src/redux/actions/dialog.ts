/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import { Dispatch } from 'redux';
import { IDialogOptionsReducer } from 'redux/reducers/dialogReducer';

/*******************************************************************************************************/
// Función para el evento Iniciar Cerrar el Dialogo //
/*******************************************************************************************************/
export const startCloseDialog = () => {
	return (dispatch: Dispatch) => {
		dispatch(closeDialog());
	};
};

/*******************************************************************************************************/
// Accion para el evento Abrir el Dialogo //
/*******************************************************************************************************/
export const openDialog = (options: IDialogOptionsReducer) => {
	return {
		type: types.openDialog,
		payload: { options }
	};
};

/*******************************************************************************************************/
// Accion para el evento Cerrar el Dialogo //
/*******************************************************************************************************/
export const closeDialog = () => {
	return {
		type: types.closeDialog
	};
};
