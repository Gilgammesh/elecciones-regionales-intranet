/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
// import Search from 'components/core/Search';
// import ChatPanelToggleButton from 'components/layouts/shared-components/chatPanel/ChatPanelToggleButton';
import NavbarMobileToggleButton from 'components/layouts/shared-components/NavbarMobileToggleButton';
// import QuickPanelToggleButton from 'components/layouts/shared-components/quickPanel/QuickPanelToggleButton';
import Title from 'components/core/Title';
import UserMenu from 'components/layouts/shared-components/UserMenu';
import { getToolbarTheme } from 'configs/themes';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {}
}));

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Vertical - ToolBar //
/*******************************************************************************************************/
const ToolbarVertical = props => {
	// Recuperamos el state de los settings del usuario
	const settings = useSelector(state => state.settings);
	const { theme, layout } = settings;
	const { config } = layout;

	// Instanciamos los estilos
	const styles = useStyles(props);

	// Obtenemos el tema del Navbar de la aplicación
	const toolbarTheme = getToolbarTheme(theme);

	// Renderizamos el componente con el tema
	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="app-toolbar"
				className={clsx(styles.root, 'flex relative z-10')}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
				elevation={2}
			>
				<Toolbar className="p-0">
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-48 h-48 p-0" />
						</Hidden>
					)}

					<div className="flex flex-1">
						<Hidden mdDown>
							<Title className="px-16" />
						</Hidden>
					</div>

					<div className="flex items-center px-8">
						{/* <Search /> */}

						{/* <ChatPanelToggleButton /> */}

						{/* <QuickPanelToggleButton /> */}

						<UserMenu />
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
};

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(ToolbarVertical);
