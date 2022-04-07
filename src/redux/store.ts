/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer, { IAuthReducer } from './reducers/authReducer';
import chatPanelReducer, { IChatPanelReducer } from './reducers/chatPanelReducer';
import dialogReducer, { IDialogReducer } from './reducers/dialogReducer';
import messageReducer, { IMessageReducer } from './reducers/messageReducer';
import navbarReducer, { INavbarReducer } from './reducers/navbarReducer';
import navigationReducer, { INavigationReducer } from './reducers/navigationReducer';
import quickPanelReducer, { IQuickPanelReducer } from './reducers/quickPanelReducer';
import settingsReducer, { ISettingsReducer } from './reducers/settingsReducer';
import submodulosReducer, { ISubmoduloReducer } from './reducers/submodulosReducer';
import permisosReducer, { IPermisoModReducer } from './reducers/permisosReducer';
import socketioReducer from './reducers/socketioReducer';
import { Socket } from 'socket.io-client';

/*******************************************************************************************************/
// Interface de los reducers //
/*******************************************************************************************************/
export interface IRootReducers {
	auth: IAuthReducer;
	navigation: INavigationReducer;
	settings: ISettingsReducer;
	dialog: IDialogReducer;
	message: IMessageReducer;
	chatPanel: IChatPanelReducer;
	navbar: INavbarReducer;
	quickPanel: IQuickPanelReducer;
	submodulos: Array<ISubmoduloReducer>;
	permisos: Array<IPermisoModReducer>;
	socketio: Socket | null;
}

/*******************************************************************************************************/
// Combinamos los reducers de la App //
/*******************************************************************************************************/
const reducers = combineReducers({
	auth: authReducer,
	navigation: navigationReducer,
	settings: settingsReducer,
	dialog: dialogReducer,
	message: messageReducer,
	chatPanel: chatPanelReducer,
	navbar: navbarReducer,
	quickPanel: quickPanelReducer,
	submodulos: submodulosReducer,
	permisos: permisosReducer,
	socketio: socketioReducer
});

/*******************************************************************************************************/
// Cargamos la extensión de Redux para el navegador //
/*******************************************************************************************************/
const composeEnhancers =
	(typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/*******************************************************************************************************/
// Aplicamos el Middleware Redux-Thunk, para el manejo de las peticiones asíncronas (Api's) //
/*******************************************************************************************************/
const enhancer = composeEnhancers(applyMiddleware(thunk));

/*******************************************************************************************************/
// Creamos el Store de nuestra App //
/*******************************************************************************************************/
const store = createStore(reducers, enhancer);

/*******************************************************************************************************/
// Exportamos el store //
/*******************************************************************************************************/
export default store;
