/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useTheme, ThemeProvider } from '@material-ui/core/styles'
import clsx from 'clsx'
import Scrollbars from '../Scrollbars'
import { selectContrastMainTheme } from 'configs/themes'

/*******************************************************************************************************/
// Definimos el componente Página Simple - Contenido de Barra Lateral //
/*******************************************************************************************************/
const PageSimpleSidebarContent = props => {
  // Obtenemos el tema de la app
  const theme = useTheme()

  // Obtenemos el tema de contraste
  const contrastTheme = selectContrastMainTheme(theme)

  // Obtenemos las propiedades
  const { classes } = props

  // Renderizamos el componente
  return (
    <Scrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div
            className={clsx(
              classes.sidebarHeader,
              props.variant,
              props.sidebarInner && classes.sidebarHeaderInnerSidebar
            )}
          >
            {props.header}
          </div>
        </ThemeProvider>
      )}

      {props.content && <div className={classes.sidebarContent}>{props.content}</div>}
    </Scrollbars>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PageSimpleSidebarContent
