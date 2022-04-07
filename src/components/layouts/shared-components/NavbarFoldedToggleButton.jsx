/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconButton } from '@material-ui/core';
import _ from 'lodash';
import { startSetSettings } from 'redux/actions/settings';

/*******************************************************************************************************/
// Definimos el componente del Layout - Botón para alternar el NavBar o Menú Doblado //
/*******************************************************************************************************/
const NavbarFoldedToggleButton = props => {
	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Recuperamos el state de los settings del usuario
	const settings = useSelector(state => state.settings);

	// Renderizamos el componente
	return (
		<IconButton
			className={props.className}
			onClick={() => {
				dispatch(
					startSetSettings(
						_.set(settings, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
					)
				);
			}}
			color="inherit"
		>
			{props.children}
		</IconButton>
	);
};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
NavbarFoldedToggleButton.defaultProps = {
	children: <Icon>menu</Icon>
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default NavbarFoldedToggleButton;
