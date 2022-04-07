/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
	FormControlLabel,
	Icon,
	IconButton,
	InputAdornment,
	makeStyles,
	MenuItem,
	TextField,
	Tooltip
} from '@material-ui/core';
import clsx from 'clsx';
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy';
import IosSwitch from 'components/core/Switches/IosSwitch';
import Animate from 'components/core/Animate';
import { fetchData } from 'services/fetch';
import { Swal } from 'configs/settings';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	imageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	imageClose: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: '#F44336',
		opacity: 0
	},
	imageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:focus': {
			outline: 'none'
		},
		'&:hover': {
			'& $imageClose': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $imageClose': {
				opacity: 1
			},
			'&:hover $imageClose': {
				opacity: 1
			}
		}
	}
}));

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Usuarios Editar Formulario //
/*******************************************************************************************************/
const UsuariosEditForm = props => {
	// Obtenemos el id del usuario de los parámetros de la ruta
	const { id } = useParams();

	// Instanciamos los estilos
	const styles = useStyles();

	// Obtenemos las propiedades del componente
	const { setFileState, formValues, handleInputChange, setForm } = props;
	const { nombres, apellido_paterno, apellido_materno, email, dni, genero, password, rol, estado } = formValues;

	// Estado inicial para mostrar la contraseña
	const [showPassword, setShowPassword] = useState(false);

	// Estado inicial de los roles
	const [roles, setRoles] = useState([]);

	// Estado inicial de la imagen
	const [image, setImage] = useState({
		url: '',
		type: ''
	});

	// Efecto para obtener los roles de usuario
	useEffect(() => {
		// Estado inicial de montaje
		let mounted = true;
		// Función para obtener la lista de roles
		const getRoles = async () => {
			// Obtenemos los roles con fetch
			const result = await fetchData('admin/roles?page=1&pageSize=500', { isTokenReq: true });
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Recorremos la lista de roles
				const promises = result.data.list.map(ele => {
					// Retornamos el elemento construido
					return (
						<MenuItem key={ele._id} value={ele._id}>
							{ele.nombre}
						</MenuItem>
					);
				});
				const listRoles = await Promise.all(promises);
				// Establecemos los roles
				setRoles(listRoles);
			}
		};
		// Obtenemos los roles
		getRoles();
		// Limpiamos el montaje
		return () => {
			mounted = false;
		};
	}, []);

	// Efecto para obtener los datos del usuario con el id
	useEffect(() => {
		// Estado inicial de montaje
		let mounted = true;
		// Función para obtener los datos de un usuario
		const getUsuario = async () => {
			// Obtenemos los datos de un usuario con fetch
			const result = await fetchData(`admin/usuarios/${id}`, { isTokenReq: true });
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Obtenemos el usuario
				const { usuario } = result.data;
				// Si tiene un archivo de imagen
				if (usuario.img) {
					setImage({
						url: usuario.img,
						type: ''
					});
				}
				// Guardamos los datos del formulario
				setForm({
					nombres: usuario.nombres,
					apellido_paterno: usuario.apellido_paterno,
					apellido_materno: usuario.apellido_materno,
					email: usuario.email,
					dni: usuario.dni,
					password: null,
					genero: usuario.genero,
					rol: usuario.rol._id,
					estado: usuario.estado,
					file: null
				});
			}
		};
		// Si existe un id y el array de roles es mayor que cero
		if (id && roles.length > 0) {
			// Obtenemos los datos del usuario
			getUsuario();
		}
		return () => {
			mounted = false;
		};
	}, [id, roles, setForm]);

	// Función para agregar la imagen del usuario a la vista
	const handleUploadChange = evt => {
		// Obtenemos el archivo
		const file = evt.target.files[0];

		// Si no existe un archivo retornamos
		if (!file) {
			return;
		}

		// Convertimos el tamaño en bytes a MB
		const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
		// Si el tamaño de la imagen es más de 2MB avisamos y retornamos
		if (sizeInMB > 2) {
			Swal.fire({
				title: 'La imagen o foto no puede tener mas de 2MB',
				icon: 'error'
			});
			return;
		}

		// Convertimos a un lector de archivos
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		// Leemos la imagen y cargamos
		reader.onload = () => {
			// Guardamos los datos de la imagen
			setImage({
				url: `data:${file.type};base64,${btoa(reader.result)}`,
				type: file.type
			});
			// Guardamos el archivo de imagen en el formulario
			setForm({
				...formValues,
				file
			});
			// Guardamos el estado del archivo de la imagen
			setFileState('added');
		};

		// Si hubo un error al leer la imagen
		reader.onerror = () => {
			console.log('Error al cargar la imagen');
		};
	};

	// Función para remover la imagen del usuario de la vista
	const handleRemoveImage = evt => {
		// Limpiamos los datos de la imagen
		setImage({
			url: '',
			type: ''
		});
		// Limipamos la imagen del formulario
		setForm({
			...formValues,
			file: null
		});
		// Guardamos el estado del archivo de la imagen
		setFileState('removed');
	};

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full p-16 sm:p-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12 sm:col-span-4"
					type="text"
					name="nombres"
					label="Nombres"
					accept="onlyLetterAndSpace"
					value={nombres}
					onChange={handleInputChange}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-4"
					type="text"
					name="apellido_paterno"
					label="Apellido Paterno"
					accept="onlyLetterAndSpace"
					value={apellido_paterno}
					onChange={handleInputChange}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-4"
					type="text"
					name="apellido_materno"
					label="Apellido Materno"
					accept="onlyLetterAndSpace"
					value={apellido_materno}
					onChange={handleInputChange}
					variant="outlined"
					required
				/>
			</div>
			<div className="grid grid-cols-12 gap-16 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12 sm:col-span-4"
					type="text"
					name="email"
					label="Correo Electrónico"
					value={email}
					onChange={handleInputChange}
					validations="isEmail"
					validationError="No es un correo válido"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-4"
					type="text"
					name="dni"
					label="DNI"
					accept="onlyNumber"
					value={dni}
					onChange={handleInputChange}
					validations={{
						minLength: 8,
						maxLength: 8
					}}
					validationErrors={{
						minLength: 'El dni debe tener 08 dígitos',
						maxLength: 'El dni debe tener 08 dígitos'
					}}
					inputProps={{
						maxLength: 8
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									contact_mail
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-4"
					type="text"
					name="password"
					label="Contraseña"
					value={password}
					onChange={handleInputChange}
					validations={{
						minLength: 6
					}}
					validationErrors={{
						minLength: 'La contraseña debe tener mínimo 06 dígitos'
					}}
					InputProps={{
						className: 'pr-2',
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									<Icon className="text-20" color="action">
										{showPassword ? 'visibility' : 'visibility_off'}
									</Icon>
								</IconButton>
							</InputAdornment>
						)
					}}
					variant="outlined"
				/>
			</div>
			<div className="grid grid-cols-12 gap-16 mt-16 mb-16">
				<div className="flex flex-col col-span-12 sm:col-span-4">
					<label className="ml-6">Imagen</label>
					<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
						<Tooltip title="Añadir imagen" aria-label="add" arrow>
							<label
								htmlFor="button-file"
								className={clsx(
									styles.imageUpload,
									'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
								)}
							>
								<input
									accept="image/*"
									className="hidden"
									id="button-file"
									type="file"
									name="img"
									onChange={handleUploadChange}
								/>
								<Icon fontSize="large" color="action">
									add_a_photo
								</Icon>
							</label>
						</Tooltip>
						{image.url && (
							<Animate delay={100}>
								<div
									role="button"
									tabIndex={0}
									className={clsx(
										styles.imageItem,
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
									)}
								>
									<Icon className={styles.imageClose} onClick={handleRemoveImage}>
										cancel
									</Icon>
									<img className="max-w-none w-auto h-full" src={image.url} alt="foto usuario" />
								</div>
							</Animate>
						)}
					</div>
				</div>
				<div className="flex flex-col col-span-12 sm:col-span-8">
					<div className="grid grid-cols-12 gap-16 mb-16">
						{genero && (
							<TextField
								select
								className="col-span-12 sm:col-span-6"
								name="genero"
								label="Género"
								value={genero}
								onChange={handleInputChange}
								variant="outlined"
								required
							>
								<MenuItem value="M">Masculino </MenuItem>
								<MenuItem value="F">Femenino </MenuItem>
							</TextField>
						)}
						{rol && roles?.length > 0 && (
							<TextField
								select
								className="col-span-12 sm:col-span-6"
								name="rol"
								label="Rol"
								value={rol}
								onChange={handleInputChange}
								variant="outlined"
								required
							>
								{roles}
							</TextField>
						)}
					</div>
					<div className="grid grid-cols-12 gap-16 mt-16">
						<FormControlLabel
							className="ml-0 mr-0 col-span-12 sm:col-span-3"
							control={<IosSwitch name="estado" checked={estado} onChange={handleInputChange} />}
							label={estado ? 'Activado' : 'Desactivado'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
UsuariosEditForm.propTypes = {
	setFileState: PropTypes.func.isRequired,
	formValues: PropTypes.object.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default UsuariosEditForm;