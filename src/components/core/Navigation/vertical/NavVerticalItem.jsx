/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Icon, ListItem, ListItemText, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import NavLinkAdapter from 'components/core/NavLinkAdapter'
import NavBadge from '../NavBadge'
import { startNavbarCloseMobile } from 'redux/actions/navbar'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  item: props => ({
    height: 40,
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingRight: 12,
    paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: `${theme.palette.secondary.contrastText}!important`,
      pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {
      marginRight: 16
    },
    '& .list-item-text': {},
    color: theme.palette.text.primary,
    cursor: 'pointer',
    textDecoration: 'none!important'
  })
}))

/*******************************************************************************************************/
// Definimos el componente Item de Navegación Vertical //
/*******************************************************************************************************/
const NavVerticalItem = props => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el tema de Material UI
  const theme = useTheme()
  // Rango de separación para la pantalla mediana
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  // Obtenemos las propiedades
  const { item, nestedLevel } = props

  // Instanciamos los estilos
  const styles = useStyles({
    itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
  })

  // Renderizamos el componente
  return (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={clsx(styles.item, 'list-item')}
      onClick={() => mdDown && dispatch(startNavbarCloseMobile())}
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
        classes={{ primary: 'text-13 list-item-text-primary' }}
      />

      {item.badge && <NavBadge badge={item.badge} />}
    </ListItem>
  )
}

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
NavVerticalItem.propTypes = {
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
NavVerticalItem.defaultProps = {}

/*******************************************************************************************************/
// Exportamos el componente memorizado y con rutas //
/*******************************************************************************************************/
export default withRouter(NavVerticalItem)
