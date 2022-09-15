/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Scrollbars from 'components/core/Scrollbars'
import MesasTableHead from './MesasTableHead'
import clsx from 'clsx'
import _ from 'lodash'
import { fetchData } from 'services/fetch'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import CancelIcon from '@material-ui/icons/Cancel'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { Swal, Toast } from 'configs/settings'
import { validateFetchData } from 'helpers/validateFetchData'
import { startGetAccionesSubModulo } from 'redux/actions/auth'
import { startSetMesasChange } from 'redux/actions/mesas'
import DialogPersoneros from './DialogPersoneros'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  red: {
    color: red[500]
  }
}))

/*******************************************************************************************************/
// Tipos del Componente //
/*******************************************************************************************************/
const TiposPersonero = {
  MESA: 'mesa',
  LOCAL: 'local'
}
const ActionsPersonero = {
  ADD: 'add',
  CHANGE: 'change',
  REMOVE: 'remove'
}

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas Table //
/*******************************************************************************************************/
const MesasTable = props => {
  // Obtenemos las propiedades del componente
  const { data, setData, page, setPage, rowsPerPage, setRowsPerPage, resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Instanciamos los estilos
  const styles = useStyles()

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de las mesas de votación
  const { search, assign, departamento, provincia, distrito, change } = useSelector(state => state.mesas)

  // Total de registros de la tablas
  const [totalReg, setTotalReg] = useState(0)

  // Estado inicial del ordenamiento de una columna
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  })

  // Estado de carga de la tabla
  const [loading, setLoading] = useState(true)

  // Estado del Modal de Personeros disponibles
  const [openPers, setOpenPers] = useState(false)
  // Valor de la mesa seleccionada
  const [selectedMesa, setSelectedMesa] = useState({})
  // Valor del tipo de personero seleccionado
  const [tipoPers, setTipoPers] = useState(null)
  // Valor de la acción para el personero seleccionado
  const [actionPers, setActionPers] = useState(null)

  // Array de Permisos de Acciones del SubMódulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del submódulo
  useEffect(() => {
    dispatch(startGetAccionesSubModulo('centros-votacion', 'mesas')).then(res => setAccionesPerm(res))
  }, [dispatch])

  // Efecto para obtener la lista de las mesas de votación
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todos las mesas de votación
    const getMesas = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de las mesas de votación con fetch
      let url = `centros-votacion/mesas?page=${page + 1}&pageSize=${rowsPerPage}`
      // Agregamos los parámetros
      url += `&searchTipo=${search.tipo}&searchValue=${search.value}`
      url += `&assign=${assign}`
      url += `&departamento=${departamento}`
      url += `&provincia=${provincia}`
      url += `&distrito=${distrito}`
      const result = await fetchData(url, { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Actualizamos el total de registros de la lista
        setTotalReg(result.data.totalRegistros)
        // Actualizamos la lista en la data local
        setData(result.data.list)
      }
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Si existe número de página y filas por página
    if (page >= 0 && rowsPerPage >= 1) {
      // Obtenemos las mesas de votación
      getMesas()
      // Si existe un socket
      if (socket) {
        // Si una mesa de votación fue creada
        socket.on('centros-votacion-mesa-creada', () => getMesas())
        // Si una mesa de votación fue actualizada
        socket.on('centros-votacion-mesa-actualizada', () => getMesas())
        // Si una mesa de votación fue eliminada
        socket.on('centros-votacion-mesa-eliminada', () => getMesas())
        // Si las mesas de votación fueron importadas de excel
        socket.on('centros-votacion-mesas-importadas', () => getMesas())
      }
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [socket, search, assign, departamento, provincia, distrito, change, page, rowsPerPage, setData])

  // Función para ordenar una columna
  const handleRequestSort = (event, property) => {
    const id = property
    let direction = 'desc'
    // Si la direccón es desc cambiamos
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc'
    }
    // Establecemos el estado de la columna ordenada
    setOrder({
      direction,
      id
    })
  }

  // Función para cambiar la página de la tabla
  const handleChangePage = (event, value) => {
    // Guardamos el número de página
    setPage(value)
  }

  // Función para cambiar el tamaño de registros de una página
  const handleChangeRowsPerPage = evt => {
    // Reiniciamos a la página inicial
    setPage(0)
    // Guardamos el número de registro por página
    setRowsPerPage(evt.target.value)
  }

  // Función para abrir el Modal de Personeros
  const handleOpenPers = (row, tipo, action) => {
    setSelectedMesa(row)
    setTipoPers(tipo)
    setActionPers(action)
    setOpenPers(true)
  }

  // Función para quitar la asignación del personero a la mesa o local de votación
  const handleQuitAssignPerson = async (row, persId, tipo, action) => {
    // Actualizamos la data del personero
    const result = await fetchData(`centros-votacion/mesas/${row._id}`, { isTokenReq: true }, 'PUT', {
      tipoPers: tipo,
      actionPers: action,
      personero: persId,
      mesa: row
    })
    // Validamos el resultado
    if (validateFetchData(result)) {
      // Avisamos cambio en la lista de mesas de votación
      dispatch(startSetMesasChange())
      // Avisamos con un toast alert
      Toast.fire({
        icon: 'success',
        title: `Se quitó la asignación del personero de ${tipo} correctamente`
      })
    }
  }

  // Función para remover una fila de la tabla
  const handleRemoveRow = id => {
    Swal.fire({
      title: '¿Está seguro que quiere eliminar la mesa de votación?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`
    }).then(async result => {
      if (result.isConfirmed) {
        // Eliminamos la acción
        const result = await fetchData(`centros-votacion/mesas/${id}`, { isTokenReq: true }, 'DELETE')
        // Validamos el resultado
        if (validateFetchData(result)) {
          // Avisamos cambio en la lista de mesas de votación
          dispatch(startSetMesasChange())
          // Avisamos con un toast alert
          Toast.fire({
            icon: 'success',
            title: result.data.msg
          })
        }
      }
    })
  }

  // Renderizamos el componente
  return (
    <div className="w-full flex flex-col">
      <Scrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <MesasTableHead order={order} onRequestSort={handleRequestSort} resetPages={resetPages} />
          {!loading && data && (
            <TableBody>
              {_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
                return (
                  <TableRow className="h-32" hover tabIndex={-1} key={row._id}>
                    <TableCell className="py-2" component="th" scope="row">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.mesa}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      <div className="flex flex-row items-center">
                        {row.personero_mesa ? (
                          <Typography className="mr-10">
                            {row.personero_mesa.nombres} {row.personero_mesa.apellidos}
                          </Typography>
                        ) : (
                          <Typography className={clsx(styles.red, 'mr-10')}>--Sin asignar--</Typography>
                        )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                          <Tooltip
                            title={row.personero_mesa ? 'Cambiar' : 'Asignar'}
                            placement="bottom-start"
                            enterDelay={100}
                          >
                            <IconButton
                              color="default"
                              style={{ padding: '6px' }}
                              aria-label="add change personero"
                              onClick={() =>
                                handleOpenPers(
                                  row,
                                  TiposPersonero.MESA,
                                  row.personero_mesa ? ActionsPersonero.CHANGE : ActionsPersonero.ADD
                                )
                              }
                            >
                              <PersonAddIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {row.personero_mesa && (rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                          <Tooltip title="Quitar" placement="bottom-start" enterDelay={100}>
                            <IconButton
                              style={{ padding: '6px', color: '#F44343' }}
                              aria-label="quit personero"
                              onClick={() =>
                                handleQuitAssignPerson(
                                  row,
                                  row.personero_mesa._id,
                                  TiposPersonero.MESA,
                                  ActionsPersonero.REMOVE
                                )
                              }
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.local}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      <div className="flex flex-row items-center">
                        {row.personero_local ? (
                          <Typography className="mr-10">
                            {row.personero_local.nombres} {row.personero_local.apellidos}
                          </Typography>
                        ) : (
                          <Typography className={clsx(styles.red, 'mr-10')}>--Sin asignar--</Typography>
                        )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                          <Tooltip
                            title={row.personero_local ? 'Cambiar' : 'Asignar'}
                            placement="bottom-start"
                            enterDelay={100}
                          >
                            <IconButton
                              color="default"
                              style={{ padding: '6px' }}
                              aria-label="add change personero"
                              onClick={() =>
                                handleOpenPers(
                                  row,
                                  TiposPersonero.LOCAL,
                                  row.personero_local ? ActionsPersonero.CHANGE : ActionsPersonero.ADD
                                )
                              }
                            >
                              <PersonAddIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {row.personero_local && (rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                          <Tooltip title="Quitar" placement="bottom-start" enterDelay={100}>
                            <IconButton
                              style={{ padding: '6px', color: '#F44343' }}
                              aria-label="quit personero"
                              onClick={() =>
                                handleQuitAssignPerson(
                                  row,
                                  row.personero_local._id,
                                  TiposPersonero.LOCAL,
                                  ActionsPersonero.REMOVE
                                )
                              }
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </div>
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
                      {row.ubigeo}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center" width={140} height={48}>
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                        <Link to={`/centros-votacion/mesas/editar/${row._id}`}>
                          <Tooltip title="Editar" placement="bottom-start" enterDelay={100}>
                            <IconButton color="primary" aria-label="editar mesa votacion">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('eliminar') !== -1)) && (
                        <Tooltip title="Eliminar" placement="bottom-start" enterDelay={100}>
                          <IconButton
                            style={{ color: '#F44343' }}
                            aria-label="eliminar mesa votacion"
                            onClick={() => handleRemoveRow(row._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                )
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
      {!_.isEmpty(selectedMesa) && tipoPers && (
        <DialogPersoneros
          open={openPers}
          setOpen={setOpenPers}
          mesa={selectedMesa}
          tipo={tipoPers}
          action={actionPers}
        />
      )}
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MesasTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasTable
