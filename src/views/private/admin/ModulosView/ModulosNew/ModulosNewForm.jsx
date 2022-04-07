/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Icon,
	IconButton,
	Input,
	InputBase,
	makeStyles,
	MenuItem,
	Paper,
	TextField,
	Tooltip,
	Typography,
	useTheme
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy';
import { iconsUI } from 'configs/iconsUI';
import { selectContrastMainTheme } from 'configs/themes';
import { normalizar } from 'helpers/texts';
import SubModulosNew from './SubModulosNew';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	inputIcon: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center'
	},
	label: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	},
	input: {
		flex: 1
	},
	iconButton: {
		padding: 10,
		color: '#000'
	},
	divider: {
		height: 28,
		margin: 4
	},
	dialogHead: {
		// backgroundColor: theme.palette.primary.main,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},
	itemIcon: {
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#EAEAEA'
		}
	}
}));

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Módulo Nuevo Formulario //
/*******************************************************************************************************/
const ModulosNewForm = props => {
	// Instanciamos los estilos
	const styles = useStyles();

	// Obtenemos el tema de la app
	const theme = useTheme();

	// Obtenemos el tema de contraste
	const contrastTheme = selectContrastMainTheme(theme);

	// Obtenemos las propiedades del componente
	const { formValues, handleInputChange, setForm } = props;
	const { orden, tag, nombre, descripcion, type, icon, url } = formValues;

	// Estado del modal
	const [open, setOpen] = useState(false);

	// Estado de la lista de iconos
	const [filteredIcons, setFilteredIcons] = useState(iconsUI);

	// Estado inicial de la caja de búsqueda
	const [searchIcon, setSearchIcon] = useState('');

	// Función para abrir el modal
	const handleClickOpen = () => {
		setOpen(true);
	};

	// Función para cerrar el modal
	const handleClose = () => {
		setOpen(false);
	};

	// Función para buscar el icono en la lista y filtrar
	const handleInputSearchIcon = async evt => {
		const { value } = evt.target;
		setSearchIcon(value);
		// Normalizamos el valor
		const value_ = normalizar(value);
		const promises = iconsUI
			.map(ele => ele)
			.filter(ele => {
				return normalizar(ele.ligatures).includes(value_);
			});
		const filter = await Promise.all(promises);
		setFilteredIcons(filter);
	};

	// Función para seleccionar el icono
	const handlePickIcon = icon => {
		setForm({
			...formValues,
			icon
		});
		handleClose();
	};

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full p-16 sm:p-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-6 sm:col-span-1"
					type="number"
					name="orden"
					label="Orden"
					accept="onlyNumber"
					value={orden}
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
					className="col-span-6 sm:col-span-2"
					type="text"
					name="tag"
					label="Tag"
					accept="onlyLetterAndGuion"
					value={tag}
					onChange={handleInputChange}
					variant="outlined"
					inputProps={{
						maxLength: 20
					}}
					required
				/>
				<TextFieldFormsy
					className="col-span-12 sm:col-span-5"
					type="text"
					name="nombre"
					label="Nombre"
					accept="onlyLetterAndSpace"
					value={nombre}
					onChange={handleInputChange}
					variant="outlined"
					inputProps={{
						maxLength: 26
					}}
					required
				/>
				<Paper className={clsx(styles.inputIcon, 'col-span-6 sm:col-span-2')}>
					<Typography className={styles.label}>Icono</Typography>
					<Icon className="text-28" color="action">
						{icon}
					</Icon>
					<InputBase className={styles.input} disabled />
					<Divider className={styles.divider} orientation="vertical" />
					<Tooltip title="Buscar icono" aria-label="buscar">
						<IconButton className={styles.iconButton} aria-label="buscar" onClick={handleClickOpen}>
							<SearchIcon />
						</IconButton>
					</Tooltip>
				</Paper>
				<Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="icons-list">
					<DialogTitle className={styles.dialogHead} id="icons-list">
						<div className="flex flex-1 w-full items-center justify-between">
							<div className="flex items-center">
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									Lista de Iconos
								</Typography>
							</div>
							<div className="flex flex-1 items-center justify-center px-12">
								<ThemeProvider theme={contrastTheme}>
									<Paper
										className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
										elevation={1}
									>
										<Icon color="action">search</Icon>
										<Input
											placeholder="Buscar"
											className="flex flex-1 mx-8"
											disableUnderline
											fullWidth
											value={searchIcon}
											inputProps={{
												'aria-label': 'Buscar icono'
											}}
											onChange={handleInputSearchIcon}
										/>
									</Paper>
								</ThemeProvider>
							</div>
						</div>
					</DialogTitle>
					<DialogContent>
						{filteredIcons.length > 0 ? (
							<div className="flex flex-wrap justify-center">
								{filteredIcons.map(ele => (
									<div
										className="w-200 h-128 p-12 flex flex-col items-center justify-center"
										key={ele.id}
									>
										<Paper
											className={clsx(
												styles.itemIcon,
												'w-160 p-10 flex flex-col items-center justify-center'
											)}
											onClick={() => handlePickIcon(ele.ligatures)}
										>
											<Icon className="text-48" color="action">
												{ele.ligatures}
											</Icon>
											<Typography variant="caption" className="mt-4">
												{ele.ligatures}
											</Typography>
										</Paper>
									</div>
								))}
							</div>
						) : (
							<div className="flex flex-auto items-center justify-center w-full h-full">
								<Typography color="textSecondary" variant="h5">
									No hay resultados!
								</Typography>
							</div>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cerrar
						</Button>
					</DialogActions>
				</Dialog>
				<TextField
					select
					className="col-span-6 sm:col-span-2"
					name="type"
					label="Tipo"
					value={type}
					onChange={handleInputChange}
					variant="outlined"
					required
				>
					<MenuItem value="collapse">Collapse </MenuItem>
					<MenuItem value="item">Item </MenuItem>
				</TextField>
			</div>
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				<TextFieldFormsy
					className="col-span-12"
					name="descripcion"
					label="Descripción"
					multiline
					rows={2}
					value={descripcion}
					onChange={handleInputChange}
					variant="outlined"
				/>
			</div>
			{type === 'item' && (
				<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
					<TextFieldFormsy
						className="col-span-12 sm:col-span-4"
						type="text"
						name="url"
						label="Url"
						value={url}
						onChange={handleInputChange}
						variant="outlined"
					/>
				</div>
			)}
			{type === 'collapse' && <SubModulosNew />}
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ModulosNewForm.propTypes = {
	formValues: PropTypes.object.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ModulosNewForm;
