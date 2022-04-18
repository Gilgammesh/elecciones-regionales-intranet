/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import { Dispatch } from 'redux';

/*******************************************************************************************************/
// Función para iniciar establecer el rol de la lista de usuarios //
/*******************************************************************************************************/
export const startSetUsuariosRol = (rol: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setUsuariosRol(rol));
	};
};

/*******************************************************************************************************/
// Función para iniciar establecer el departamento de la lista de usuarios //
/*******************************************************************************************************/
export const startSetUsuariosDepartamento = (departamento: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setUsuariosDepartamento(departamento));
	};
};

/*******************************************************************************************************/
// Acción para establecer el rol de la lista de usuarios //
/*******************************************************************************************************/
export const setUsuariosRol = (rol: string) => {
	return {
		type: types.setUsuariosRol,
		payload: rol
	};
};

/*******************************************************************************************************/
// Acción para establecer el departamento de la lista de usuarios //
/*******************************************************************************************************/
export const setUsuariosDepartamento = (departamento: string) => {
	return {
		type: types.setUsuariosDepartamento,
		payload: departamento
	};
};
