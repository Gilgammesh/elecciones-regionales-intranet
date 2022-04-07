/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, useState } from 'react';
import { Icon, IconButton, Dialog, Slide, Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Scrollbars from 'components/core/Scrollbars';
import clsx from 'clsx';
import Settings from 'components/core/Settings';

/*******************************************************************************************************/
// Creamos una transición //
/*******************************************************************************************************/
const Transition = forwardRef((props, ref) => {
	return <Slide direction="left" ref={ref} {...props} />;
});

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	settingsButton: {
		/* '& $buttonIcon': {
			animation: '$rotating 3s linear infinite'
		} */
	},
	'@keyframes rotating': {
		from: {
			transform: 'rotate(0deg)'
		},
		to: {
			transform: 'rotate(360deg)'
		}
	},
	buttonIcon: {
		fontSize: 24
	},
	dialogPaper: {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));

/*******************************************************************************************************/
// Definimos el componente del Layout - Botón para alternar el Panel Rápido //
/*******************************************************************************************************/
const QuickPanelToggleButton = props => {
	// Instanciamos los estilos
	const styles = useStyles();

	// Estado inicial del apertura de la ventana de Dialogo
	const [open, setOpen] = useState(false);

	// Evento que ocurre al clickear el botón abre o cierra
	const handleOpen = () => {
		setOpen(true);
	};

	// Evento que ocurre al cerrar la ventan de diálogo
	const handleClose = () => {
		setOpen(false);
	};

	// Renderizamos el componente
	return (
		<>
			<Tooltip title="Apariencia" placement="bottom-start" enterDelay={100}>
				<IconButton className={clsx('w-40 h-40', styles.settingsButton)} onClick={handleOpen}>
					<Icon className={styles.buttonIcon}>palette</Icon>
				</IconButton>
			</Tooltip>
			<Dialog
				TransitionComponent={Transition}
				aria-labelledby="settings-panel"
				aria-describedby="settings"
				open={open}
				keepMounted
				onClose={handleClose}
				BackdropProps={{ invisible: true }}
				classes={{
					paper: styles.dialogPaper
				}}
			>
				<Scrollbars className="p-24 sm:p-32">
					<IconButton className="fixed top-0 ltr:right-0 rtl:left-0 z-10" onClick={handleClose}>
						<Icon>close</Icon>
					</IconButton>

					<Typography className="mb-32" variant="h6">
						Apariencia del Tema
					</Typography>

					<Settings />
				</Scrollbars>
			</Dialog>
		</>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default QuickPanelToggleButton;
