/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer, Hidden } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import clsx from 'clsx'
import { getNavbarTheme } from 'configs/themes'
import {
  startNavbarOpenFolded,
  startNavbarCloseFolded,
  startNavbarCloseMobile
} from 'redux/actions/navbar'
import NavbarMobileToggleFab from 'components/layouts/shared-components/NavbarMobileToggleFab'
import NavbarVertical from './NavbarVertical'
import { navbarWidth } from 'configs/settings'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 4,
    [theme.breakpoints.up('lg')]: {
      width: navbarWidth,
      minWidth: navbarWidth
    }
  },
  wrapperFolded: {
    [theme.breakpoints.up('lg')]: {
      width: 64,
      minWidth: 64
    }
  },
  navbar: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    flex: '1 1 auto',
    width: navbarWidth,
    minWidth: navbarWidth,
    height: '100%',
    zIndex: 4,
    transition: theme.transitions.create(['width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    boxShadow: theme.shadows[3]
  },
  left: {
    left: 0
  },
  right: {
    right: 0
  },
  folded: {
    position: 'absolute',
    width: 64,
    minWidth: 64,
    top: 0,
    bottom: 0
  },
  foldedAndOpened: {
    width: navbarWidth,
    minWidth: navbarWidth
  },
  navbarContent: {
    flex: '1 1 auto'
  },
  foldedAndClosed: {
    '& $navbarContent': {
      '& .container-logo': {
        paddingLeft: 0,
        paddingRight: 0
      },
      '& .logo-icon': {
        maxWidth: 50,
        width: 35,
        height: 35
      },
      '& .div-text': {
        opacity: 0
      },
      '& .react-badge': {
        opacity: 0
      },
      '& .list-item-text, & .arrow-icon, & .item-badge': {
        opacity: 0
      },
      '& .list-subheader .list-subheader-text': {
        opacity: 0
      },
      '& .list-subheader:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        minWidth: 16,
        borderTop: '2px solid',
        opacity: 0.2
      },
      '& .collapse-children': {
        display: 'none'
      },
      '& .user': {
        '& .username, & .email': {
          opacity: 0
        },
        '& .avatar': {
          width: 40,
          height: 40,
          top: 32,
          padding: 0
        }
      },
      '& .list-item.active': {
        marginLeft: 12,
        width: 40,
        padding: 12,
        borderRadius: 20,
        '&.square': {
          borderRadius: 0,
          marginLeft: 0,
          paddingLeft: 24,
          width: '100%'
        }
      }
    }
  }
}))

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Vertical - Envoltura del NavBar //
/*******************************************************************************************************/
const NavbarWrapperVertical = props => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Recuperamos el state de los settings del usuario
  const settings = useSelector(state => state.settings)
  const { theme, layout } = settings
  const { config } = layout

  // Recuperamos el state del Navbar
  const navbar = useSelector(state => state.navbar)

  // Instanciamos los estilos
  const styles = useStyles(props)

  // Obtenemos el tema del Navbar de la aplicación
  const navbarTheme = getNavbarTheme(theme)

  // Estados de las envolturas
  const { folded } = config.navbar
  const { foldedOpen } = navbar

  // Si se abre el menu lateral
  const foldedAndClosed = folded && !foldedOpen
  const foldedAndOpened = folded && foldedOpen

  // Renderizamos el componente con el tema
  return (
    <>
      <ThemeProvider theme={navbarTheme}>
        <div
          id="app-navbar"
          className={clsx(styles.wrapper, folded && styles.wrapperFolded)}
        >
          <Hidden mdDown>
            <div
              className={clsx(
                styles.navbar,
                styles[config.navbar.position],
                folded && styles.folded,
                foldedAndOpened && styles.foldedAndOpened,
                foldedAndClosed && styles.foldedAndClosed
              )}
              onMouseEnter={() =>
                foldedAndClosed && dispatch(startNavbarOpenFolded())
              }
              onMouseLeave={() =>
                foldedAndOpened && dispatch(startNavbarCloseFolded())
              }
              style={{
                backgroundColor: navbarTheme.palette.background.default
              }}
            >
              <NavbarVertical className={styles.navbarContent} />
            </div>
          </Hidden>

          <Hidden lgUp>
            <Drawer
              anchor={config.navbar.position}
              variant="temporary"
              open={navbar.mobileOpen}
              styles={{
                paper: styles.navbar
              }}
              onClose={() => dispatch(startNavbarCloseMobile())}
              ModalProps={{
                // Mejor rendimiento al abrir en dispositivos móviles
                keepMounted: true
              }}
            >
              <NavbarVertical className={styles.navbarContent} />
            </Drawer>
          </Hidden>
        </div>
      </ThemeProvider>

      {config.navbar.display && !config.toolbar.display && (
        <Hidden lgUp>
          <NavbarMobileToggleFab />
        </Hidden>
      )}
    </>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(NavbarWrapperVertical)
