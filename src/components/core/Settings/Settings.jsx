/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import LayoutConfigs from 'components/layouts/LayoutConfigs'
import { getThemes } from 'configs/themes'
import { startSetSettings } from 'redux/actions/settings'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    margin: '6px 0',
    width: '100%',
    '&:last-child': {
      marginBottom: 0
    }
  },
  group: {},
  formColorTitle: {
    fontWeight: 600,
    padding: '0 4px'
  },
  formGroup: {
    position: 'relative',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 2,
    padding: '12px 12px 0 12px',
    margin: '24px 0 16px 0',
    '&:first-of-type': {
      marginTop: 16
    }
  }
}))

/*******************************************************************************************************/
// Función para previsualizar los esquemas de colores del tema //
/*******************************************************************************************************/
const SchemePreview = ({ theme, className, id, onSelect }) => {
  // Hook de Material ui para retornar el tema
  const _theme = useTheme()

  // Establecemos las variables de color de la paleta de temas pasada y el tema actual
  const primaryColor = theme.palette.primary[500] ? theme.palette.primary[500] : theme.palette.primary.main
  const primaryColorLight = theme.palette.primary.light
  const primaryColorContrast = _theme.palette.getContrastText(primaryColor)
  const secondaryColor = theme.palette.secondary[500] ? theme.palette.secondary[500] : theme.palette.secondary.main
  const secondaryColorContrast = _theme.palette.getContrastText(secondaryColor)
  const backgroundColor = theme.palette.background.default
  const backgroundColorContrast = _theme.palette.getContrastText(theme.palette.background.default)
  const paperColor = theme.palette.primary.main
  const paperColorContrast = _theme.palette.getContrastText(theme.palette.primary.main)

  // Renderizamos el componente
  return (
    <div className={clsx(className, 'mb-8')}>
      <button
        className={clsx(
          'w-full text-left rounded-6 relative font-500 shadow-1 hover:shadow-2 cursor-pointer overflow-hidden'
        )}
        style={{
          backgroundColor,
          color: backgroundColorContrast
        }}
        onClick={() => onSelect(id)}
        type="button"
      >
        <div
          className="w-full h-56 px-8 pt-8 relative"
          style={{
            backgroundColor: primaryColorLight,
            color: primaryColorContrast
          }}
        >
          <span className="text-12 opacity-75">Cabecera (Principal)</span>

          <div
            className="flex items-center justify-center w-20 h-20 rounded-full absolute bottom-0 right-0 -mb-10 shadow-1 text-10 mr-4"
            style={{
              backgroundColor: secondaryColor,
              color: secondaryColorContrast
            }}
          >
            <span className="opacity-75">S</span>
          </div>
        </div>
        <div className="pl-8 pr-28 -mt-24 w-full">
          <div
            className="w-full h-96 rounded-4 relative shadow-1 p-8"
            style={{
              backgroundColor: paperColor,
              color: paperColorContrast
            }}
          >
            <span className="text-12 opacity-75">Ventana</span>
          </div>
        </div>

        <div className="px-8 py-8 w-full">
          <span className="text-12 opacity-75">Fondo</span>
        </div>
      </button>
      <Typography className="font-bold w-full text-center mt-12">{theme.title}</Typography>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos el componente de Ajustes del tema de la aplicación //
/*******************************************************************************************************/
const Settings = props => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Recuperamos el state de los settings del usuario
  const settings = useSelector(state => state.settings)

  // Instanciamos los estilos
  const styles = useStyles(props)

  // Obtenemos los temas de la aplicación
  const themes = getThemes()

  // Función que se ejecuta al cambio en los inputs del radio group
  const handleLayoutSelect = evt => {
    // Recuperamos el nombre y el valor del evento
    const { name, value } = evt.target

    // Si el valor elegido es diferente del diseño actual ejecutamos
    if (name === 'layout.style' && value !== settings.layout.style) {
      const newSettings = {
        ...settings,
        layout: {
          style: value,
          config: LayoutConfigs[value].defaults
        }
      }
      dispatch(startSetSettings(newSettings))
    }
  }

  // Función que se ejecuta al seleccionar un esquema de colores del tema
  const handleSchemeSelect = themeId => {
    // Extraemos el numero de correlativo del tema
    const numId = themeId.slice(7)
    // Creamos los nuevos ajustes
    const newSettings = {
      ...settings,
      theme: {
        main: `main-${numId}`,
        navbar: themeId,
        toolbar: 'toolbar',
        footer: 'footer'
      }
    }
    // Guardamos los ajustes
    dispatch(startSetSettings(newSettings))
  }

  // Componente para seleccionar el Diseño de la aplicación
  const LayoutSelect = () => (
    <FormControl component="fieldset" className={styles.formControl}>
      <RadioGroup
        aria-label="Layout Style"
        name="layout.style"
        className={styles.group}
        value={settings.layout.style}
        onChange={handleLayoutSelect}
      >
        {Object.entries(LayoutConfigs).map(([key, layout]) => (
          <FormControlLabel key={key} value={key} control={<Radio />} label={layout.title} />
        ))}
      </RadioGroup>
    </FormControl>
  )

  // Renderizamos el componente
  return (
    <div className={styles.root}>
      <hr />
      <br />
      <Typography className={styles.formColorTitle} variant="subtitle1">
        Diseño
      </Typography>
      <LayoutSelect />
      <br />
      <hr />
      <br />
      <Typography className={clsx(styles.formColorTitle, 'mb-6')} variant="subtitle1">
        Colores
      </Typography>
      <div className="flex flex-wrap w-full -mx-8">
        {Object.entries(themes)
          .filter(([key]) => key.includes('navbar'))
          .map(([key, val]) => (
            <div key={key} className="w-1/2 p-8">
              <SchemePreview id={key} theme={val} onSelect={handleSchemeSelect} />
            </div>
          ))}
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Settings)
