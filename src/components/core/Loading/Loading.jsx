/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, Typography } from '@material-ui/core';
import useTimeout from 'hooks/useTimeout';

/*******************************************************************************************************/
// Definimos el componente de Cargando Layouts //
/*******************************************************************************************************/
export const Loading = props => {
	// Estado inicial de cargando
	const [showLoading, setShowLoading] = useState(!props.delay);

	// Usamos el hook personalizado para el delay
	useTimeout(() => {
		setShowLoading(true);
	}, props.delay);

	// Si no está cargando no mostramos nada
	if (!showLoading) {
		return null;
	}

	// Caso contrario renderizamos el componente
	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			<Typography className="text-20 mb-16" color="textSecondary">
				Cargando...
			</Typography>
			<LinearProgress className="w-xs" color="secondary" />
		</div>
	);
};

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
Loading.propTypes = {
	delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
Loading.defaultProps = {
	delay: false
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Loading;
