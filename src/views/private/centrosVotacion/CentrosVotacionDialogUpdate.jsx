/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Dialog, DialogActions, DialogContent, Paper, Slide, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SyncIcon from '@material-ui/icons/Sync';
import { Icon as Iconify } from '@iconify/react';
import fileExcel from '@iconify-icons/mdi/file-excel';
import { fetchData } from 'services/fetch';
import clsx from 'clsx';
import { validateFetchData } from 'helpers/validateFetchData';
import { apiBaseUrl } from 'configs/settings';
import { startSetCentrosVotacionProvincia } from 'redux/actions/centrosVotacion';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	paper: {
		backgroundColor: '#FFFBC6'
	},
	downloadTemplate: {
		background: 'rgba(233,62,53,0.2)',
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	excelUpload: {
		background: '#ECECEC',
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	processBtn: {
		animation: '$rotating 3s linear infinite'
	},
	'@keyframes rotating': {
		from: {
			transform: 'rotate(0deg)'
		},
		to: {
			transform: 'rotate(-360deg)'
		}
	}
}));

/*******************************************************************************************************/
// Transición del Modal hacia la dirección de arriba //
/*******************************************************************************************************/
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Importar Excel //
/*******************************************************************************************************/
const CentrosVotacionDialogUpdate = props => {
	// Obtenemos las propiedades del componente
	const { open, setOpen } = props;

	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Instanciamos los estilos
	const styles = useStyles();

	// Datos del archivo excel
	const [file, setFile] = useState({
		size: '',
		type: '',
		name: ''
	});

	// Estado de los botones
	const [disabled, setDisabled] = useState(false);

	// Valor del estado cuando se procesa la información
	const [procesando, setProcesando] = useState(false);

	// Efecto para limpiar el archivo excel adjunto
	useEffect(() => {
		if (open) {
			setFile({
				file: null,
				size: '',
				type: '',
				name: ''
			});
		}
	}, [open]);

	// Función para evitar cerrar el modal ante Escape o presionar el backdrop
	const handleCloseDialog = (event, reason) => {
		if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
			setOpen(false);
		}
	};

	// Función para cerrar el modal
	const handleClose = () => {
		setOpen(false);
	};

	// Función para agregar el archivo excel
	const handleUploadChange = evt => {
		// Obtenemos el archivo
		const file = evt.target.files[0];
		// Si no existe un archivo retornamos
		if (!file) {
			return;
		}
		// Convertimos el tamaño en bytes a MB
		const sizeInMB = (((file.size / (1024 * 1024)) * 100) / 100).toFixed(2);
		// Convertimos a un lector de archivos
		const reader = new FileReader();
		reader.readAsBinaryString(file);
		// Leemos el archivo excel y cargamos
		reader.onload = () => {
			setFile({
				file: file,
				size: sizeInMB,
				type: file.type,
				name: file.name
			});
		};
		// Si hubo un error al leer el archivo excel
		reader.onerror = () => {
			console.log('Error al cargar el excel');
		};
	};

	// Función para procesar el archivo excel
	const handleProcessFile = async () => {
		// Creamos la data como un FormData
		let formData = new FormData();
		formData.append('file', file.file);

		// Iniciamos el proceso
		setProcesando(true);
		// Deshabilitamos los botones
		setDisabled(true);

		// Importamos los centros de votación
		const result = await fetchData(
			'centros-votacion/import-excel',
			{ isTokenReq: true, contentType: 'multipart/form-data' },
			'POST',
			formData
		);
		console.log(result);
		// Validamos el resultado
		if (validateFetchData(result)) {
			setProcesando(false);
			setDisabled(false);
			dispatch(startSetCentrosVotacionProvincia('', ''));
			dispatch(startSetCentrosVotacionProvincia('todos', 'todos'));
			setOpen(false);
		}
	};

	// Renderizamos el componente
	return (
		<Dialog
			fullWidth={true}
			maxWidth="sm"
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={(event, reason) => handleCloseDialog(event, reason)}
			aria-labelledby="attach-excel"
		>
			<DialogContent>
				<div className="grid grid-cols-12 gap-16 mt-16 mb-16">
					<div className="flex flex-col col-span-12 justify-center items-center mb-20">
						<Paper className={clsx(styles.paper, 'mb-20 p-16 text-justify')}>
							<p className="mt-6">
								<b>Primero:</b> Descargue la plantilla de excel.
							</p>
							<p className="mt-6">
								<b>Segundo:</b> Llene la información de la plantilla con los datos de los centros de
								votación y sus mesas.
							</p>
							<p className="mt-6">
								<b>Tercero:</b> Adjunte la plantilla llena y procese la información.
							</p>
						</Paper>
						<div className="flex justify-center flex-wrap">
							<Tooltip title="Descargar Plantilla" aria-label="add" arrow>
								{procesando ? (
									<label
										className={clsx(
											styles.downloadTemplate,
											'flex items-center justify-center relative min-w-128 h-128 rounded-8 ml-8 mr-36 mb-16 overflow-hidden shadow-1'
										)}
									>
										<div className="flex flex-col justify-center items-center px-16">
											<Icon fontSize="large" color="action">
												cloud_download
											</Icon>
											<label className="font-500 mt-20">Descargar Plantilla</label>
										</div>
									</label>
								) : (
									<Link
										className={clsx(
											styles.downloadTemplate,
											'flex items-center justify-center relative min-w-128 h-128 rounded-8 ml-8 mr-36 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
										)}
										to={{ pathname: `${apiBaseUrl}/uploads/centros-votacion/template.xlsx` }}
										target="_blank"
										download
									>
										<div className="flex flex-col justify-center items-center px-16">
											<Icon fontSize="large" color="action">
												cloud_download
											</Icon>
											<label className="font-500 mt-20">Descargar Plantilla</label>
										</div>
									</Link>
								)}
							</Tooltip>
							<Tooltip title="Adjuntar plantilla" aria-label="add" arrow>
								<label
									htmlFor="button-file"
									className={clsx(
										styles.excelUpload,
										'flex items-center justify-center relative min-w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden shadow-1',
										procesando ? '' : 'cursor-pointer hover:shadow-5'
									)}
								>
									<input
										accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
										className="hidden"
										id="button-file"
										type="file"
										name="file"
										onChange={handleUploadChange}
										onClick={event => {
											event.target.value = null;
										}}
										disabled={procesando}
									/>
									{file.size && file.size > 0 ? (
										<div className="flex flex-col justify-center items-center px-16">
											<Iconify className="mb-10" width="48" icon={fileExcel} color="#008000" />
											<label className="font-500 mb-20">
												{file.name} ({file.size} MB)
											</label>
										</div>
									) : (
										<div className="flex flex-col justify-center items-center px-16">
											<Icon fontSize="large" color="action">
												attach_file
											</Icon>
											<label className="font-500 mt-20">Adjuntar plantilla</label>
										</div>
									)}
								</label>
							</Tooltip>
						</div>
					</div>
				</div>
			</DialogContent>
			<DialogActions className="mb-10">
				{file.size && file.size > 0 && (
					<Button
						className="whitespace-no-wrap normal-case"
						variant="contained"
						startIcon={<SyncIcon className={clsx('', procesando && styles.processBtn)} />}
						color="primary"
						onClick={handleProcessFile}
						disabled={disabled}
					>
						{procesando ? 'Procesando' : 'Procesar'}
					</Button>
				)}
				<Button onClick={handleClose} color="primary" disabled={disabled}>
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
CentrosVotacionDialogUpdate.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default CentrosVotacionDialogUpdate;
