/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Collapse, Icon, IconButton, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import NavLinkAdapter from 'components/core/NavLinkAdapter';
import NavBadge from '../NavBadge';
import NavItem from '../NavItem';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {
		padding: 0,
		'&.open': {
			backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,.065)' : 'rgba(0,0,0,.065)'
		}
	},
	item: props => ({
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingRight: 12,
		paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
		color: theme.palette.text.primary,
		'&.active > .list-item-text > span': {
			fontWeight: 600
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	})
}));

/*******************************************************************************************************/
// Función si la locación necesita ser abierta //
/*******************************************************************************************************/
const needsToBeOpened = (location, item) => {
	return location && isUrlInChildren(item, location.pathname);
};

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
// Definimos el componente Colapso de Navegación Vertical //
/*******************************************************************************************************/
const NavVerticalCollapse = props => {
	// Obtenemos las propiedades
	const { location, item, nestedLevel } = props;

	// Estado inicial de abrir o colapsar el nav vertical
	const [open, setOpen] = useState(() => needsToBeOpened(location, item));

	// Instanciamos los estilos
	const styles = useStyles({
		itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
	});

	// Efecto si se necesita abrir cambiamos el estado con la locacion y el item
	useEffect(() => {
		if (needsToBeOpened(location, item)) {
			setOpen(true);
		}
	}, [location, item]);

	// Función para abrir el nav
	const handleClick = () => {
		setOpen(!open);
	};

	// Renderizamos el componente
	return (
		<ul className={clsx(styles.root, open && 'open')}>
			<ListItem
				button
				className={clsx(styles.item, 'list-item')}
				onClick={handleClick}
				component={item.url ? NavLinkAdapter : 'li'}
				to={item.url}
				role="button"
			>
				{item.icon && (
					<Icon color="action" className="list-item-icon text-16 flex-shrink-0">
						{item.icon}
					</Icon>
				)}

				<ListItemText className="list-item-text" primary={item.title} classes={{ primary: 'text-14' }} />

				{item.badge && <NavBadge className="mx-4" badge={item.badge} />}

				<IconButton
					disableRipple
					className="w-40 h-40 -mx-12 p-0 focus:bg-transparent hover:bg-transparent"
					onClick={ev => ev.preventDefault()}
				>
					<Icon className="text-16 arrow-icon" color="inherit">
						{open ? 'expand_less' : 'expand_more'}
					</Icon>
				</IconButton>
			</ListItem>

			{item.children && (
				<Collapse in={open} className="collapse-children">
					{item.children.map(_item => (
						<NavItem
							key={_item.id}
							type={`vertical-${_item.type}`}
							item={_item}
							nestedLevel={nestedLevel + 1}
						/>
					))}
				</Collapse>
			)}
		</ul>
	);
};

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
NavVerticalCollapse.propTypes = {
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
NavVerticalCollapse.defaultProps = {};

/*******************************************************************************************************/
// Exportamos el componente memorizado y con rutas //
/*******************************************************************************************************/
export default withRouter(NavVerticalCollapse);
