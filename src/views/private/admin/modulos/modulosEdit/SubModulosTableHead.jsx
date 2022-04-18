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
		align: 'center',
		disablePadding: false,
		label: 'Orden',
		sort: false
	},
	{
		id: 'tag',
		align: 'left',
		disablePadding: false,
		label: 'Tag',
		sort: false
	},
	{
		id: 'nombre',
		align: 'left',
		disablePadding: false,
		label: 'Nombre',
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
		id: 'url',
		align: 'left',
		disablePadding: false,
		label: 'Url',
		sort: false
	},
	{
		id: 'activo',
		align: 'center',
		disablePadding: false,
		label: 'Activo',
		sort: false
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
// Definimos la Vista del componente Admin - Sub Módulos Table Head //
/*******************************************************************************************************/
const SubModulosTableHead = () => {
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
export default SubModulosTableHead;
