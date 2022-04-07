/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { store_changepath } from 'configs/settings';

/*******************************************************************************************************/
// Definimos el componente de Rutas Privadas //
/*******************************************************************************************************/
const PrivateRoute = ({ component: Component, ...rest }) => {
	// Llamamos al state global de auth
	const auth = useSelector(state => state.auth);
	// Obtenemos si el usuario esta logueado
	const { isLogged } = auth.usuario;

	// Guardamos en el localstorage la última ruta privada visitada
	localStorage.setItem(store_changepath, rest.location.pathname);

	// Renderizamos el componente
	return (
		<Route
			{...rest}
			component={props =>
				// Si está logueado va a las rutas privadas en caso contrario redireccionamos al login
				isLogged ? <Component {...props} /> : <Redirect to="/auth/login" />
			}
		/>
	);
};

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PrivateRoute;
