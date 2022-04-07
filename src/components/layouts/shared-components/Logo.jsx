/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import imgLogo from 'assets/images/logos/logo.png';
import imgText from 'assets/images/logos/text.png';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#ffffff',
		'& .logo-icon': {
			width: 35,
			height: 35,
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .logo-text': {
			height: 30
		}
	}
}));

/*******************************************************************************************************/
// Definimos el componente del Layout - Logo //
/*******************************************************************************************************/
const Logo = () => {
	// Instanciamos los estilos
	const classes = useStyles();

	// Renderizamos el componente
	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<img className="logo-icon ml-8 mr-12" src={imgLogo} alt="logo" />
			<div className="flex items-center">
				<img className="logo-text" src={imgText} alt="logo" />
			</div>
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Logo;
