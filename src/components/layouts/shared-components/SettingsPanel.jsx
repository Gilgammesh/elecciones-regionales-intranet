/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, memo, useState } from 'react'
import { Button, Dialog, Icon, IconButton, Slide, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import clsx from 'clsx'
import Scrollbars from 'components/core/Scrollbars'
import Settings from 'components/core/Settings'

/*******************************************************************************************************/
// Creamos una transición //
/*******************************************************************************************************/
const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />
})

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    items: 'center',
    justify: 'center',
    overflow: 'hidden',
    opacity: 0.9,
    padding: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    zIndex: 999,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[500],
      opacity: 1
    }
  },
  button: {
    minWidth: 40,
    width: 40,
    height: 40,
    margin: 0
  },
  settingsButton: {
    '& $buttonIcon': {
      animation: '$rotating 3s linear infinite'
    }
  },
  '@keyframes rotating': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  },
  buttonIcon: {
    fontSize: 20
  },
  dialogPaper: {
    position: 'fixed',
    width: 380,
    maxWidth: '90vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    top: 0,
    height: '100%',
    minHeight: '100%',
    bottom: 0,
    right: 0,
    margin: 0,
    zIndex: 1000,
    borderRadius: 0
  }
}))

/*******************************************************************************************************/
// Definimos el componente del Layout - Panel de Ajustes //
/*******************************************************************************************************/
const SettingsPanel = () => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Estado inicial del apertura de la ventana de Dialogo
  const [open, setOpen] = useState(false)

  // Evento que ocurre al clickear el botón abre o cierra
  const handleOpen = () => {
    setOpen(true)
  }

  // Evento que ocurre al cerrar la ventan de diálogo
  const handleClose = () => {
    setOpen(false)
  }

  // Renderizamos el componente
  return (
    <>
      <div className={styles.buttonWrapper} id="app-settings-schemes">
        <Button
          className={clsx(styles.button, styles.settingsButton)}
          onClick={handleOpen}
          variant="text"
          color="inherit"
        >
          <Icon className={styles.buttonIcon}>settings</Icon>
        </Button>
      </div>

      <Dialog
        TransitionComponent={Transition}
        aria-labelledby="settings-panel"
        aria-describedby="settings"
        open={open}
        keepMounted
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        classes={{
          paper: styles.dialogPaper
        }}
      >
        <Scrollbars className="p-24 sm:p-32">
          <IconButton className="fixed top-0 ltr:right-0 rtl:left-0 z-10" onClick={handleClose}>
            <Icon>close</Icon>
          </IconButton>

          <Typography className="mb-32" variant="h6">
            Ajustes del Tema
          </Typography>

          <Settings />
        </Scrollbars>
      </Dialog>
    </>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(SettingsPanel)
