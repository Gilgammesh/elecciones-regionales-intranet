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
const PageCardedSidebarContent = props => {
  // Obtenemos el tema de la app
  const theme = useTheme()

  // Obtenemos el tema de contraste
  const contrastTheme = selectContrastMainTheme(theme)

  // Obtenemos las propiedades
  const { classes } = props

  // Renderizamos el componente
  return (
    <>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div className={clsx(classes.sidebarHeader, props.variant)}>{props.header}</div>
        </ThemeProvider>
      )}

      {props.content && (
        <Scrollbars className={classes.sidebarContent} enable={props.innerScroll}>
          {props.content}
        </Scrollbars>
      )}
    </>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PageCardedSidebarContent
