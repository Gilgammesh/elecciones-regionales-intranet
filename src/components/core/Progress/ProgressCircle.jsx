/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, CircularProgress } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}))

/*******************************************************************************************************/
// Definimos el componente de Carga Circular //
/*******************************************************************************************************/
const ProgressCircle = props => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Renderizamos el componente
  return (
    <div className={styles.root}>
      <CircularProgress {...props} />
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ProgressCircle.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number,
  value: PropTypes.number
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
ProgressCircle.defaultProps = {
  color: 'secondary'
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default memo(ProgressCircle)
