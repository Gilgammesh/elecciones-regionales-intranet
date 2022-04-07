/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Manager, Popper, Reference } from 'react-popper';
import { Grow, Icon, IconButton, ListItem, ListItemText, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useDebounce from 'hooks/useDebounce';
import clsx from 'clsx';
import NavLinkAdapter from 'components/core/NavLinkAdapter';
import NavBadge from '../NavBadge';
import NavItem from '../NavItem';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {
		'& .list-item-text': {
			padding: '0 0 0 16px'
		}
	},
	button: {
		color: theme.palette.text.primary,
		minHeight: 48,
		'&.active, &.active:hover, &.active:focus': {
			backgroundColor: `${theme.palette.secondary.main}!important`,
			color: `${theme.palette.secondary.contrastText}!important`,
			'& .list-item-text-primary': {
				color: 'inherit'
			},
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'&.open': {
			backgroundColor: 'rgba(0,0,0,.08)'
		}
	},
	popper: {
		zIndex: 999
	},
	popperClose: {
		pointerEvents: 'none'
	}
}));

/*******************************************************************************************************/
// Función que consultar si la url está en el hijo //
/*******************************************************************************************************/
const isUrlInChildren = (parent, url) => {
	if (!parent.children) {
		return false;
	}
	for (let i = 0; i < parent.children.length; i += 1) {
		if (parent.children[i].children) {
			if (isUrlInChildren(parent.children[i], url)) {
				return true;
			}
		}

		if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
			return true;
		}
	}
	return false;
};

/*******************************************************************************************************/
// Definimos el componente Colapso de Navegación Horizontal //
/*******************************************************************************************************/
const NavHorizontalCollapse = props => {
	// Estado inicial de abrir o colapsar en nav horizontal
	const [opened, setOpened] = useState(false);

	// Obtenemos las propiedades
	const { item, nestedLevel, dense } = props;

	// Instanciamos los estilos
	const styles = useStyles(props);

	// Obtenemos el tema de Material UI
	const theme = useTheme();

	// Función para alternar al pasar el mouse y abrir el nav
	const handleToggle = useDebounce(open => {
		setOpened(open);
	}, 150);

	// Renderizamos el componente
	return (
		<ul className={clsx(styles.root, 'relative px-0')}>
			<Manager>
				<Reference>
					{({ ref }) => (
						<div ref={ref}>
							<ListItem
								button
								className={clsx(
									'list-item',
									styles.button,
									opened && 'open',
									isUrlInChildren(item, props.location.pathname) && 'active'
								)}
								onMouseEnter={() => handleToggle(true)}
								onMouseLeave={() => handleToggle(false)}
								aria-owns={opened ? 'menu-list-grow' : null}
								aria-haspopup="true"
								component={item.url ? NavLinkAdapter : 'li'}
								to={item.url}
								role="button"
							>
								{item.icon && (
									<Icon color="action" className="list-item-icon text-16 flex-shrink-0">
										{item.icon}
									</Icon>
								)}

								<ListItemText
									className="list-item-text"
									primary={item.title}
									classes={{ primary: 'text-14' }}
								/>

								{item.badge && <NavBadge className="mx-4" badge={item.badge} />}
								<IconButton disableRipple className="w-16 h-16 ltr:ml-4 rtl:mr-4 p-0" color="inherit">
									<Icon className="text-16 arrow-icon">
										{theme.direction === 'ltr' ? 'keyboard_arrow_right' : 'keyboard_arrow_left'}
									</Icon>
								</IconButton>
							</ListItem>
						</div>
					)}
				</Reference>
				{ReactDOM.createPortal(
					<Popper
						placement={theme.direction === 'ltr' ? 'right' : 'left'}
						eventsEnabled={opened}
						positionFixed
					>
						{({ ref, style, placement, arrowProps }) =>
							opened && (
								<div
									ref={ref}
									style={{
										...style,
										zIndex: 999 + nestedLevel + 1
									}}
									data-placement={placement}
									className={clsx(styles.popper, { [styles.popperClose]: !opened })}
								>
									<Grow in={opened} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
										<Paper
											onMouseEnter={() => handleToggle(true)}
											onMouseLeave={() => handleToggle(false)}
										>
											{item.children && (
												<ul
													className={clsx(
														styles.children,
														'popper-navigation-list',
														dense && 'dense',
														'px-0'
													)}
												>
													{item.children.map(_item => (
														<NavItem
															key={_item.id}
															type={`horizontal-${_item.type}`}
															item={_item}
															nestedLevel={nestedLevel + 1}
															dense={dense}
														/>
													))}
												</ul>
											)}
										</Paper>
									</Grow>
								</div>
							)
						}
					</Popper>,
					document.querySelector('#root')
				)}
			</Manager>
		</ul>
	);
};

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
NavHorizontalCollapse.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		children: PropTypes.array
	})
};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
NavHorizontalCollapse.defaultProps = {};

/*******************************************************************************************************/
// Exportamos el componente memorizado y con rutas //
/*******************************************************************************************************/
export default withRouter(NavHorizontalCollapse);
