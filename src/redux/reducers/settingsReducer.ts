/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import types from 'configs/types';
import LayoutConfigs from 'components/layouts/LayoutConfigs';
import { animations, customScrollbars, initTheme, layout, IInitTheme, store_settings } from 'configs/settings';
import { IConfigLayouts } from 'components/layouts/exportLayoutConfigs';

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
export interface ISettingsReducer {
	layout: {
		style: string;
		config: {
			mode: string;
			scroll: string;
			navbar: {
				display: boolean;
				folded?: boolean;
				position?: string;
			};
			toolbar: {
				display: boolean;
				style?: string;
				position?: string;
			};
			footer: {
				display: boolean;
				style?: string;
				position?: string;
			};
			leftSidePanel: {
				display: boolean;
			};
			rightSidePanel: {
				display: boolean;
			};
		};
	};
	customScrollbars: boolean;
	animations: boolean;
	theme: IInitTheme;
}

/*******************************************************************************************************/
// Estado inicial del Reducer //
/*******************************************************************************************************/
let initialState: ISettingsReducer | any;
if (localStorage.getItem(store_settings)) {
	initialState = JSON.parse(localStorage.getItem(store_settings) || '');
} else {
	initialState = {
		layout: {
			style: layout.style, // Diseño de la aplicación
			config: LayoutConfigs[layout.style as keyof IConfigLayouts].defaults // Configuración del diseño
		},
		customScrollbars, // Habilita los scroll bars personalizados
		animations, // Habilita las animaciones
		theme: initTheme // Tema de la aplicación
	};
}

/*******************************************************************************************************/
// Definimos el reducer y sus métodos //
/*******************************************************************************************************/
const settingsReducer = (state = initialState, { type, payload }: IAction): ISettingsReducer => {
	switch (type) {
		case types.setSettings:
			return {
				...state,
				...payload
			};
		case types.resetSettings:
			return {
				...initialState
			};
		default:
			return state;
	}
};

/*******************************************************************************************************/
// Exportamos el reducer //
/*******************************************************************************************************/
export default settingsReducer;
