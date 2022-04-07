/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';

/*******************************************************************************************************/
// Interface de Action //
/*******************************************************************************************************/
interface IAction {
	type: string;
	payload: any;
}

/*******************************************************************************************************/
// Interface del Reducer //
/*******************************************************************************************************/
export interface IMessageOptionsReducer {
	anchorOrigin: {
		vertical: string;
		horizontal: string;
	};
	autoHideDuration: number;
	message: string;
	variant: string;
}
export interface IMessageReducer {
	state: boolean;
	options: IMessageOptionsReducer;
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
const initialState: IMessageReducer = {
	state: false,
	options: {
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 6000,
		message: 'Hola',
		variant: ''
	}
};

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const messageReducer = (state = initialState, { type, payload }: IAction) => {
	switch (type) {
		case types.showMessage:
			return {
				state: true,
				options: {
					...initialState.options,
					...payload
				}
			};
		case types.hideMessage:
			return {
				state: false
			};
		default:
			return state;
	}
};

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default messageReducer;
