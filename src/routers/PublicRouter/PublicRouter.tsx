/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginView from 'views/public/LoginView';

/*******************************************************************************************************/
// Definimos las Rutas Públicas de la Aplicación //
/*******************************************************************************************************/
const PublicRouter = () => {
	return (
		<>
			<Switch>
				<Route exact path="/auth/login" component={LoginView} />
				<Redirect to="/auth/login" />
			</Switch>
		</>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PublicRouter;
