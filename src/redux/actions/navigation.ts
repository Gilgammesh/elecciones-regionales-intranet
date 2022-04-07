/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import { Dispatch } from 'redux';
import { IAuthUsuarioReducer } from 'redux/reducers/authReducer';
import { IModuloReducer, INavigationModReducer, INavigationSubModReducer } from 'redux/reducers/navigationReducer';
import { IPermisoModReducer } from 'redux/reducers/permisosReducer';

/*******************************************************************************************************/
// Función para generar la Navegación de los módulos permitidos del usuario //
/*******************************************************************************************************/
export const generateNavigationPerm = async (modulos: Array<IModuloReducer>, permisos: Array<IPermisoModReducer>) => {
	// Obtenemos el array de permisos de los módulos
	const promisesPerm = permisos.map(ele => ele.modulo);
	const arrayPermisos = await Promise.all(promisesPerm);

	// Inicializamos la navegación
	let navigation: Array<INavigationModReducer> = [];

	// Filtramos los módulos
	const promises = modulos
		.filter(async (ele: IModuloReducer) => {
			// Si existe una coincidencia entre los permisos de los módulos con la etiqueta del módulo
			if (ele.children && arrayPermisos.find(ele1 => ele1 === ele.tag)) {
				// Si el tipo es collapse, significa que tiene rutas hijos
				if (ele.type === 'collapse') {
					// Obtenemos los submódulos del módulo
					const submodulos = ele.children;

					// Obtenemos el array de permisos de los submódulos del módulo
					const result: IPermisoModReducer | undefined = permisos.find(ele2 => ele2.modulo === ele.tag);
					// Si existe un resultado
					if (result) {
						const promisesPerm_ = result.permisos.map(ele3 => ele3.submodulo);
						const arrayRutas = await Promise.all(promisesPerm_);

						// Inicializamos las rutas hijas
						let children: Array<INavigationSubModReducer> = [];

						// Filtramos los submódulos
						const promises_ = submodulos.filter(ele4 => {
							// Si existe una coincidencia entre los permisos de los submódulos con la etiqueta del submódulo
							if (arrayRutas.find(ele5 => ele5 === ele4.tag)) {
								// Insertamos el elemento de submódulo en el array de rutas hijas
								children.push({
									orden: ele4.orden,
									id: ele4.tag,
									title: ele4.nombre,
									type: ele4.type,
									url: ele4.url
								});
							}
							// Retornamos cualquier valor para evitar el warning del método
							return null;
						});
						await Promise.all(promises_);
						// Insertamos el elemento de módulo en el array de navigation
						navigation.push({
							orden: ele.orden,
							id: ele.tag,
							title: ele.nombre,
							type: ele.type,
							icon: ele.icon,
							children: children.sort((a, b) => a.orden - b.orden)
						});
					}
				}
				// Si el tipo es item, significa que tiene una ruta única y no tiene hijos
				if (ele.type === 'item') {
					// Insertamos el elemento de módulo en el array de navigation
					navigation.push({
						orden: ele.orden,
						id: ele.tag,
						title: ele.nombre,
						type: ele.type,
						url: ele.url,
						icon: ele.icon
					});
				}
			}
			return null;
		})
		.map(ele => ele);
	await Promise.all(promises);

	// Retornamos la navegación ordenada de forma ascendente
	return navigation.sort((a, b) => a.orden - b.orden);
};

/*******************************************************************************************************/
// Función para generar la Navegación de todos los módulos //
/*******************************************************************************************************/
export const generateNavigationAll = async (modulos: Array<IModuloReducer>) => {
	// Inicializamos la navegación
	let navigation: Array<INavigationModReducer> = [];

	// Filtramos los módulos
	const promises = modulos.map(async (ele: IModuloReducer) => {
		// Si el tipo es collapse, significa que tiene rutas hijos
		if (ele.type === 'collapse' && ele.children) {
			// Inicializamos las rutas hijas
			let children: Array<INavigationSubModReducer> = [];
			// Recorremos los submódulos
			const promises_ = ele.children.map(ele_ => {
				// Insertamos el elemento de submódulo en el array de rutas hijas
				children.push({
					orden: ele_.orden,
					id: ele_.tag,
					title: ele_.nombre,
					type: ele_.type,
					url: ele_.url
				});
				// Retornamos cualquier valor para evitar el warning del método
				return null;
			});
			await Promise.all(promises_);
			// Insertamos el elemento de módulo en el array de navigation
			navigation.push({
				orden: ele.orden,
				id: ele.tag,
				title: ele.nombre,
				type: ele.type,
				icon: ele.icon,
				children: children.sort((a, b) => a.orden - b.orden)
			});
		}
		// Si el tipo es item, significa que tiene una ruta única y no tiene hijos
		if (ele.type === 'item') {
			// Insertamos el elemento de módulo en el array de navigation
			navigation.push({
				orden: ele.orden,
				id: ele.tag,
				title: ele.nombre,
				type: ele.type,
				url: ele.url,
				icon: ele.icon
			});
		}
		return null;
	});
	await Promise.all(promises);

	// Retornamos la navegación ordenada de forma ascendente
	return navigation.sort((a, b) => a.orden - b.orden);
};

/*******************************************************************************************************/
// Interface de la accion de Navegación //
/*******************************************************************************************************/
export interface INavegacionParams {
	usuario: IAuthUsuarioReducer;
	permisos: Array<IPermisoModReducer>;
	modulos: Array<IModuloReducer>;
}

/*******************************************************************************************************/
// Función para el evento Iniciar establecer la Navegación //
/*******************************************************************************************************/
export const startSetNavigation = (
	usuario: IAuthUsuarioReducer,
	permisos: Array<IPermisoModReducer>,
	modulos: Array<IModuloReducer>
) => {
	return async (dispatch: Dispatch) => {
		// Inicializamos la variable de navegación
		let navigation: Array<INavigationModReducer> = [];
		// Si el rol de usuario es de super administrador
		if (usuario.rol.super) {
			// Establecemos la navegación de todos los módulos
			navigation = await generateNavigationAll(modulos);
		} else {
			// Establecemos la navegación de los módulos permitidos del usuario
			navigation = await generateNavigationPerm(modulos, permisos);
		}

		// Establecemos la navegación de los módulos
		dispatch(setNavigation(navigation));
	};
};

/*******************************************************************************************************/
// Función para el evento Iniciar resetear la Navegación //
/*******************************************************************************************************/
export const startResetNavigation = () => {
	return (dispatch: Dispatch) => {
		dispatch(resetNavigation());
	};
};

/*******************************************************************************************************/
// Accion para el evento establecer la Navegación //
/*******************************************************************************************************/
export const setNavigation = (children: Array<INavigationModReducer>) => {
	return {
		type: types.setNavigation,
		payload: children
	};
};

/*******************************************************************************************************/
// Accion para el evento resetear la Navegación  //
/*******************************************************************************************************/
export const resetNavigation = () => {
	return {
		type: types.resetNavigation
	};
};
