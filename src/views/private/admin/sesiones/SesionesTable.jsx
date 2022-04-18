/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Icon, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core';
import Scrollbars from 'components/core/Scrollbars';
import SesionesTableHead from './SesionesTableHead';
import _ from 'lodash';
import { fetchData } from 'services/fetch';
import ProgressLinear from 'components/core/Progress/ProgressLinear';

/*******************************************************************************************************/
// Definimos la Vista del componente Monitor - Sesiones Table //
/*******************************************************************************************************/
const SesionesTable = props => {
	// Obtenemos las propiedades del componente
	const { setList, data, setData } = props;

	// Obtenemos el socket de conexión con la Api
	const socket = useSelector(state => state.socketio);

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

	// Efecto para obtener la lista de las Sesiones
	useEffect(() => {
		// Estado inicial de montaje
		let mounted = true;
		// Función para obtener todas las sesiones
		const getSesiones = async () => {
			// Iniciamos carga de la tabla
			setLoading(true);
			// Obtenemos la lista de las sesiones con fetch
			const result = await fetchData(`admin/sesiones?page=${page + 1}&pageSize=${rowsPerPage}`, {
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
			// Obtenemos las sesiones
			getSesiones();
			// Si una sesión fue actualizada
			socket.on('monitor-sesion-actualizada', () => {
				getSesiones();
			});
		}
		// Limpiamos el montaje
		return () => {
			mounted = false;
		};
	}, [socket, page, rowsPerPage, setList, setData]);

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

	// Renderizamos el componente
	return (
		<div className="w-full flex flex-col">
			<Scrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<SesionesTableHead order={order} onRequestSort={handleRequestSort} />
					{!loading && data && (
						<TableBody>
							{_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
								return (
									<TableRow className="h-32" hover tabIndex={-1} key={row._id}>
										<TableCell className="py-2" component="th" scope="row">
											{index + 1 + page * rowsPerPage}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{`${row.usuario.apellidos}, ${row.usuario.nombres}`}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.ultimo_ingreso}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.fuente}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.ip}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.dispositivo}
										</TableCell>
										<TableCell className="py-2" component="th" scope="row">
											{row.navegador}
										</TableCell>
										<TableCell
											className="py-6 pr-40"
											component="th"
											scope="row"
											align="center"
											height={48}
										>
											{row.estado === 'online' && (
												<div className="flex flex-row justify-center items-center">
													<Icon className="text-green text-28">person_pin</Icon>
													<Typography className="ml-8 text-green font-500">
														en línea
													</Typography>
												</div>
											)}
											{row.estado === 'busy' && (
												<div className="flex flex-row justify-center items-center">
													<Icon className="text-orange text-28">person_pin</Icon>
													<Typography className="ml-8 text-orange font-500">
														ocupado
													</Typography>
												</div>
											)}
											{row.estado === 'offline' && (
												<div className="flex flex-row justify-center items-center">
													<Icon className="text-red text-28">person_pin</Icon>
													<Typography className="ml-8 text-red font-500">
														desconectado
													</Typography>
												</div>
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
SesionesTable.propTypes = {
	setList: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
	setData: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default SesionesTable;
