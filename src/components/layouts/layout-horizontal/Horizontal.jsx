/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Dialog from 'components/core/Dialog';
import Message from 'components/core/Message';
import Scrollbars from 'components/core/Scrollbars';
import Suspense from 'components/core/Suspense';
// import SettingsPanel from '../shared-components/SettingsPanel';
// import FooterHorizontal from './components/FooterHorizontal';
import LeftSideHorizontal from './components/LeftSideHorizontal';
import NavbarWrapperHorizontal from './components/NavbarWrapperHorizontal';
import RightSideHorizontal from './components/RightSideHorizontal';
import ToolbarHorizontal from './components/ToolbarHorizontal';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: theme.shadows[3]
		},
		'&.container': {
			'& .container': {
				maxWidth: 1120,
				width: '100%',
				margin: '0 auto'
			},
			'& .navigation': {}
		}
	},
	content: {
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 4
	},
	toolbarWrapper: {
		display: 'flex',
		position: 'relative',
		zIndex: 5
	},
	toolbar: {
		display: 'flex',
		flex: '1 0 auto'
	},
	footerWrapper: {
		position: 'relative',
		zIndex: 5
	},
	footer: {
		display: 'flex',
		flex: '1 0 auto'
	}
}));

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Horizontal //
/*******************************************************************************************************/
const Horizontal = props => {
	// Recuperamos el state de los settings del usuario
	const settings = useSelector(state => state.settings);
	const { config } = settings.layout;

	// Instanciamos los estilos
	const styles = useStyles(props);

	// Renderizamos el componente
	return (
		<div id="app-layout" className={clsx(styles.root, config.mode)}>
			{config.leftSidePanel.display && <LeftSideHorizontal />}

			<div className="flex flex-1 flex-col overflow-hidden relative">
				{config.toolbar.display && config.toolbar.position === 'above' && <ToolbarHorizontal />}

				{config.navbar.display && <NavbarWrapperHorizontal />}

				{config.toolbar.display && config.toolbar.position === 'below' && <ToolbarHorizontal />}

				<Scrollbars className={styles.content} scrollToTopOnRouteChange>
					<Dialog />

					<div className="flex flex-auto flex-col relative h-full">
						<Suspense>{props.children}</Suspense>

						{/* {config.footer.display && config.footer.style === 'static' && <FooterHorizontal />} */}
					</div>
				</Scrollbars>

				{/* {config.footer.display && config.footer.style === 'fixed' && <FooterHorizontal />} */}

				{/* <SettingsPanel /> */}
			</div>

			{config.rightSidePanel.display && <RightSideHorizontal />}

			<Message />
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Horizontal);
