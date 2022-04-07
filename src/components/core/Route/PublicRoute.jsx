/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/*******************************************************************************************************/
// Definimos el componente de Rutas Públicas //
/*******************************************************************************************************/
const PublicRoute = ({ component: Component, ...rest }) => {
	// Llamamos al state global de auth
	const auth = useSelector(state => state.auth);
	// Obtenemos si el usuario esta logueado
	const { isLogged } = auth.usuario;

	// Renderizamos el componente
	return (
		<Route
			{...rest}
			component={props =>
				// Si está logueado redireccionamos a las rutas privadas en caso contrario va al login
				isLogged ? <Redirect to="/usuario/perfil" /> : <Component {...props} />
			}
		/>
	);
};

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
PublicRoute.propTypes = {
	component: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PublicRoute;
