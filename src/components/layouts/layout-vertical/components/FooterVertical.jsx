/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DevelopedBy from 'components/layouts/shared-components/DevelopedBy';
import { getFooterTheme } from 'configs/themes';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	toolbar: {
		height: '50px',
		minHeight: '50px',
	}
}));

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Vertical - Footer //
/*******************************************************************************************************/
const FooterVertical = (props) => {
	// Recuperamos el state de los settings del usuario
	const settings = useSelector(state => state.settings);
	const { theme } = settings;

	// Instanciamos los estilos
	const styles = useStyles(props);

	// Obtenemos el tema del Footer de la aplicación
	const footerTheme = getFooterTheme(theme);

	// Renderizamos el componente con el tema
	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="app-footer"
				className="relative bottom-0 z-10"
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper }}
				elevation={2}
			>
				<Toolbar className={clsx(styles.toolbar, 'px-12 py-0 flex items-center')}>
					<div className="flex flex-1"></div>
					<div className="px-12 mr-28">
						<DevelopedBy />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
};

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(FooterVertical);
