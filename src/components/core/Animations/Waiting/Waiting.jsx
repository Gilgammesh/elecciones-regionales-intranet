/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import PropTypes from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import animation1 from 'assets/animations/waiting/waiting1';

/*******************************************************************************************************/
// Definimos el componente Animación - Esperando //
/*******************************************************************************************************/
const Waiting = props => {
	// Obtenemos las propiedades del componente
	const { variant, height, width } = props;

	// Usamos la animación de acuerdo a la variante
	let animation = null;
	if (variant === 1) {
		animation = animation1;
	}

	// Opciones de la animación por defecto
	const animationOptions = {
		loop: true,
		autoplay: true,
		animationData: animation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	// Renderizamos el componente
	return (
		<div className="flex flex-grow justify-center items-center p-24">
			<Lottie config={animationOptions} height={height} width={width} />
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
Waiting.propTypes = {
	variant: PropTypes.number.isRequired,
	height: PropTypes.string.isRequired,
	width: PropTypes.string.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Waiting;
