/*******************************************************************************************************/
// Interface de los Tipos //
/*******************************************************************************************************/
export interface ITypes {
	setAuth: string;
	login: string;
	logout: string;
	setNavigation: string;
	resetNavigation: string;
	setSettings: string;
	resetSettings: string;
	openDialog: string;
	closeDialog: string;
	showMessage: string;
	hideMessage: string;
	toggleChatPanel: string;
	openChatPanel: string;
	closeChatPanel: string;
	navbarToggleFolded: string;
	navbarOpenFolded: string;
	navbarCloseFolded: string;
	navbarToggleMobile: string;
	navbarOpenMobile: string;
	navbarCloseMobile: string;
	toggleQuickPanel: string;
	openQuickPanel: string;
	closeQuickPanel: string;
	setSubmodulos: string;
	resetSubmodulos: string;
	setPermisos: string;
	resetPermisos: string;
	setEFactProcess: string;
	setEFactFile: string;
	setEFactResumen: string;
	setEFactResumenStatus: string;
	setEFactResumenFinish: string;
	setSocketIO: string;
}

/*******************************************************************************************************/
// Definimos los tipos de acciones para los reducers de la aplicación //
/*******************************************************************************************************/
const types: ITypes = {
	setAuth: '[auth] set',
	login: '[auth] login',
	logout: '[auth] logout',
	setNavigation: '[navigation] set',
	resetNavigation: '[navigation] reset',
	setSettings: '[settings] set',
	resetSettings: '[settings] reset',
	openDialog: '[dialog] open',
	closeDialog: '[dialog] close',
	showMessage: '[message] show',
	hideMessage: '[message] hide',
	toggleChatPanel: '[chatPanel] toggle',
	openChatPanel: '[chatPanel] open',
	closeChatPanel: '[chatPanel] close',
	navbarToggleFolded: '[navbar] toggleFolded',
	navbarOpenFolded: '[navbar] openFolded',
	navbarCloseFolded: '[navbar] closeFolded',
	navbarToggleMobile: '[navbar] toggleMobile',
	navbarOpenMobile: '[navbar] openMobile',
	navbarCloseMobile: '[navbar] closeMobile',
	toggleQuickPanel: '[quickPanel] toggle',
	openQuickPanel: '[quickPanel] open',
	closeQuickPanel: '[quickPanel] close',
	setSubmodulos: '[submodulos] set',
	resetSubmodulos: '[submodulos] reset',
	setPermisos: '[permisos] set',
	resetPermisos: '[permisos] reset',
	setEFactProcess: '[efacturacion] process',
	setEFactFile: '[efacturacion] file',
	setEFactResumen: '[efacturacion] resumen',
	setEFactResumenStatus: '[efacturacion] resumen status',
	setEFactResumenFinish: '[efacturacion] resumen finish',
	setSocketIO: '[socketio] socket'
};

/*******************************************************************************************************/
// Exportamos los tipos //
/*******************************************************************************************************/
export default types;