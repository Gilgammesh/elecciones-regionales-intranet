/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Scrollbars from '../Scrollbars';
import PageCardedHeader from './PageCardedHeader';
import PageCardedSidebar from './PageCardedSidebar';

/*******************************************************************************************************/
// Definimos las propiedades del componente //
/*******************************************************************************************************/
const drawerWidth = 240;
const headerHeight = 200;
const toolbarHeight = 64;
const headerContentHeight = headerHeight - toolbarHeight;

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 0 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	innerScroll: {
		flex: '1 1 auto',
		height: '100%'
	},
	topBg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		backgroundSize: 'cover',
		pointerEvents: 'none'
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '0 3.2rem',
		flex: '1 1 100%',
		zIndex: 2,
		maxWidth: '100%',
		minWidth: 0,
		minHeight: 0,
		[theme.breakpoints.down('xs')]: {
			padding: '0 1.6rem'
		}
	},
	header: {
		height: headerContentHeight,
		minHeight: headerContentHeight,
		maxHeight: headerContentHeight,
		display: 'flex',
		color: theme.palette.primary.contrastText
	},
	headerSidebarToggleButton: {
		color: theme.palette.primary.contrastText
	},
	contentCard: {
		display: 'flex',
		flex: '1 1 100%',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[1],
		minHeight: 0,
		borderRadius: '8px 8px 0 0'
	},
	toolbar: {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center',
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	content: {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto',
		'-webkit-overflow-scrolling': 'touch'
	},
	sidebarWrapper: {
		position: 'absolute',
		backgroundColor: 'transparent',
		zIndex: 5,
		overflow: 'hidden',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				zIndex: 1,
				position: 'relative'
			}
		}
	},
	sidebar: {
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				backgroundColor: 'transparent',
				position: 'relative',
				border: 'none',
				overflow: 'hidden'
			}
		},
		width: drawerWidth,
		height: '100%'
	},
	leftSidebar: {},
	rightSidebar: {},
	sidebarHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.dark,
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				backgroundColor: 'transparent'
			}
		}
	},
	sidebarContent: {
		display: 'flex',
		flex: '1 1 auto',
		flexDirection: 'column',
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
		[theme.breakpoints.up('lg')]: {
			overflow: 'auto',
			'-webkit-overflow-scrolling': 'touch'
		}
	},
	backdrop: {
		position: 'absolute'
	}
}));

/*******************************************************************************************************/
// Definimos el componente de Página Tarjeta //
/*******************************************************************************************************/
const PageCarded = forwardRef((props, ref) => {
	// Definimos las referencias de los objetos
	const leftSidebarRef = useRef(null);
	const rightSidebarRef = useRef(null);
	const rootRef = useRef(null);

	// Instanciamos los estilos
	const styles = useStyles(props);

	// Definimos las variables de los menus derecha o izquierda
	const isRightSidebar = props.rightSidebarHeader || props.rightSidebarContent;
	const isLeftSidebar = props.leftSidebarHeader || props.leftSidebarContent;

	// Efecto imperativo del valor de instancia de las referencias
	useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: () => {
			leftSidebarRef.current.toggleSidebar();
		},
		toggleRightSidebar: () => {
			rightSidebarRef.current.toggleSidebar();
		}
	}));

	// Renderizamos el componente
	return (
		<div className={clsx(styles.root, props.innerScroll && styles.innerScroll)} ref={rootRef}>
			<div className={styles.topBg} />

			<div className="flex container w-full">
				{isLeftSidebar && (
					<PageCardedSidebar
						position="left"
						header={props.leftSidebarHeader}
						content={props.leftSidebarContent}
						variant={props.leftSidebarVariant || 'permanent'}
						innerScroll={props.innerScroll}
						classes={styles}
						ref={leftSidebarRef}
						rootRef={rootRef}
					/>
				)}

				<div
					className={clsx(
						styles.contentWrapper,
						isLeftSidebar &&
							(props.leftSidebarVariant === undefined || props.leftSidebarVariant === 'permanent') &&
							'lg:ltr:pl-0 lg:rtl:pr-0',
						isRightSidebar &&
							(props.rightSidebarVariant === undefined || props.rightSidebarVariant === 'permanent') &&
							'lg:pr-0'
					)}
				>
					<PageCardedHeader header={props.header} classes={styles} />

					<div className={clsx(styles.contentCard, props.innerScroll && 'inner-scroll')}>
						{props.contentToolbar && <div className={styles.toolbar}>{props.contentToolbar}</div>}

						{props.content && (
							<Scrollbars
								className={styles.content}
								enable={props.innerScroll}
								scrollToTopOnRouteChange={props.innerScroll}
							>
								{props.content}
							</Scrollbars>
						)}
					</div>
				</div>

				{isRightSidebar && (
					<PageCardedSidebar
						position="right"
						header={props.rightSidebarHeader}
						content={props.rightSidebarContent}
						variant={props.rightSidebarVariant || 'permanent'}
						innerScroll={props.innerScroll}
						classes={styles}
						ref={rightSidebarRef}
						rootRef={rootRef}
					/>
				)}
			</div>
		</div>
	);
});

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
PageCarded.propTypes = {
	rightSidebarHeader: PropTypes.node,
	rightSidebarContent: PropTypes.node,
	rightSidebarVariant: PropTypes.node,
	leftSidebarHeader: PropTypes.node,
	leftSidebarContent: PropTypes.node,
	leftSidebarVariant: PropTypes.node,
	header: PropTypes.node,
	content: PropTypes.node,
	contentToolbar: PropTypes.node,
	innerScroll: PropTypes.bool
};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
PageCarded.defaultProps = {};

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(PageCarded);
