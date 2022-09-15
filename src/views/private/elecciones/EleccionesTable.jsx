/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Tooltip } from '@material-ui/core'
import Scrollbars from 'components/core/Scrollbars'
import EleccionesTableHead from './EleccionesTableHead'
import _ from 'lodash'
import { fetchData } from 'services/fetch'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import { green } from '@material-ui/core/colors'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { Swal, Toast } from 'configs/settings'
import { validateFetchData } from 'helpers/validateFetchData'
import { startGetAccionesModulo } from 'redux/actions/auth'

/*******************************************************************************************************/
// Definimos la Vista del componente Elecciones Table //
/*******************************************************************************************************/
const EleccionesTable = props => {
  // Obtenemos las propiedades del componente
  const { setList, data, setData } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Estado para definir el número de página de la tabla
  const [page, setPage] = useState(0)
  // Estado para definir el número de filas por página
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // Total de registros de la tablas
  const [totalReg, setTotalReg] = useState(0)

  // Estado inicial del ordenamiento de una columna
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  })

  // Estado de carga de la tabla
  const [loading, setLoading] = useState(true)

  // Array de Permisos de Acciones del Módulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del módulo
  useEffect(() => {
    dispatch(startGetAccionesModulo('elecciones')).then(res => setAccionesPerm(res))
  }, [dispatch])

  // Efecto para obtener la lista de las Elecciones
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todas las elecciones
    const getElecciones = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de las elecciones con fetch
      const result = await fetchData(`elecciones?page=${page + 1}&pageSize=${rowsPerPage}`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Actualizamos el total de registros de la lista
        setTotalReg(result.data.totalRegistros)
        // Actualizamos la lista en la data local
        setList(result.data.list)
        setData(result.data.list)
      }
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Si existe un socket, número de página y filas por página
    if (socket && page >= 0 && rowsPerPage >= 1) {
      // Obtenemos las elecciones
      getElecciones()
      // Si una elección fue creada
      socket.on('eleccion-creada', () => getElecciones())
      // Si una elección fue actualizada
      socket.on('eleccion-actualizada', () => getElecciones())
      // Si una elección fue eliminada
      socket.on('eleccion-eliminada', () => getElecciones())

      // Limpiamos el montaje
      return () => {
        mounted = false
        socket.off('eleccion-creada')
        socket.off('eleccion-actualizada')
        socket.off('eleccion-eliminada')
      }
    }
  }, [socket, page, rowsPerPage, setList, setData])

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

  // Función para remover una fila de la tabla
  const handleRemoveRow = id => {
    Swal.fire({
      title: '¿Está seguro que quiere eliminar la elección?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`
    }).then(async result => {
      if (result.isConfirmed) {
        // Eliminamos la acción
        const result = await fetchData(`elecciones/${id}`, { isTokenReq: true }, 'DELETE')
        // Validamos el resultado
        if (validateFetchData(result)) {
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
          <EleccionesTableHead order={order} onRequestSort={handleRequestSort} />
          {!loading && data && (
            <TableBody>
              {_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
                return (
                  <TableRow className="h-32" hover tabIndex={-1} key={row._id}>
                    <TableCell className="py-2" component="th" scope="row">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.anho}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {`Elecciones ${_.capitalize(row.tipo)}es`}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.actual && <CheckIcon style={{ color: green[500] }} />}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center" width={140} height={48}>
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                        <Link to={`/elecciones/editar/${row._id}`}>
                          <Tooltip title="Editar" placement="bottom-start" enterDelay={100}>
                            <IconButton color="primary" aria-label="editar eleccion">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('eliminar') !== -1)) && (
                        <Tooltip title="Eliminar" placement="bottom-start" enterDelay={100}>
                          <IconButton
                            style={{ color: '#F44343' }}
                            aria-label="eliminar eleccion"
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
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
EleccionesTable.propTypes = {
  setList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default EleccionesTable
