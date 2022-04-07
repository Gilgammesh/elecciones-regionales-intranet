/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
const headers = [
	{
		id: 'orden',
		align: 'left',
		disablePadding: false,
		label: 'Orden',
		sort: false
	},
	{
		id: 'modulo',
		align: 'left',
		disablePadding: false,
		label: 'Módulo',
		sort: false
	},
	{
		id: 'descripcion',
		align: 'left',
		disablePadding: false,
		label: 'Descripción',
		sort: false
	},
	{
		id: 'submodulos',
		align: 'center',
		disablePadding: false,
		label: 'SubMódulos',
		sort: false
	},
	{
		id: 'acciones',
		align: 'center',
		disablePadding: false,
		label: 'Acciones',
		sort: false
	},
	{
		id: 'permitir',
		align: 'center',
		disablePadding: false,
		label: 'Permitir',
		sort: false
	}
];

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Permisos Table Head //
/*******************************************************************************************************/
const PermisosTableHead = () => {
	// Renderizamos el componente
	return (
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
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PermisosTableHead;
