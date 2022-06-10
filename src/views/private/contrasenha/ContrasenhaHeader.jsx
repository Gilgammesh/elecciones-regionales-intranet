/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import SaveIcon from '@material-ui/icons/Save'
import Animate from 'components/core/Animate'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    '& .Mui-disabled': {
      backgroundColor: '#e0e0e0'
    }
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Contraseña Header //
/*******************************************************************************************************/
const ContrasenhaHeader = props => {
  // Obtenemos las propiedades
  const { isFormValid } = props

  // Instanciamos los estilos
  const styles = useStyles()

  // Renderizamos el componente
  return (
    <div className={clsx('flex flex-1 w-full items-center justify-between', styles.root)}>
      <div className="flex items-center">
        <Animate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">lock_open</Icon>
        </Animate>
        <Animate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Cambiar contraseña
          </Typography>
        </Animate>
      </div>
      <div className="flex flex-1 items-center justify-center px-12"></div>
      <Animate animation="transition.slideRightIn" delay={300}>
        <Button
          type="submit"
          className="whitespace-no-wrap normal-case"
          variant="contained"
          disabled={!isFormValid}
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </Animate>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ContrasenhaHeader.propTypes = {
  isFormValid: PropTypes.bool.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ContrasenhaHeader
