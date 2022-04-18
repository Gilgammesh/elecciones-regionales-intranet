/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Table, TableBody, TableCell, TableRow, Tooltip } from '@material-ui/core';
import _ from 'lodash';
import SubModulosTableHead from './SubModulosTableHead';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { startRemoveSubmodulo } from 'redux/actions/submodulos';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Sub Módulos Table //
/*******************************************************************************************************/
const SubModulosTable = () => {
	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Obtenemos los submódulos del módulo
	const submodulos = useSelector(state => state.submodulos);

	// Función para remover un submódulo a la lista y almacenarla en redux
	const handleRemoveSubMod = orden => {
		dispatch(startRemoveSubmodulo(submodulos, orden));
	};

	// Renderizamos el componente
	return (
		<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
			<SubModulosTableHead />
			{submodulos && (
				<TableBody>
					{_.orderBy(submodulos, [{ orden: Number }], ['asc']).map(row => {
						return (
							<TableRow className="h-32" hover tabIndex={-1} key={row.orden}>
								<TableCell className="py-2 pr-44" component="th" scope="row" align="center">
									{row.orden}
								</TableCell>
								<TableCell className="py-2" component="th" scope="row">
									{row.tag}
								</TableCell>
								<TableCell className="py-2" component="th" scope="row">
									{row.nombre}
								</TableCell>
								<TableCell className="py-2" component="th" scope="row" align="justify">
									{row.descripcion}
								</TableCell>
								<TableCell className="py-2" component="th" scope="row">
									{row.url}
								</TableCell>
								<TableCell className="py-2" component="th" scope="row" align="center" width={140}>
									<Tooltip title="Quitar" placement="bottom-start" enterDelay={100}>
										<IconButton
											style={{ color: '#F44343' }}
											aria-label="remover"
											onClick={() => handleRemoveSubMod(row.orden)}
										>
											<RemoveCircleIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			)}
		</Table>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default SubModulosTable;
