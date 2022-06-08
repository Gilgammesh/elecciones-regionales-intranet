/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, LinearProgress } from '@material-ui/core'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

/*******************************************************************************************************/
// Definimos el componente de Carga Lineal //
/*******************************************************************************************************/
const ProgressLinear = props => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Renderizamos el componente
  return (
    <div className={styles.root}>
      <LinearProgress {...props} />
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ProgressLinear.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.number,
  valueBuffer: PropTypes.number
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
ProgressLinear.defaultProps = {
  color: 'secondary'
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default memo(ProgressLinear)
