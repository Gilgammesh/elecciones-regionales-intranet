/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create, JssOptions, Plugin, InsertionPoint } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import store from './redux/store';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/min/locales';
import Auth from 'components/core/Auth';
import Theme from 'components/core/Theme';
import AppRouter from 'routers/AppRouter';
import { store_lastpath, store_changepath, language } from 'configs/settings';

/*******************************************************************************************************/
// Creamos y definimos las propiedades de jss (Style Sheets con Javascript) //
/*******************************************************************************************************/
const preset = jssPreset().plugins;
const jssOptions: JssOptions = {
	...jssPreset(),
	plugins: [...preset, jssExtend(), rtl()] as ReadonlyArray<Plugin>,
	insertionPoint: document.getElementById('jss-insertion-point') as InsertionPoint
};
const jss = create(jssOptions);

/*******************************************************************************************************/
// Instanciamos la función que genera nombres de clases para jss //
/*******************************************************************************************************/
const generateClassName = createGenerateClassName();

/*******************************************************************************************************/
// Definimos el idioma local por defecto para moment en la aplicación //
/*******************************************************************************************************/
moment.locale(language);

/*******************************************************************************************************/
// Definimos el componente //
/*******************************************************************************************************/
const App = () => {
	useEffect(() => {
		window.addEventListener('beforeunload', ev => {
			ev.preventDefault();
			localStorage.setItem(store_lastpath, localStorage.getItem(store_changepath) || '');
		});
	}, []);

	return (
		<StylesProvider jss={jss} generateClassName={generateClassName}>
			<Provider store={store}>
				<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={language}>
					<BrowserRouter>
						<Auth>
							<Theme>
								<AppRouter />
							</Theme>
						</Auth>
					</BrowserRouter>
				</MuiPickersUtilsProvider>
			</Provider>
		</StylesProvider>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default App;
