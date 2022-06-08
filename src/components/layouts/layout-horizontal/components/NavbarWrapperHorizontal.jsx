/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer, Hidden, Paper } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import clsx from 'clsx'
import { getNavbarTheme } from 'configs/themes'
import { startNavbarCloseMobile } from 'redux/actions/navbar'
import NavbarMobileHorizontal from './NavbarMobileHorizontal'
import NavbarMobileToggleFab from 'components/layouts/shared-components/NavbarMobileToggleFab'
import NavbarHorizontal from './NavbarHorizontal'
import Logo from 'components/layouts/shared-components/Logo'
import { navbarWidth } from 'configs/settings'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  navbar: {
    display: 'flex',
    overflow: 'hidden',
    height: 64,
    minHeight: 64,
    alignItems: 'center',
    boxShadow: theme.shadows[3],
    zIndex: 6
  },
  navbarMobile: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
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
  navbarLogo: {
    width: navbarWidth + 20,
    backgroundColor: '#ffffff'
  }
}))

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Horizontal - Envoltura del NavBar //
/*******************************************************************************************************/
const NavbarWrapperHorizontal = props => {
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

  // Renderizamos el componente con el tema
  return (
    <>
      <ThemeProvider theme={navbarTheme}>
        <Hidden mdDown>
          <Paper className={styles.navbar} square elevation={2}>
            <div
              className={clsx(
                styles.navbarLogo,
                'flex flex-auto justify-between items-center h-full container p-0 px-20'
              )}
            >
              <Logo />
            </div>
            <NavbarHorizontal />
          </Paper>
        </Hidden>

        <Hidden lgUp>
          <Drawer
            anchor="left"
            variant="temporary"
            open={navbar.mobileOpen}
            classes={{
              paper: styles.navbarMobile
            }}
            onClose={ev => dispatch(startNavbarCloseMobile())}
            ModalProps={{
              // Mejor rendimiento al abrir en dispositivos móviles
              keepMounted: true
            }}
          >
            <NavbarMobileHorizontal />
          </Drawer>
        </Hidden>
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
export default memo(NavbarWrapperHorizontal)
