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
// import FooterVertical from './components/FooterVertical';
import LeftSideVertical from './components/LeftSideVertical';
import NavbarWrapperVertical from './components/NavbarWrapperVertical';
import RightSideVertical from './components/RightSideVertical';
import ToolbarVertical from './components/ToolbarVertical';

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
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			boxShadow: theme.shadows[3]
		},
		'&.scroll-body': {
			'& $wrapper': {
				height: 'auto',
				flex: '0 0 auto',
				overflow: 'auto'
			},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'&.scroll-content': {
			'& $wrapper': {},
			'& $contentWrapper': {},
			'& $content': {}
		},
		'& .navigation': {
			'& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	wrapper: {
		display: 'flex',
		position: 'relative',
		width: '100%',
		height: '100%',
		flex: '1 1 auto'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		zIndex: 3,
		overflow: 'hidden',
		flex: '1 1 auto'
	},
	content: {
		position: 'relative',
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 2
	}
}));

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Vertical //
/*******************************************************************************************************/
const Vertical = props => {
	// Recuperamos el state de los settings del usuario
	const settings = useSelector(state => state.settings);
	const { config } = settings.layout;

	// Instanciamos los estilos
	const styles = useStyles(props);

	// Renderizamos el componente
	return (
		<div id="app-layout" className={clsx(styles.root, config.mode, `scroll-${config.scroll}`)}>
			{config.leftSidePanel.display && <LeftSideVertical />}

			<div className="flex flex-1 flex-col overflow-hidden relative">
				{config.toolbar.display && config.toolbar.position === 'above' && <ToolbarVertical />}

				<div className={styles.wrapper}>
					{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperVertical />}

					<div className={styles.contentWrapper}>
						{config.toolbar.display &&
							config.toolbar.position === 'below' &&
							config.toolbar.style === 'fixed' && <ToolbarVertical />}

						<Scrollbars className={styles.content} scrollToTopOnRouteChange>
							{config.toolbar.display &&
								config.toolbar.position === 'below' &&
								config.toolbar.style !== 'fixed' && <ToolbarVertical />}

							<Dialog />

							<Suspense>{props.children}</Suspense>

							{/* {config.footer.display &&
								config.footer.position === 'below' &&
								config.footer.style !== 'fixed' && <FooterVertical />} */}
						</Scrollbars>

						{/* {config.footer.display &&
							config.footer.position === 'below' &&
							config.footer.style === 'fixed' && <FooterVertical />} */}

						{/* <SettingsPanel /> */}
					</div>

					{config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperVertical />}
				</div>

				{/* {config.footer.display && config.footer.position === 'above' && <FooterVertical />} */}
			</div>

			{config.rightSidePanel.display && <RightSideVertical />}

			<Message />
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Vertical);
