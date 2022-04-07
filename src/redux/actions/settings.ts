/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import { Dispatch } from 'redux';
import { ISettingsReducer } from 'redux/reducers/settingsReducer';

/*******************************************************************************************************/
// Función para el evento Iniciar establecer los Ajustes //
/*******************************************************************************************************/
export const startSetSettings = (ajustes: ISettingsReducer) => {
	return (dispatch: Dispatch) => {
		dispatch(setSettings(ajustes));
	};
};

/*******************************************************************************************************/
// Función para el evento Iniciar resetear los Ajustes //
/*******************************************************************************************************/
export const startResetSettings = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetSettings());
	};
};

/*******************************************************************************************************/
// Accion para el evento establecer los Ajustes //
/*******************************************************************************************************/
export const setSettings = (ajustes: ISettingsReducer) => {
	return {
		type: types.setSettings,
		payload: ajustes
	};
};

/*******************************************************************************************************/
// Accion para el evento resetear los Ajustes  //
/*******************************************************************************************************/
export const resetSettings = () => {
	return {
		type: types.resetSettings
	};
};
