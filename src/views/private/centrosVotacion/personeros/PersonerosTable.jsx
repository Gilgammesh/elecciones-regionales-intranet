/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Icon,
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
import PersonerosTableHead from './PersonerosTableHead'
import _ from 'lodash'
import { fetchData } from 'services/fetch'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { Swal, Toast } from 'configs/settings'
import { validateFetchData } from 'helpers/validateFetchData'
import { startGetAccionesSubModulo } from 'redux/actions/auth'
import { startResetPersoneros } from 'redux/actions/personeros'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  red: {
    color: red[500]
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros Table //
/*******************************************************************************************************/
const PersonerosTable = props => {
  // Obtenemos las propiedades del componente
  const { data, setData } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Instanciamos los estilos
  const styles = useStyles()

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de la vista personeros
  const { search, tipo, estado, departamento, change } = useSelector(state => state.personeros)

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
    dispatch(startGetAccionesSubModulo('centros-votacion', 'personeros')).then(res => setAccionesPerm(res))
  }, [dispatch])

  // Efecto para obtener la lista de los personeros
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todos los personeros
    const getPersoneros = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de los personeros con fetch
      const result = await fetchData(
        `centros-votacion/personeros?searchTipo=${search.tipo}&searchValue=${
          search.value
        }&tipo=${tipo}&estado=${estado}&departamento=${departamento}&page=${page + 1}&pageSize=${rowsPerPage}`,
        {
          isTokenReq: true
        }
      )
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
    // Si existe un socket o cambia y si existe número de página y filas por página
    if (socket && page >= 0 && rowsPerPage >= 1) {
      // Obtenemos los personeros
      getPersoneros()
      // Si un personero fue creado
      socket.on('centros-votacion-personero-creado', () => getPersoneros())
      // Si un personero fue actualizado
      socket.on('centros-votacion-personero-actualizado', () => getPersoneros())
      // Si un personero fue eliminado
      socket.on('centros-votacion-personero-eliminado', () => getPersoneros())
      // Si los personeros fueron importados de excel
      socket.on('centros-votacion-personeros-importados', () => getPersoneros())
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [socket, search, tipo, estado, departamento, change, page, rowsPerPage, setData])

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
      title: '¿Está seguro que quiere eliminar el personero?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`
    }).then(async result => {
      if (result.isConfirmed) {
        // Eliminamos la acción
        const result = await fetchData(`centros-votacion/personeros/${id}`, { isTokenReq: true }, 'DELETE')
        // Validamos el resultado
        if (validateFetchData(result)) {
          // Reseteamos los estados de personeros
          dispatch(startResetPersoneros())
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
          <PersonerosTableHead order={order} onRequestSort={handleRequestSort} />
          {!loading && data && (
            <TableBody>
              {_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
                return (
                  <TableRow className="h-32" hover tabIndex={-1} key={row._id}>
                    <TableCell className="py-2" component="th" scope="row">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.nombres}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.apellidos}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.dni}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.celular}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.asignado ? (
                        `Personero de ${_.capitalize(row.tipo)}`
                      ) : (
                        <Typography className={styles.red}>--Sin asignar--</Typography>
                      )}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.asignado ? row.asignadoA : <Typography className={styles.red}>--Sin asignar--</Typography>}
                    </TableCell>
                    {rol.super && (
                      <TableCell className="py-2" component="th" scope="row">
                        {row.departamento.nombre}
                      </TableCell>
                    )}
                    <TableCell className="py-2 pr-40" component="th" scope="row" align="center">
                      {row.estado ? (
                        <Icon className="text-green text-20">check_circle</Icon>
                      ) : (
                        <Icon className="text-red text-20">cancel</Icon>
                      )}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center" width={140} height={48}>
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                        <Link to={`/centros-votacion/personeros/editar/${row._id}`}>
                          <Tooltip title="Editar" placement="bottom-start" enterDelay={100}>
                            <IconButton color="primary" aria-label="editar personero">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('eliminar') !== -1)) && (
                        <Tooltip title="Eliminar" placement="bottom-start" enterDelay={100}>
                          <IconButton
                            style={{ color: '#F44343' }}
                            aria-label="eliminar personero"
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
PersonerosTable.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosTable
