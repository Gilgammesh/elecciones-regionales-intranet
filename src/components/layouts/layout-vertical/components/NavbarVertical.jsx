/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { AppBar, Hidden, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Scrollbars from 'components/core/Scrollbars'
// import Logo from 'components/layouts/shared-components/Logo'
import Logo from 'components/layouts/shared-components/Logo_'
// import Logo from 'components/layouts/shared-components/Logo__';
import NavbarFoldedToggleButton from 'components/layouts/shared-components/NavbarFoldedToggleButton'
import NavbarMobileToggleButton from 'components/layouts/shared-components/NavbarMobileToggleButton'
import Navigation from 'components/layouts/shared-components/Navigation'
import UserNavbarHeader from 'components/layouts/shared-components/UserNavbarHeader'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles({
  content: {
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    background:
      'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll'
  }
})

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Vertical - NavBar //
/*******************************************************************************************************/
const NavbarVertical = props => {
  // Instanciamos los estilos
  const styles = useStyles(props)

  // Renderizamos el componente
  return (
    <div className={clsx('flex flex-col overflow-hidden h-full', props.className)}>
      <AppBar
        color="primary"
        position="static"
        elevation={0}
        className="container-logo flex flex-row items-center flex-shrink h-64 min-h-64 px-12"
      >
        <div className="flex flex-1 mx-8">
          <Logo />
        </div>

        <Hidden mdDown>
          <NavbarFoldedToggleButton className="w-40 h-40 p-0" />
        </Hidden>

        <Hidden lgUp>
          <NavbarMobileToggleButton className="w-40 h-40 p-0">
            <Icon>arrow_back</Icon>
          </NavbarMobileToggleButton>
        </Hidden>
      </AppBar>

      <Scrollbars className={clsx(styles.content)} option={{ suppressScrollX: true }}>
        <UserNavbarHeader />

        <Navigation layout="vertical" />
      </Scrollbars>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default NavbarVertical
