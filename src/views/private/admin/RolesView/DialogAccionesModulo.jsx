/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@material-ui/core';

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
		id: 'nombre',
		align: 'left',
		disablePadding: false,
		label: 'Nombre',
		sort: false
	}
];

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Vista Permisos Acciones de Módulo //
/*******************************************************************************************************/
const DialogAccionesModulo = props => {
	// Obtenemos las propiedades del componente
	const { open, setOpen, modulo } = props;

	// Función para cerrar el modal
	const handleClose = () => {
		setOpen(false);
	};

	// Renderizamos el componente
	return (
		<Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="accionesmod-list">
			<DialogTitle id="accionesmod-list">Acciones del Módulo {modulo.modulo}</DialogTitle>
			<DialogContent>
				<div>
					<Table stickyHeader className="min-w-sm" aria-labelledby="tableTitle">
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
						{modulo.acciones && (
							<TableBody>
								{modulo.acciones.map((row, index) => {
									return (
										<TableRow className="h-32" hover tabIndex={-1} key={index}>
											<TableCell className="py-2" component="th" scope="row" align="left">
												{index + 1}
											</TableCell>
											<TableCell className="py-2" component="th" scope="row">
												{row}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						)}
					</Table>
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
DialogAccionesModulo.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	modulo: PropTypes.object.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogAccionesModulo;
