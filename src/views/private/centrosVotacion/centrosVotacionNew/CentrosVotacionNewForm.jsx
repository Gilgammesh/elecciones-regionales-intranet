/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import PropTypes from 'prop-types';
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Acción Nuevo Formulario //
/*******************************************************************************************************/
const CentrosVotacionNewForm = props => {
	// Obtenemos las propiedades del componente
	const { formValues, handleInputChange } = props;
	const { departamento, provincia, distrito, nombre, mesa, votantes } = formValues;

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full p-16 sm:p-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12 sm:col-span-2"
					type="text"
					name="nombre"
					label="Nombre"
					accept="onlyLetterAndSpace"
					value={nombre}
					onChange={handleInputChange}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-10"
					name="descripcion"
					label="Descripción"
					multiline
					value={descripcion}
					onChange={handleInputChange}
					variant="outlined"
				/>
			</div>
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12 sm:col-span-6"
					type="text"
					name="nombre"
					label="Local"
					value={nombre}
					onChange={handleInputChange}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-3"
					type="text"
					name="mesa"
					label="Mesa"
					value={mesa}
					onChange={handleInputChange}
					variant="outlined"
					required
				/>
			</div>
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
CentrosVotacionNewForm.propTypes = {
	formValues: PropTypes.object.isRequired,
	handleInputChange: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default CentrosVotacionNewForm;
