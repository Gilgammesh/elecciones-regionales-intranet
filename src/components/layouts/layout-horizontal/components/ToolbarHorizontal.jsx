/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, Hidden, Toolbar } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import clsx from 'clsx'
// import Search from 'components/core/Search';
// import ChatPanelToggleButton from 'components/layouts/shared-components/chatPanel/ChatPanelToggleButton';
import NavbarMobileToggleButton from 'components/layouts/shared-components/NavbarMobileToggleButton'
// import QuickPanelToggleButton from 'components/layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'components/layouts/shared-components/UserMenu'
import { getToolbarTheme } from 'configs/themes'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light
  }
}))

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Horizontal - ToolBar //
/*******************************************************************************************************/
const ToolbarHorizontal = props => {
  // Recuperamos el state de los settings del usuario
  const settings = useSelector(state => state.settings)
  const { theme, layout } = settings
  const { config } = layout

  // Instanciamos los estilos
  const styles = useStyles(props)

  // Obtenemos el tema del Navbar de la aplicación
  const toolbarTheme = getToolbarTheme(theme)

  // Renderizamos el componente con el tema
  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar id="fuse-toolbar" className={clsx(styles.root, 'flex relative z-10')} color="default" elevation={2}>
        <Toolbar className="container p-0 lg:px-24">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className="w-64 h-64 p-0" />
            </Hidden>
          )}

          <div className="flex flex-1"></div>

          <div className="flex items-center px-8">
            {/* TODO: Quitar comentario en layout horizontal cuando se configure la búsqueda */}
            {/* <Search /> */}

            {/* <ChatPanelToggleButton /> */}

            {/* <QuickPanelToggleButton /> */}

            <UserMenu />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(ToolbarHorizontal)
