/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconButton, Table, TableBody, TableCell, TableRow, Tooltip } from '@material-ui/core';
import _ from 'lodash';
import SubModulosTableHead from './SubModulosTableHead';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { startRemoveSubmodulo } from 'redux/actions/submodulos';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Sub Módulos Table //
/*******************************************************************************************************/
const SubModulosTable = props => {
	// Obtenemos las propiedades del componente
	const { setFase, setForm, setRow } = props;

	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Obtenemos los submódulos del módulo
	const submodulos = useSelector(state => state.submodulos);

	// Función para editar un submódulo y almacenarlo en redux
	const handleEditSubMod = row => {
		setFase('edit');
		setForm(row);
		setRow(row);
	};

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
					{_.orderBy(_.orderBy(submodulos, [{ orden: Number }], ['asc']), ['orden'], ['asc']).map(row => {
						return (
							<TableRow className="h-32" hover tabIndex={-1} key={row._id}>
								<TableCell className="py-2" component="th" scope="row" align="center">
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
								<TableCell className="py-2" component="th" scope="row" align="center">
									{row.estado ? (
										<Icon className="text-green text-20">check_circle</Icon>
									) : (
										<Icon className="text-red text-20">cancel</Icon>
									)}
								</TableCell>
								<TableCell className="py-2" component="th" scope="row" align="center" width={140}>
									<Tooltip title="Editar" placement="bottom-start" enterDelay={100}>
										<IconButton
											color="primary"
											aria-label="editar"
											onClick={() => handleEditSubMod(row)}
										>
											<EditIcon />
										</IconButton>
									</Tooltip>
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
