/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useMemo, memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles/colorManipulator'
import * as Velocity from 'velocity-animate'
import Layouts from 'components/layouts/Layouts'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  '@global': {
    'code:not([class*="language-"])': {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.type === 'light' ? 'rgba(255, 255, 255, .9)' : 'rgba(0, 0, 0, .9)',
      padding: '2px 3px',
      borderRadius: 2,
      lineHeight: 1.7
    },
    'table.simple tbody tr td': {
      borderColor: theme.palette.divider
    },
    'table.simple thead tr th': {
      borderColor: theme.palette.divider
    },
    'a:not([role=button])': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    'a.link, a:not([role=button])[target=_blank]': {
      background: alpha(theme.palette.secondary.main, 0.2),
      color: 'inherit',
      borderBottom: `1px solid ${theme.palette.divider}`,
      textDecoration: 'none',
      '&:hover': {
        background: alpha(theme.palette.secondary.main, 0.3),
        textDecoration: 'none'
      }
    },
    '[class^="border-"]': {
      borderColor: theme.palette.divider
    },
    '[class*="border-"]': {
      borderColor: theme.palette.divider
    },
    hr: {
      borderColor: theme.palette.divider
    }
  },
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  }
}))

/*******************************************************************************************************/
// Definimos el componente del Layout de la Aplicación //
/*******************************************************************************************************/
const Layout = props => {
  // Recuperamos el state de los settings del usuario
  const settings = useSelector(state => state.settings)

  // Instanciamos los estilos
  const styles = useStyles(props)

  // Validamos si las animaciones estan activas
  if (settings.animations) {
    document.body.classList.remove('no-animate')
    Velocity.mock = false
  } else {
    document.body.classList.add('no-animate')
    Velocity.mock = true
  }

  // Definimos el layout
  const AppLayout = useMemo(() => Layouts[settings.layout.style], [settings.layout.style])

  // Renderizamos el componente y pasamos las propiedades a los hijos
  return <AppLayout classes={{ root: styles.root }}>{props.children}</AppLayout>
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Layout)
