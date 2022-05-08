/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { TextField, MenuItem } from '@material-ui/core';
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy';
import { fetchData } from 'services/fetch';
import clsx from 'clsx';

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Nuevo Formulario //
/*******************************************************************************************************/
const CentrosVotacionNewForm = props => {
	// Obtenemos las propiedades del componente
	const { formValues, handleInputChange } = props;
	const { departamento, provincia, distrito, nombre, mesa, votantes } = formValues;

	// Obtenemos los datos del usuario logueado
	const usuario = useSelector(state => state.auth.usuario);

	// Estado inicial de los departamentos
	const [departamentos, setDepartamentos] = useState([]);
	// Estado inicial de las provincias
	const [provincias, setProvincias] = useState([]);
	// Estado inicial de los distritos
	const [distritos, setDistritos] = useState([]);

	// Efecto para obtener los departamentos
	useEffect(() => {
		// Inicializamos el montaje
		let mounted = true;
		// Función para obtener la lista de departamentos
		const getDepartamentos = async () => {
			// Obtenemos los roles con fetch
			const result = await fetchData('ubigeo/departamentos?page=1&pageSize=100', { isTokenReq: true });
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Recorremos la lista de departamentos
				const promises = result.data.list.map(ele => {
					return (
						<MenuItem key={ele._id} value={ele.codigo}>
							{ele.nombre}
						</MenuItem>
					);
				});
				const listDepartamentos = await Promise.all(promises);
				// Establecemos los departamentos
				setDepartamentos(listDepartamentos);
			}
		};
		// Función para obtener las provincias
		const getProvincias = async dpto => {
			// Obtenemos las provincias con fetch
			const result = await fetchData(`ubigeo/provincias?departamento=${dpto}&page=1&pageSize=100`, {
				isTokenReq: true
			});
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Recorremos la lista de provincias
				const promises = result.data.list.map(ele => {
					return (
						<MenuItem key={ele._id} value={ele.codigo}>
							{ele.nombre}
						</MenuItem>
					);
				});
				const listProvincias = await Promise.all(promises);
				// Establecemos las provincias
				setProvincias(listProvincias);
			}
		};
		// Función para obtener los distritos
		const getDistritos = async (dpto, prov) => {
			// Obtenemos los distritos con fetch
			const result = await fetchData(
				`ubigeo/distritos?departamento=${dpto}&provincia=${prov}&page=1&pageSize=100`,
				{
					isTokenReq: true
				}
			);
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Recorremos la lista de distritos
				const promises = result.data.list.map(ele => {
					return (
						<MenuItem key={ele._id} value={ele.codigo}>
							{ele.nombre}
						</MenuItem>
					);
				});
				const listDistritos = await Promise.all(promises);
				// Establecemos los distritos
				setDistritos(listDistritos);
			}
		};
		// Si es un super usuario
		if (usuario.rol.super) {
			// Obtenemos la lista de departamentos
			getDepartamentos();
			// Si existe un departamento
			if (departamento && departamento !== '') {
				// Obtenemos la lista de provincias con el departamento
				getProvincias(departamento);
				if (provincia && provincia !== '') {
					// Obtenemos la lista de distritos con el departamento y la provincia
					getDistritos(departamento, provincia);
				}
			}
		} else {
			// Obtenemos la lista de provincias con el departamento del usuario logueado
			getProvincias(usuario.departamento.codigo);
			if (provincia && provincia !== '') {
				// Obtenemos la lista de distritos con el departamento y la provincia
				getDistritos(usuario.departamento.codigo, provincia);
			}
		}
		return () => {
			// Limpiamos el montaje
			mounted = false;
		};
	}, [usuario, departamento, provincia]);

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full p-16 sm:p-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				{usuario.rol.super && departamentos && (
					<TextField
						select
						className="col-span-12 sm:col-span-4"
						name="departamento"
						label="Departamento"
						value={departamento}
						onChange={handleInputChange}
						variant="outlined"
						required
					>
						{departamentos}
					</TextField>
				)}
				{provincias && (
					<TextField
						select
						className={clsx('col-span-12', usuario.rol.super ? 'sm:col-span-4' : 'sm:col-span-6')}
						name="provincia"
						label="Provincia"
						value={provincia}
						onChange={handleInputChange}
						variant="outlined"
						required
					>
						{provincias}
					</TextField>
				)}
				{distritos && (
					<TextField
						select
						className={clsx('col-span-12', usuario.rol.super ? 'sm:col-span-4' : 'sm:col-span-6')}
						name="distrito"
						label="Distrito"
						value={distrito}
						onChange={handleInputChange}
						variant="outlined"
						required
					>
						{distritos}
					</TextField>
				)}
			</div>
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12 sm:col-span-7"
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
					accept="onlyNumber"
					value={mesa}
					onChange={handleInputChange}
					variant="outlined"
					validations={{
						minLength: 6,
						maxLength: 6
					}}
					validationErrors={{
						minLength: 'La mesa debe tener 06 dígitos',
						maxLength: 'La mesa debe tener 06 dígitos'
					}}
					inputProps={{
						maxLength: 6
					}}
					required
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-2"
					type="number"
					name="votantes"
					label="Votantes"
					accept="onlyNumber"
					value={votantes}
					onChange={handleInputChange}
					variant="outlined"
					inputProps={{
						min: 1
					}}
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
