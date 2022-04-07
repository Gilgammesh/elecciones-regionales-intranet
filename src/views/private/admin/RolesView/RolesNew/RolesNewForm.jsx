/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import PropTypes from 'prop-types';
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy';
import PermisosTable from './PermisosTable';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Rol Nuevo Formulario //
/*******************************************************************************************************/
const RolesNewForm = props => {
	// Obtenemos las propiedades del componente
	const { formValues, handleInputChange } = props;
	const { nombre, descripcion } = formValues;

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full p-16 sm:p-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12 sm:col-span-2"
					type="text"
					name="nombre"
					label="Nombre"
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
			<h2 className="mt-16 mb-16">Permisos</h2>
			<PermisosTable />
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
RolesNewForm.propTypes = {
	formValues: PropTypes.object.isRequired,
	handleInputChange: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default RolesNewForm;
