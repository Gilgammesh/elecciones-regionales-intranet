/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon, IconButton } from '@material-ui/core';
import { startNavbarToggleMobile } from 'redux/actions/navbar';

/*******************************************************************************************************/
// Definimos el componente del Layout - Botón para alternar el NavBar o Menú para móvil //
/*******************************************************************************************************/
const NavbarMobileToggleButton = props => {
	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Renderizamos el componente
	return (
		<IconButton
			className={props.className}
			onClick={() => dispatch(startNavbarToggleMobile())}
			color="inherit"
			disableRipple
		>
			{props.children}
		</IconButton>
	);
};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
NavbarMobileToggleButton.defaultProps = {
	children: <Icon>menu</Icon>
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default NavbarMobileToggleButton;
