/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy';
import PermisosTable from './PermisosTable';
import { startSetPermisos } from 'redux/actions/permisos';
import { fetchData } from 'services/fetch';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Rol Editar Formulario //
/*******************************************************************************************************/
const RolesEditForm = props => {
	// Obtenemos el id del rol de los parámetros de la ruta
	const { id } = useParams();

	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Obtenemos las propiedades del componente
	const { formValues, handleInputChange, setForm } = props;
	const { codigo, nombre, descripcion } = formValues;

	// Estado si el rol es de super usuario
	const [superRol, setSuperRol] = useState(null);

	// Efecto para obtener los datos del Rol con el id
	useEffect(() => {
		// Estado inicial de montaje
		let mounted = true;
		// Función para obtener los datos de un rol
		const getRol = async () => {
			// Obtenemos los datos de un rol con fetch
			const result = await fetchData(`admin/roles/${id}`, { isTokenReq: true });
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Obtenemos el rol
				const { rol } = result.data;
				// Guardamos los datos del formulario
				setForm({
					codigo: rol.codigo,
					nombre: rol.nombre,
					descripcion: rol.descripcion
				});
				// Guardamos el estado del rol
				setSuperRol(rol.super);
				// Guardamos los permisos
				dispatch(startSetPermisos(rol.permisos));
			}
		};
		// Si existe un id
		if (id) {
			// Obtenemos los datos del rol
			getRol();
		}
		// Limpiamos el montaje
		return () => {
			mounted = false;
		};
	}, [id, setForm, dispatch]);

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full p-16 sm:p-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12 sm:col-span-1"
					type="number"
					name="codigo"
					label="Codigo"
					accept="onlyNumber"
					value={codigo}
					onChange={handleInputChange}
					variant="outlined"
					inputProps={{
						maxLength: 2,
						min: 1,
						max: 99
					}}
					required
				/>
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
					className="col-span-12 sm:col-span-9"
					name="descripcion"
					label="Descripción"
					multiline
					value={descripcion}
					onChange={handleInputChange}
					variant="outlined"
				/>
			</div>
			<h2 className="mt-16 mb-16">{superRol ? 'Todos los Permisos y Privilegios' : 'Permisos'}</h2>
			{!superRol && <PermisosTable />}
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
RolesEditForm.propTypes = {
	formValues: PropTypes.object.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default RolesEditForm;
