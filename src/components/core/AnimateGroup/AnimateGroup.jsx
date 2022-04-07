/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { VelocityTransitionGroup } from 'velocity-react';
import 'velocity-animate/velocity.ui';

/*******************************************************************************************************/
// Definimos las propiedades por defecto de la animación al entrar //
/*******************************************************************************************************/
const enterAnimationDefaults = {
	animation: 'transition.fadeIn',
	stagger: 50,
	duration: 200,
	display: null,
	visibility: 'visible',
	delay: 0
};

/*******************************************************************************************************/
// Definimos las propiedades por defecto de la animación al salir //
/*******************************************************************************************************/
const leaveAnimationDefaults = {
	stagger: 50,
	duration: 200,
	display: null,
	visibility: 'visible',
	delay: 0
};

/*******************************************************************************************************/
// Definimos el componente de Animación de Grupo //
/*******************************************************************************************************/
const AnimateGroup = props => {
	// Renderizamos el componente
	return (
		<VelocityTransitionGroup
			{...props}
			enter={{ ...enterAnimationDefaults, ...props.enter }}
			leave={{ ...leaveAnimationDefaults, ...props.leave }}
		/>
	);
};

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
AnimateGroup.propTypes = {
	children: PropTypes.any
};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
AnimateGroup.defaultProps = {
	enter: enterAnimationDefaults,
	leave: leaveAnimationDefaults,
	easing: [0.4, 0.0, 0.2, 1],
	runOnMount: true,
	enterHideStyle: {
		opacity: 1
	},
	enterShowStyle: {
		opacity: 0
	}
};

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(AnimateGroup);
