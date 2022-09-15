/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Tooltip } from '@material-ui/core'
import Scrollbars from 'components/core/Scrollbars'
import AccionesTableHead from './AccionesTableHead'
import _ from 'lodash'
import { fetchData } from 'services/fetch'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { Swal, Toast } from 'configs/settings'
import { validateFetchData } from 'helpers/validateFetchData'
import { startGetAccionesSubModulo } from 'redux/actions/auth'

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Acciones Table //
/*******************************************************************************************************/
const AccionesTable = props => {
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

  // Array de Permisos de Acciones del SubMódulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del submódulo
  useEffect(() => {
    dispatch(startGetAccionesSubModulo('admin', 'acciones')).then(res => setAccionesPerm(res))
  }, [dispatch])

  // Efecto para obtener la lista de las Acciones
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todas las acciones
    const getAcciones = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de las acciones con fetch
      const result = await fetchData(`admin/acciones?page=${page + 1}&pageSize=${rowsPerPage}`, {
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
      // Obtenemos las acciones
      getAcciones()
      // Si una acción fue creada
      socket.on('admin-accion-creada', () => getAcciones())
      // Si una acción fue actualizada
      socket.on('admin-accion-actualizada', () => getAcciones())
      // Si una acción fue eliminada
      socket.on('admin-accion-eliminada', () => getAcciones())

      // Limpiamos el montaje
      return () => {
        mounted = false
        socket.off('admin-accion-creada')
        socket.off('admin-accion-actualizada')
        socket.off('admin-accion-eliminada')
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
      title: '¿Está seguro que quiere eliminar la acción?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`
    }).then(async result => {
      if (result.isConfirmed) {
        // Eliminamos la acción
        const result = await fetchData(`admin/acciones/${id}`, { isTokenReq: true }, 'DELETE')
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
          <AccionesTableHead order={order} onRequestSort={handleRequestSort} />
          {!loading && data && (
            <TableBody>
              {_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
                return (
                  <TableRow className="h-32" hover tabIndex={-1} key={row._id}>
                    <TableCell className="py-2" component="th" scope="row">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="justify">
                      {row.descripcion}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center" width={140} height={48}>
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                        <Link to={`/admin/acciones/editar/${row._id}`}>
                          <Tooltip title="Editar" placement="bottom-start" enterDelay={100}>
                            <IconButton color="primary" aria-label="editar accion">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('eliminar') !== -1)) && (
                        <Tooltip title="Eliminar" placement="bottom-start" enterDelay={100}>
                          <IconButton
                            style={{ color: '#F44343' }}
                            aria-label="eliminar acción"
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
AccionesTable.propTypes = {
  setList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AccionesTable
