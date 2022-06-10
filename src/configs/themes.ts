/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import { createTheme } from '@material-ui/core/styles'
import { esES } from '@material-ui/core/locale'
import { getContrastRatio } from '@material-ui/core/styles/colorManipulator'
import { red } from '@material-ui/core/colors'
import _ from 'lodash'
import { initTheme } from './settings'
import { persDark, skyBlue } from 'styles/colors'

/*******************************************************************************************************/
// Opciones por defecto de los temas //
/*******************************************************************************************************/
export const defaultOptions = {
  typography: {
    fontFamily: ['Muli', 'Roboto', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    htmlFontSize: 10,
    body1: {
      fontSize: '1.3rem'
    },
    body2: {
      fontSize: '1.3rem'
    },
    button: {
      fontSize: '1.3rem'
    }
  }
}

/*******************************************************************************************************/
// Funcion para extender los temas usando mixins //
/*******************************************************************************************************/
export const extendThemeWithMixins = (obj: any) => {
  const theme = createTheme(obj)
  return {
    border: (width = 1) => ({
      borderWidth: width,
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    }),
    borderLeft: (width = 1) => ({
      borderLeftWidth: width,
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    }),
    borderRight: (width = 1) => ({
      borderRightWidth: width,
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    }),
    borderTop: (width = 1) => ({
      borderTopWidth: width,
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    }),
    borderBottom: (width = 1) => ({
      borderBottomWidth: width,
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    })
  }
}

/*******************************************************************************************************/
// Configuración de los temas por defecto de la Aplicación //
/*******************************************************************************************************/
export const defaultThemes: any = {
  main: {
    title: 'Tema',
    palette: {
      type: 'light',
      primary: {
        light: '#E3E6E8',
        main: '#02438B',
        dark: '#02438B'
      },
      secondary: {
        light: '#E93E35',
        main: '#E93E35',
        dark: '#E93E35'
      },
      background: {
        paper: '#FFFFFF',
        default: '#F6F7F9',
        contrast: '#F1F2F4'
      },
      error: red
    },
    status: {
      danger: 'orange'
    }
  },
  navbar: {
    title: 'Tema',
    palette: {
      type: 'dark',
      primary: {
        light: '#F1F2F4',
        main: '#FFFFFF',
        dark: '#02438B'
      },
      secondary: {
        light: '#F4CFCA',
        main: '#E93E35',
        dark: '#E93E35',
        contrastText: '#FFFFFF'
      },
      background: {
        paper: '#02438B',
        default: '#1E5BA8'
      },
      error: red
    },
    status: {
      danger: 'orange'
    }
  },
  toolbar: {
    title: 'Tema',
    palette: {
      type: 'light',
      primary: persDark,
      secondary: {
        light: skyBlue[100],
        main: skyBlue[500],
        dark: skyBlue[900]
      },
      background: {
        paper: '#F6F7F9',
        default: '#F6F7F9'
      },
      error: red
    },
    status: {
      danger: 'orange'
    }
  },
  footer: {
    title: 'Tema',
    palette: {
      type: 'light',
      primary: persDark,
      secondary: {
        light: skyBlue[100],
        main: skyBlue[500],
        dark: skyBlue[900]
      },
      background: {
        paper: '#1E2125',
        default: '#1E2125'
      },
      error: red
    },
    status: {
      danger: 'orange'
    }
  }
}

/*******************************************************************************************************/
// Función para crear variaciones del Tema en modo oscuro o suave //
/*******************************************************************************************************/
export const mainThemeVariations = (theme: any) => {
  return {
    mainThemeDark: _.merge({}, theme, {
      palette: {
        type: 'dark',
        background: {
          paper: '#1E2125',
          default: '#121212'
        }
      }
    }),
    mainThemeLight: _.merge({}, theme, {
      palette: {
        type: 'light',
        background: {
          paper: '#FFFFFF',
          default: '#F7F7F7'
        }
      }
    })
  }
}

/*******************************************************************************************************/
// Función que retorna los temas de la aplicación //
/*******************************************************************************************************/
export const getThemes = () => {
  const themes = {
    ...defaultThemes,
    ...mainThemeVariations(defaultThemes[initTheme.main])
  }
  return themes
}

/*******************************************************************************************************/
// Función que retorna el tema principal de la aplicación //
/*******************************************************************************************************/
export const getMainTheme = (theme: any) => {
  const themes: any = getThemes()
  // Hacemos un merge de las opciones por defecto y tema
  const data = _.merge({}, defaultOptions, themes[theme.main])
  // Creamos nuestro tema principal haciendo un merge de la data y los temas extendidos
  const mainTheme = createTheme(_.merge({}, data, { mixins: extendThemeWithMixins(data) }), esES)
  return mainTheme
}

/*******************************************************************************************************/
// Función que retorna el tema principal de la aplicación modo suave //
/*******************************************************************************************************/
export const getMainThemeLight = (theme: any) => {
  const themes: any = getThemes()
  // Hacemos un merge de las opciones por defecto y tema
  const data = _.merge({}, defaultOptions, themes[theme.mainThemeLight])
  // Creamos nuestro tema principal haciendo un merge de la data y los temas extendidos
  const mainThemeLight = createTheme(_.merge({}, data, { mixins: extendThemeWithMixins(data) }), esES)
  return mainThemeLight
}

/*******************************************************************************************************/
// Función que retorna el tema principal de la aplicación modo oscuro //
/*******************************************************************************************************/
export const getMainThemeDark = (theme: any) => {
  const themes: any = getThemes()
  // Hacemos un merge de las opciones por defecto y tema
  const data = _.merge({}, defaultOptions, themes[theme.mainThemeDark])
  // Creamos nuestro tema principal haciendo un merge de la data y los temas extendidos
  const mainThemeDark = createTheme(_.merge({}, data, { mixins: extendThemeWithMixins(data) }), esES)
  return mainThemeDark
}

/*******************************************************************************************************/
// Función que retorna el tema del Navbar de la aplicación //
/*******************************************************************************************************/
export const getNavbarTheme = (theme: any) => {
  const themes: any = getThemes()
  // Hacemos un merge de las opciones por defecto y tema
  const data = _.merge({}, defaultOptions, themes[theme.navbar])
  // Creamos nuestro tema principal haciendo un merge de la data y los temas extendidos
  const navbarTheme = createTheme(_.merge({}, data, { mixins: extendThemeWithMixins(data) }), esES)
  return navbarTheme
}

/*******************************************************************************************************/
// Función que retorna el tema del Toolbar de la aplicación //
/*******************************************************************************************************/
export const getToolbarTheme = (theme: any) => {
  const themes: any = getThemes()
  // Hacemos un merge de las opciones por defecto y tema
  const data = _.merge({}, defaultOptions, themes[theme.toolbar])
  // Creamos nuestro tema principal haciendo un merge de la data y los temas extendidos
  const toolbarTheme = createTheme(_.merge({}, data, { mixins: extendThemeWithMixins(data) }), esES)
  return toolbarTheme
}

/*******************************************************************************************************/
// Función que retorna el tema del Footer de la aplicación //
/*******************************************************************************************************/
export const getFooterTheme = (theme: any) => {
  const themes: any = getThemes()
  // Hacemos un merge de las opciones por defecto y tema
  const data = _.merge({}, defaultOptions, themes[theme.footer])
  // Creamos nuestro tema principal haciendo un merge de la data y los temas extendidos
  const footerTheme = createTheme(_.merge({}, data, { mixins: extendThemeWithMixins(data) }), esES)
  return footerTheme
}

/*******************************************************************************************************/
// Función que retorna el contraste del tema principal con un color dado //
/*******************************************************************************************************/
export const selectContrastMainTheme = (theme: any) => {
  const bgColor = theme.palette.primary.main
  // Analizamos si el color dado es oscuro
  function isDark(color: string) {
    return getContrastRatio(color, '#ffffff') >= 3
  }
  const selectMainThemeLight = getMainThemeLight(theme)
  const selectMainThemeDark = getMainThemeDark(theme)

  return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight
}
