/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fab, Icon, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { startNavbarToggleMobile } from 'redux/actions/navbar'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  buttonIcon: {
    fontSize: 18,
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short
    })
  },
  mobileButton: {
    height: 40,
    position: 'absolute',
    zIndex: 99,
    top: 12,
    width: 24,
    borderRadius: 38,
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['background-color', 'border-radius', 'width', 'min-width', 'padding'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&:hover': {
      width: 52,
      paddingLeft: 8,
      paddingRight: 8
    },
    '&.left': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      paddingLeft: 4,
      left: 0
    },

    '&.right': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      paddingRight: 4,
      right: 0,
      '& $buttonIcon': {
        transform: 'rotate(-180deg)'
      }
    }
  }
}))

/*******************************************************************************************************/
// Definimos el componente del Layout - Alternar Menu Móvil Fab //
/*******************************************************************************************************/
const NavbarMobileToggleFab = props => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Recuperamos el state de los settings del usuario
  const settings = useSelector(state => state.settings)
  const { config } = settings.layout

  // Instanciamos los estilos
  const styles = useStyles(props)

  // Renderizamos el componente
  return (
    <Tooltip title="Show Navigation" placement={config.navbar.position === 'left' ? 'right' : 'left'}>
      <Fab
        className={clsx(styles.mobileButton, config.navbar.position, props.className)}
        onClick={ev => dispatch(startNavbarToggleMobile())}
        disableRipple
      >
        <Icon className={styles.buttonIcon} color="action">
          menu
        </Icon>
      </Fab>
    </Tooltip>
  )
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
NavbarMobileToggleFab.defaultProps = {}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default NavbarMobileToggleFab
