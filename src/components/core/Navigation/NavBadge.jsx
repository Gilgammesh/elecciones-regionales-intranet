/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    padding: '0 7px',
    fontSize: 11,
    fontWeight: 600,
    height: 20,
    minWidth: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}))

/*******************************************************************************************************/
// Definimos el componente de Insignia de Navegación //
/*******************************************************************************************************/
const NavBadge = props => {
  // Instanciamos los estilos
  const styles = useStyles(props)

  // Obtenemos las propiedades del componente
  const { className, badge } = props

  // Renderizamos el componente
  return (
    <div
      className={clsx(styles.root, className, 'item-badge')}
      style={{
        backgroundColor: badge.bg,
        color: badge.fg
      }}
    >
      {badge.title}
    </div>
  )
}

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
NavBadge.propTypes = {
  badge: PropTypes.shape({
    title: PropTypes.node,
    bg: PropTypes.string,
    fg: PropTypes.string
  })
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
NavBadge.defaultProps = {}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default NavBadge
