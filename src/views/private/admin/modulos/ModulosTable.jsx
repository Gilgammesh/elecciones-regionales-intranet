/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Tooltip } from '@material-ui/core';
import Scrollbars from 'components/core/Scrollbars';
import ModulosTableHead from './ModulosTableHead';
import _ from 'lodash';
import { fetchData } from 'services/fetch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ProgressLinear from 'components/core/Progress/ProgressLinear';
import { Swal, Toast } from 'configs/settings';
import { validateFetchData } from 'helpers/validateFetchData';
import { startGetAccionesSubModulo } from 'redux/actions/auth';
import DialogSubModulos from './DialogSubModulos';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Módulos Table //
/*******************************************************************************************************/
const ModulosTable = props => {
	// Obtenemos las propiedades del componente
	const { setList, data, setData } = props;

	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Obtenemos el socket de conexión con la Api
	const socket = useSelector(state => state.socketio);

	// Obtenemos el Rol de Usuario
	const { rol } = useSelector(state => state.auth.usuario);

	// Estado para definir el número de página de la tabla
	const [page, setPage] = useState(0);
	// Estado para definir el número de filas por página
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// Total de registros de la tablas
	const [totalReg, setTotalReg] = useState(0);

	// Estado inicial del ordenamiento de una columna
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	// Estado de carga de la tabla
	const [loading, setLoading] = useState(true);

	// Estado de cambio de la data
	const [estado, setEstado] = useState('');

	// Valor del módulo seleccionado
	const [selectMod, setSelectMod] = useState({});

	// Estado del Modal de SubMódulos del Módulo
	const [openSubMod, setOpenSubMod] = useState(false);

	// Array de Permisos de Acciones del SubMódulo
	const [accionesPerm, setAccionesPerm] = useState(null);

	// Efecto para obtener las acciones del submódulo
	useEffect(() => {
		dispatch(startGetAccionesSubModulo('admin', 'modulos')).then(res => setAccionesPerm(res));
	}, [dispatch]);

	// Efecto para obtener la lista de los Módulos
	useEffect(() => {
		// Estado inicial de montaje
		let mounted = true;
		// Función para obtener todos los módulos
		const getModulos = async () => {
			// Iniciamos carga de la tablas
			setLoading(true);
			// Obtenemos la lista de los módulos con fetch
			const result = await fetchData(`admin/modulos?page=${page + 1}&pageSize=${rowsPerPage}`, {
				isTokenReq: true
			});
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Actualizamos el total de registros de la lista
				setTotalReg(result.data.totalRegistros);
				// Actualizamos la lista en la data local
				setList(result.data.list);
				setData(result.data.list);
			}
			// Finalizamos carga de la tabla
			setLoading(false);
		};
		// Si existe un socket o cambia y si existe número de página y filas por página
		if (socket && page >= 0 && rowsPerPage >= 1) {
			// Obtenemos los módulos
			getModulos();
			// Si un módulo fue creado
			socket.on('admin-modulo-creado', () => getModulos());
			// Si un módulo fue actualizado
			socket.on('admin-modulo-actualizado', () => getModulos());
			// Si un módulon fue eliminado
			socket.on('admin-modulo-eliminado', () => getModulos());
		}
		// Limpiamos el montaje
		return () => {
			mounted = false;
		};
	}, [socket, estado, page, rowsPerPage, setList, setData]);

	// Función para abrir el Modal de SubMódulos
	const handleOpenSubMod = row => {
		// Establecemos el módulo seleccionado
		setSelectMod(row);
		setOpenSubMod(true);
	};

	// Función para ordenar una columna
	const handleRequestSort = (event, property) => {
		const id = property;
		let direction = 'desc';
		// Si la direccón es desc cambiamos
		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}
		// Establecemos el estado de la columna ordenada
		setOrder({
			direction,
			id
		});
	};

	// Función para cambiar la página de la tabla
	const handleChangePage = (event, value) => {
		// Guardamos el número de página
		setPage(value);
	};

	// Función para cambiar el número de fila de una página
	const handleChangeRowsPerPage = evt => {
		// Reiniciamos a la página inicial
		setPage(0);
		// Guardamos el número de registro por página
		setRowsPerPage(evt.target.value);
	};

	// Función para remover una fila de la tabla
	const handleRemoveRow = id => {
		Swal.fire({
			title: '¿Está seguro que quiere eliminar el módulo?',
			showConfirmButton: true,
			showDenyButton: true,
			confirmButtonText: `SI`,
			denyButtonText: `NO`
		}).then(async result => {
			if (result.isConfirmed) {
				// Eliminamos el módulo
				const result = await fetchData(`admin/modulos/${id}`, { isTokenReq: true }, 'DELETE');
				// Validamos el resultado
				if (validateFetchData(result)) {
					// Cambiamos el estado de cambio de la data
					setEstado(`${new Date()}`);
					// Avisamos con un toast alert
					Toast.fire({
						icon: 'success',
						title: result.data.msg
					});
				}
			}
		});
	};

	// Renderizamos el componente
	return (
		<div className="w-full flex flex-col">
			<Scrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<ModulosTableHead order={order} onRequestSort={handleRequestSort} />
					{!loading && data && (
						<TableBody>
							{_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
								return (
									<TableRow className="h-32" hover tabIndex={-1} key={row._id}>
										<TableCell className="py-2" component="th" scope="row">
											{index + 1 + page * rowsPerPage}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.tag}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.nombre}
										</TableCell>
										<TableCell className="py-2 pr-44" component="th" scope="row" align="center">
											{row.orden}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.url}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row" align="justify">
											{row.descripcion}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row" align="center">
											<Icon style={{ color: '#333' }}>{row.icon}</Icon>
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.type}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row" align="center">
											{row.type === 'collapse' && (
												<IconButton
													style={{ color: '#F44343' }}
													aria-label="submodulos"
													onClick={() => handleOpenSubMod(row)}
												>
													<FormatListBulletedIcon />
												</IconButton>
											)}
										</TableCell>
										<TableCell className="py-2 pr-40" component="th" scope="row" align="center">
											{row.estado ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
												<Icon className="text-red text-20">cancel</Icon>
											)}
										</TableCell>
										{row.tag === 'admin' || row.tag === 'monitor' ? (
											rol.super ? (
												<TableCell
													className="py-2"
													component="th"
													scope="row"
													align="center"
													width={140}
													height={48}
												>
													{(rol.super ||
														(accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
														<Link to={`/admin/modulos/editar/${row._id}`}>
															<Tooltip
																title="Editar"
																placement="bottom-start"
																enterDelay={100}
															>
																<IconButton color="primary" aria-label="editar modulo">
																	<EditIcon />
																</IconButton>
															</Tooltip>
														</Link>
													)}
													{(rol.super ||
														(accionesPerm && accionesPerm.indexOf('eliminar') !== -1)) && (
														<Tooltip
															title="Eliminar"
															placement="bottom-start"
															enterDelay={100}
														>
															<IconButton
																style={{ color: '#F44343' }}
																aria-label="eliminar modulo"
																onClick={() => handleRemoveRow(row._id)}
															>
																<DeleteIcon />
															</IconButton>
														</Tooltip>
													)}
												</TableCell>
											) : (
												<TableCell
													className="py-2"
													component="th"
													scope="row"
													align="center"
													width={140}
													height={48}
												/>
											)
										) : (
											<TableCell
												className="py-2"
												component="th"
												scope="row"
												align="center"
												width={140}
												height={48}
											>
												{(rol.super ||
													(accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
													<Link to={`/admin/modulos/editar/${row._id}`}>
														<Tooltip
															title="Editar"
															placement="bottom-start"
															enterDelay={100}
														>
															<IconButton color="primary" aria-label="editar modulo">
																<EditIcon />
															</IconButton>
														</Tooltip>
													</Link>
												)}
												{(rol.super ||
													(accionesPerm && accionesPerm.indexOf('eliminar') !== -1)) && (
													<Tooltip title="Eliminar" placement="bottom-start" enterDelay={100}>
														<IconButton
															style={{ color: '#F44343' }}
															aria-label="eliminar modulo"
															onClick={() => handleRemoveRow(row._id)}
														>
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												)}
											</TableCell>
										)}
									</TableRow>
								);
							})}
						</TableBody>
					)}
				</Table>
				{loading && (
					<div className="px-20 py-52">
						<ProgressLinear />
					</div>
				)}
				{!_.isEmpty(selectMod) && (
					<DialogSubModulos open={openSubMod} setOpen={setOpenSubMod} selectMod={selectMod} />
				)}
			</Scrollbars>

			{data && (
				<TablePagination
					className="overflow-hidden flex-shrink-0"
					component="div"
					count={totalReg}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ModulosTable.propTypes = {
	setList: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
	setData: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ModulosTable;
