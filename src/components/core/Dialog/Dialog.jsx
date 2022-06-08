/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MuiDialog from '@material-ui/core/Dialog'
import { startCloseDialog } from 'redux/actions/dialog'

/*******************************************************************************************************/
// Definimos el componente del Dialogo de la Aplicación //
/*******************************************************************************************************/
const Dialog = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Recuperamos el state del Dialog
  const dialog = useSelector(state => state.dialog)
  const { state, options } = dialog

  // Renderizamos el componente
  return (
    <MuiDialog
      open={state}
      // Al cerrar cambiamos el estado del dialogo
      onClose={evt => dispatch(startCloseDialog())}
      aria-labelledby="fuse-dialog-title"
      classes={{
        paper: 'rounded-8'
      }}
      {...options}
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Dialog
