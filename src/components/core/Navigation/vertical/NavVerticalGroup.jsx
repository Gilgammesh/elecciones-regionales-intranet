/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ListSubheader, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import _ from 'lodash'
import NavLinkAdapter from 'components/core/NavLinkAdapter'
import NavItem from '../NavItem'
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
    '&.active > .list-subheader-text': {
      fontWeight: 700
    }
  })
}))

/*******************************************************************************************************/
// Definimos el componente Grupo de Navegación Vertical //
/*******************************************************************************************************/
const NavVerticalGroup = props => {
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
    <>
      <ListSubheader
        disableSticky
        className={clsx(styles.item, 'list-subheader flex items-center', !item.url && 'cursor-default')}
        onClick={() => mdDown && dispatch(startNavbarCloseMobile())}
        component={item.url ? NavLinkAdapter : 'li'}
        to={item.url}
        role="button"
      >
        <span className="list-subheader-text uppercase text-12">{item.title}</span>
      </ListSubheader>

      {item.children && (
        <>
          {_.orderBy(item.children, ['orden'], ['asc']).map(_item => (
            <NavItem key={_item.id} type={`vertical-${_item.type}`} item={_item} nestedLevel={nestedLevel} />
          ))}
        </>
      )}
    </>
  )
}

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
NavVerticalGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.array
  })
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
NavVerticalGroup.defaultProps = {}

/*******************************************************************************************************/
// Exportamos el componente memorizado y con rutas //
/*******************************************************************************************************/
export default withRouter(NavVerticalGroup)
