/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Icon, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import NavLinkAdapter from 'components/core/NavLinkAdapter'
import NavBadge from '../NavBadge'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 48,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: `${theme.palette.secondary.contrastText}!important`,
      pointerEvents: 'none',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {},
    '& .list-item-text': {
      padding: '0 0 0 16px'
    },
    color: theme.palette.text.primary,
    textDecoration: 'none!important'
  }
}))

/*******************************************************************************************************/
// Definimos el componente Item de Navegación Horizontal //
/*******************************************************************************************************/
const NavHorizontalItem = props => {
  // Instanciamos los estilos
  const styles = useStyles(props)

  // Obtenemos las propiedades
  const { item } = props

  // Renderizamos el componente
  return (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={clsx('list-item', styles.root)}
      exact={item.exact}
    >
      {item.icon && (
        <Icon className="list-item-icon text-16 flex-shrink-0" color="action">
          {item.icon}
        </Icon>
      )}

      <ListItemText
        className="list-item-text"
        primary={item.title}
        classes={{ primary: 'text-14 list-item-text-primary' }}
      />

      {item.badge && (
        <NavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />
      )}
    </ListItem>
  )
}

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
NavHorizontalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string
  })
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
NavHorizontalItem.defaultProps = {}

/*******************************************************************************************************/
// Exportamos el componente memorizado y con rutas //
/*******************************************************************************************************/
export default withRouter(NavHorizontalItem)
