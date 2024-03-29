/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/core/Loading'

/*******************************************************************************************************/
// Definimos el componente de Suspenso //
/*******************************************************************************************************/
const Suspense = props => {
  // Renderizamos el componente
  return <React.Suspense fallback={<Loading {...props.loadingProps} />}>{props.children}</React.Suspense>
}

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
Suspense.propTypes = {
  loadingProps: PropTypes.object
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
Suspense.defaultProps = {
  loadingProps: {
    delay: 0
  }
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Suspense
