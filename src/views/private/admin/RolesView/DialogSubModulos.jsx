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
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';
import AssistantIcon from '@material-ui/icons/Assistant';
import DialogAccionesSubModulo from './DialogAccionesSubModulo';

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
const headers = [
	{
		id: 'id',
		align: 'left',
		disablePadding: false,
		label: 'ID',
		sort: false
	},
	{
		id: 'submodulo',
		align: 'left',
		disablePadding: false,
		label: 'SubMódulo',
		sort: false
	},
	{
		id: 'acciones',
		align: 'center',
		disablePadding: false,
		label: 'Acciones',
		sort: false
	}
];

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Vista Permisos SubMódulos de Módulo //
/*******************************************************************************************************/
const DialogSubModulos = props => {
	// Obtenemos las propiedades del componente
	const { open, setOpen, modulo } = props;

	// Valor del submódulo seleccionado
	const [submodulo, setSubModulo] = useState(null);

	// Estado del Modal de Acciones del SubMódulo
	const [openAccion, setOpenAccion] = useState(false);

	// Función para abrir el Modal de Acciones
	const handleOpenAccion = row => {
		// Establecemos el submódulo seleccionado
		setSubModulo(row);
		setOpenAccion(true);
	};

	// Función para cerrar el modal
	const handleClose = () => {
		setOpen(false);
	};

	// Renderizamos el componente
	return (
		<Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} aria-labelledby="submodulos-list">
			<DialogTitle id="submodulos-list">SubMódulos del Módulo {modulo.modulo}</DialogTitle>
			<DialogContent>
				<div>
					<Table stickyHeader className="min-w-md" aria-labelledby="tableTitle">
						<TableHead>
							<TableRow className="h-64">
								{headers.map(col => {
									return (
										<TableCell
											key={col.id}
											align={col.align}
											padding={col.disablePadding ? 'none' : 'normal'}
											className="font-extrabold"
										>
											{col.label}
										</TableCell>
									);
								}, this)}
							</TableRow>
						</TableHead>
						{modulo.permisos && (
							<TableBody>
								{modulo.permisos.map((row, index) => {
									return (
										<TableRow className="h-32" hover tabIndex={-1} key={row._id}>
											<TableCell className="py-2" component="th" scope="row" align="left">
												{index + 1}
											</TableCell>
											<TableCell className="py-2" component="th" scope="row">
												{row.submodulo}
											</TableCell>
											<TableCell className="py-2" component="th" scope="row" align="center">
												<IconButton
													style={{ color: '#283346' }}
													aria-label="acciones"
													onClick={() => handleOpenAccion(row)}
												>
													<AssistantIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						)}
					</Table>
					{submodulo && (
						<DialogAccionesSubModulo open={openAccion} setOpen={setOpenAccion} submodulo={submodulo} />
					)}
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cerrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
DialogSubModulos.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	modulo: PropTypes.object.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogSubModulos;
