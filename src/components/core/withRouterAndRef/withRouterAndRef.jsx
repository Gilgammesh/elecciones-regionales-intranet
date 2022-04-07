/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { Component, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';

/*******************************************************************************************************/
// Función que devuelce un componente con Router y Referencia //
/*******************************************************************************************************/
const withRouterAndRef = WrappedComponent => {
	// Creamos la clase que hereda el componente con la referencia
	class InnerComponentWithRef extends Component {
		// Renderizamos
		render() {
			const { forwardRef, ...rest } = this.props;
			// Retornamos el componente recibido con la referencia
			return <WrappedComponent {...rest} ref={forwardRef} />;
		}
	}

	// Componente con la ruta
	const ComponentWithRouter = withRouter(InnerComponentWithRef, { withRef: true });
	// Retornamos componente con la ruta y la referencia
	return forwardRef((props, ref) => <ComponentWithRouter {...props} forwardRef={ref} />);
};

/*******************************************************************************************************/
// Exportamos la función //
/*******************************************************************************************************/
export default withRouterAndRef;
