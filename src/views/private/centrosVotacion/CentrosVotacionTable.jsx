/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Tooltip,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Scrollbars from 'components/core/Scrollbars';
import CentrosVotacionTableHead from './CentrosVotacionTableHead';
import clsx from 'clsx';
import _ from 'lodash';
import { fetchData } from 'services/fetch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ProgressLinear from 'components/core/Progress/ProgressLinear';
import { Swal, Toast } from 'configs/settings';
import { validateFetchData } from 'helpers/validateFetchData';
import { startGetAccionesModulo } from 'redux/actions/auth';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	red: {
		color: red[500]
	}
}));

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación Table //
/*******************************************************************************************************/
const CentrosVotacionTable = props => {
	// Obtenemos las propiedades del componente
	const { data, setData } = props;

	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Instanciamos los estilos
	const styles = useStyles();

	// Obtenemos el socket de conexión con la Api
	const socket = useSelector(state => state.socketio);

	// Obtenemos el Rol de Usuario
	const { rol } = useSelector(state => state.auth.usuario);

	// Obtenemos el departamento, provincia y distrito por defecto de los centros de votación
	const { departamento, provincia, distrito } = useSelector(state => state.centros_votacion);

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

	// Array de Permisos de Acciones del Módulo
	const [accionesPerm, setAccionesPerm] = useState(null);

	// Efecto para obtener las acciones del módulo
	useEffect(() => {
		dispatch(startGetAccionesModulo('centros-votacion')).then(res => setAccionesPerm(res));
	}, [dispatch]);

	// Efecto para obtener la lista de los centros de votación
	useEffect(() => {
		// Estado inicial de montaje
		let mounted = true;
		// Función para obtener todos los centros de votación
		const getCentrosVotacion = async () => {
			// Iniciamos carga de la tabla
			setLoading(true);
			// Obtenemos la lista de los centros de votación con fetch
			const result = await fetchData(
				`centros-votacion?departamento=${departamento}&provincia=${provincia}&distrito=${distrito}&page=${
					page + 1
				}&pageSize=${rowsPerPage}`,
				{
					isTokenReq: true
				}
			);
			// Si existe un resultado y el status es positivo
			if (result && mounted && result.data.status) {
				// Actualizamos el total de registros de la lista
				setTotalReg(result.data.totalRegistros);
				// Actualizamos la lista en la data local
				setData(result.data.list);
			}
			// Finalizamos carga de la tabla
			setLoading(false);
		};
		// Si existe un socket o cambia y si existe número de página y filas por página
		if (socket && page >= 0 && rowsPerPage >= 1) {
			// Obtenemos los centros de votación
			getCentrosVotacion();
			// Si un centro de votación fue creado
			socket.on('centro-votacion-creado', () => getCentrosVotacion());
			// Si un centro de votación fue actualizado
			socket.on('centro-votacion-actualizado', () => getCentrosVotacion());
			// Si un centro de votación fue eliminado
			socket.on('centro-votacion-eliminado', () => getCentrosVotacion());
			// Si los centros de votación fueron importados de excel
			socket.on('centros-votacion-importados', () => getCentrosVotacion());
		}
		// Limpiamos el montaje
		return () => {
			mounted = false;
		};
	}, [socket, departamento, provincia, distrito, estado, page, rowsPerPage, setData]);

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

	// Función para cambiar el tamaño de registros de una página
	const handleChangeRowsPerPage = evt => {
		// Reiniciamos a la página inicial
		setPage(0);
		// Guardamos el número de registro por página
		setRowsPerPage(evt.target.value);
	};

	// Función para remover una fila de la tabla
	const handleRemoveRow = id => {
		Swal.fire({
			title: '¿Está seguro que quiere eliminar el centro de votación?',
			showConfirmButton: true,
			showDenyButton: true,
			confirmButtonText: `SI`,
			denyButtonText: `NO`
		}).then(async result => {
			if (result.isConfirmed) {
				// Eliminamos la acción
				const result = await fetchData(`centros-votacion/${id}`, { isTokenReq: true }, 'DELETE');
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
					<CentrosVotacionTableHead order={order} onRequestSort={handleRequestSort} superUser={rol.super} />
					{!loading && data && (
						<TableBody>
							{_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
								return (
									<TableRow className="h-32" hover tabIndex={-1} key={row._id}>
										<TableCell className="py-2" component="th" scope="row">
											{index + 1 + page * rowsPerPage}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.ubigeo}
										</TableCell>
										{rol.super && (
											<TableCell className="py-2" component="th" scope="row">
												{row.departamento.nombre}
											</TableCell>
										)}
										<TableCell className="py-2" component="th" scope="row">
											{row.provincia.nombre}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.distrito.nombre}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.nombre}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.mesa}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											<div className="flex flex-row items-center">
												{row.personero_local ? (
													<Typography className="mr-10">
														row.personero_local.nombres row.personero_local.apellidos
													</Typography>
												) : (
													<Typography className={clsx(styles.red, 'mr-10')}>
														--Sin asignar--
													</Typography>
												)}
												<Tooltip
													title={row.personero_local ? 'Cambiar' : 'Añadir'}
													placement="bottom-start"
													enterDelay={100}
												>
													<IconButton color="default" aria-label="editar personero">
														<PersonAddIcon />
													</IconButton>
												</Tooltip>
											</div>
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											<div className="flex flex-row items-center">
												{row.personero_mesa ? (
													<Typography className="mr-10">
														row.personero_mesa.nombres row.personero_mesa.apellidos
													</Typography>
												) : (
													<Typography className={clsx(styles.red, 'mr-10')}>
														--Sin asignar--
													</Typography>
												)}
												<Tooltip
													title={row.personero_mesa ? 'Cambiar' : 'Añadir'}
													placement="bottom-start"
													enterDelay={100}
												>
													<IconButton color="default" aria-label="editar personero">
														<PersonAddIcon />
													</IconButton>
												</Tooltip>
											</div>
										</TableCell>
										<TableCell
											className="py-2"
											component="th"
											scope="row"
											align="center"
											width={140}
											height={48}
										>
											{(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
												<Link to={`/centros-votacion/editar/${row._id}`}>
													<Tooltip title="Editar" placement="bottom-start" enterDelay={100}>
														<IconButton color="primary" aria-label="editar centro votacion">
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
														aria-label="eliminar centro votacion"
														onClick={() => handleRemoveRow(row._id)}
													>
														<DeleteIcon />
													</IconButton>
												</Tooltip>
											)}
										</TableCell>
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
CentrosVotacionTable.propTypes = {
	data: PropTypes.array.isRequired,
	setData: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default CentrosVotacionTable;
