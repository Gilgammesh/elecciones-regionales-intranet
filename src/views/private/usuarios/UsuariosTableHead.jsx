/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
let headers = [
	{
		id: 'id',
		align: 'left',
		disablePadding: false,
		label: '#',
		sort: false
	},
	{
		id: 'imagen',
		align: 'left',
		disablePadding: false,
		label: 'Imagen',
		sort: false
	},
	{
		id: 'nombres',
		align: 'left',
		disablePadding: false,
		label: 'Nombres',
		sort: true
	},
	{
		id: 'apellidos',
		align: 'left',
		disablePadding: false,
		label: 'Apellidos',
		sort: true
	},
	{
		id: 'dni',
		align: 'left',
		disablePadding: false,
		label: 'DNI',
		sort: false
	},
	{
		id: 'celular',
		align: 'left',
		disablePadding: false,
		label: 'Celular',
		sort: false
	},
	{
		id: 'email',
		align: 'left',
		disablePadding: false,
		label: 'Correo',
		sort: false
	},
	{
		id: 'rol',
		align: 'left',
		disablePadding: false,
		label: 'Tipo Usuario',
		sort: false
	},
	{
		id: 'departamento',
		align: 'left',
		disablePadding: false,
		label: 'Departamento',
		sort: false
	},
	{
		id: 'estado',
		align: 'center',
		disablePadding: false,
		label: 'Activo',
		sort: true
	},
	{
		id: 'botones',
		align: 'center',
		disablePadding: false,
		label: '',
		sort: false
	}
];

/*******************************************************************************************************/
// Definimos la Vista del componente Usuarios Table Head //
/*******************************************************************************************************/
const UsuariosTableHead = props => {
	// Obtenemos las propiedades del componente
	const { order, onRequestSort, superUser } = props;

	// Función para crear un ordenamiento de la columna
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};
	// Renderizamos el componente
	return (
		<TableHead>
			<TableRow className="h-64">
				{headers
					.filter(ele => {
						// Si es un superusuario moostramos todo
						if (superUser) {
							return ele;
						}
						// Caso contrario excluimos el departamento
						else {
							return ele.id !== 'departamento';
						}
					})
					.map(col => {
						return (
							<TableCell
								key={col.id}
								align={col.align}
								padding={col.disablePadding ? 'none' : 'normal'}
								className="font-extrabold"
								sortDirection={order.id === col.id ? order.direction : false}
							>
								{col.sort ? (
									<Tooltip
										title="Ordenar"
										placement={col.align === 'right' ? 'bottom-end' : 'bottom-start'}
										enterDelay={300}
									>
										<TableSortLabel
											active={order.id === col.id}
											direction={order.direction}
											onClick={createSortHandler(col.id)}
										>
											{col.label}
										</TableSortLabel>
									</Tooltip>
								) : (
									col.label
								)}
							</TableCell>
						);
					}, this)}
			</TableRow>
		</TableHead>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
UsuariosTableHead.propTypes = {
	order: PropTypes.object.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	superUser: PropTypes.bool.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default UsuariosTableHead;
