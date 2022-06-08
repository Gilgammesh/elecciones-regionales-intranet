/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { amber, blue, green } from '@material-ui/core/colors'
import {
  Icon,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography
} from '@material-ui/core'
import clsx from 'clsx'
import { startHideMessage } from 'redux/actions/message'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {},
  success: {
    backgroundColor: green[600],
    color: '#FFFFFF'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.getContrastText(theme.palette.error.dark)
  },
  info: {
    backgroundColor: blue[600],
    color: '#FFFFFF'
  },
  warning: {
    backgroundColor: amber[600],
    color: '#FFFFFF'
  }
}))

/*******************************************************************************************************/
// Definimos las variantes de los Iconos //
/*******************************************************************************************************/
const variantIcon = {
  success: 'check_circle',
  warning: 'warning',
  error: 'error_outline',
  info: 'info'
}

/*******************************************************************************************************/
// Definimos el componente del Mensaje de la Aplicación //
/*******************************************************************************************************/
const Message = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Recuperamos el state del Message
  const message = useSelector(state => state.message)
  const { state, options } = message

  // Instanciamos los estilos
  const styles = useStyles()

  // Renderizamos el componente
  return (
    <Snackbar
      {...options}
      open={state}
      onClose={() => dispatch(startHideMessage())}
      classes={{
        root: styles.root
      }}
      ContentProps={{
        variant: 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div'
        }
      }}
    >
      <SnackbarContent
        className={clsx(styles[options.variant])}
        message={
          <div className="flex items-center">
            {variantIcon[options.variant] && (
              <Icon color="inherit">{variantIcon[options.variant]}</Icon>
            )}
            <Typography className="mx-8">{options.message}</Typography>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(startHideMessage())}
          >
            <Icon>close</Icon>
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(Message)
