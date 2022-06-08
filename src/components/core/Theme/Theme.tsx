/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { getMainTheme } from 'configs/themes'
import { IRootReducers } from 'redux/store'

/*******************************************************************************************************/
// Props para el componente //
/*******************************************************************************************************/
type Props = {
  children: React.ReactNode
}

/*******************************************************************************************************/
// Definimos el componente del Tema de la Aplicación //
/*******************************************************************************************************/
const Theme = (props: Props) => {
  // Recuperamos el state de los settings del usuario
  const settings = useSelector((state: IRootReducers) => state.settings)
  // Tema de los setting
  const { theme } = settings

  // Obtenemos el tema principal de la aplicación
  const mainTheme = getMainTheme(theme)

  // Renderizamos el componente con un ThemeProvider, pasamos el tema y las propiedades a los hijos
  return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Theme)
