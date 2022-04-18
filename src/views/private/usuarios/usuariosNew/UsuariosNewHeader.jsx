/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, makeStyles, Typography, useTheme } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Animate from 'components/core/Animate';
import clsx from 'clsx';
import { startGetAccionesModulo } from 'redux/actions/auth';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {
		'& .Mui-disabled': {
			backgroundColor: '#e0e0e0'
		}
	}
}));

/*******************************************************************************************************/
// Definimos la Vista del componente Usuario Nuevo Header //
/*******************************************************************************************************/
const UsuariosNewHeader = props => {
	// Obtenemos las propiedades
	const { isFormValid } = props;

	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Obtenemos el Rol de Usuario
	const { rol } = useSelector(state => state.auth.usuario);

	// Obtenemos el tema de la app
	const theme = useTheme();

	// Instanciamos los estilos
	const styles = useStyles();

	// Array de Permisos de Acciones del Módulo
	const [accionesPerm, setAccionesPerm] = useState(null);

	// Efecto para obtener las acciones del módulo
	useEffect(() => {
		dispatch(startGetAccionesModulo('usuarios')).then(res => setAccionesPerm(res));
	}, [dispatch]);

	// Renderizamos el componente
	return (
		<div className={clsx('flex flex-1 w-full items-center justify-between', styles.root)}>
			<div className="flex flex-col items-start max-w-full">
				<Animate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/usuarios"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="mx-4">Usuarios</span>
					</Typography>
				</Animate>

				<div className="flex items-center max-w-full">
					<Animate animation="transition.expandIn" delay={300}>
						<AccountBoxIcon fontSize="large" />
					</Animate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<Animate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">Nuevo Usuario</Typography>
						</Animate>
					</div>
				</div>
			</div>
			{(rol.super || (accionesPerm && accionesPerm.indexOf('crear') !== -1)) && (
				<Animate animation="transition.slideRightIn" delay={300}>
					<Button
						type="submit"
						className="whitespace-no-wrap normal-case"
						variant="contained"
						disabled={!isFormValid}
						startIcon={<SaveIcon />}
					>
						Guardar
					</Button>
				</Animate>
			)}
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
UsuariosNewHeader.propTypes = {
	isFormValid: PropTypes.bool.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default UsuariosNewHeader;
