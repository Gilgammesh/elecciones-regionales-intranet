/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy';
import { fetchData } from 'services/fetch';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Accion Editar Formulario //
/*******************************************************************************************************/
const AccionesEditForm = props => {
	// Obtenemos el id del usuario de los parámetros de la ruta
	const { id } = useParams();

	// Obtenemos las propiedades del componente
	const { formValues, handleInputChange, setForm } = props;
	// Obtenemos los valores del formulario
	const { nombre, descripcion } = formValues;

	// Efecto para obtener los datos de la acción con el id
	useEffect(() => {
		// Estado inicial de montaje
		let mounted = true;
		// Función para obtener los datos de una acción
		const getAccion = async () => {
			// Obtenemos los datos de una accion con fetch
			const result = await fetchData(`admin/acciones/${id}`, { isTokenReq: true });
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Obtenemos la acción
				const { accion } = result.data;
				// Guardamos los datos del formulario
				setForm({
					nombre: accion.nombre,
					descripcion: accion.descripcion
				});
			}
		};
		// Si existe un id
		if (id) {
			// Obtenemos los datos de la acción
			getAccion();
		}
		// Limpiamos el montaje
		return () => {
			mounted = false;
		};
	}, [id, setForm]);

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
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
AccionesEditForm.propTypes = {
	formValues: PropTypes.object.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AccionesEditForm;
