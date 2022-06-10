/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Tooltip
} from '@material-ui/core'
import Scrollbars from 'components/core/Scrollbars'
import UsuariosTableHead from './UsuariosTableHead'
import _ from 'lodash'
import { fetchData } from 'services/fetch'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { Swal, Toast } from 'configs/settings'
import { validateFetchData } from 'helpers/validateFetchData'
import { startGetAccionesModulo } from 'redux/actions/auth'
import male from 'assets/images/avatars/male.jpg'
import female from 'assets/images/avatars/female.jpg'

/*******************************************************************************************************/
// Definimos la Vista del componente Usuarios Table //
/*******************************************************************************************************/
const UsuariosTable = props => {
  // Obtenemos las propiedades del componente
  const { setList, data, setData } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos los datos del usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos los datos de la lista de usuarios
  const { departamento, rol } = useSelector(state => state.usuarios)

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

  // Estado de cambio de la data
  const [change, setChange] = useState('')

  // Array de Permisos de Acciones del Módulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del módulo
  useEffect(() => {
    dispatch(startGetAccionesModulo('usuarios')).then(res =>
      setAccionesPerm(res)
    )
  }, [dispatch])

  // Efecto para obtener la lista de los Usuarios
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todos los usuarios
    const getUsuarios = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de los usuarios con fetch
      const result = await fetchData(
        `usuarios?departamento=${departamento}&rol=${rol}&page=${
          page + 1
        }&pageSize=${rowsPerPage}`,
        {
          isTokenReq: true
        }
      )
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
    // Si existe un socket o cambia y si existe número de página y filas por página
    if (socket && page >= 0 && rowsPerPage >= 1) {
      // Obtenemos los usuarios
      getUsuarios()
      // Si un usuario fue creado
      socket.on('usuario-creado', () => getUsuarios())
      // Si un usuario fue actualizado
      socket.on('usuario-actualizado', () => getUsuarios())
      // Si un usuario fue eliminado
      socket.on('usuario-eliminado', () => getUsuarios())
      // Si un usuario fue eliminado
      socket.on('usuarios-importados', () => getUsuarios())
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [socket, change, page, rowsPerPage, setList, setData, departamento, rol])

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

  // Función para cambiar el número de fila de una página
  const handleChangeRowsPerPage = evt => {
    // Reiniciamos a la página inicial
    setPage(0)
    // Guardamos el número de registro por página
    setRowsPerPage(evt.target.value)
  }

  // Función para remover una fila de la tabla
  const handleRemoveRow = id => {
    Swal.fire({
      title: '¿Está seguro que quiere eliminar el usuario?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`
    }).then(async result => {
      if (result.isConfirmed) {
        // Eliminamos el usuario
        const result = await fetchData(
          `usuarios/${id}`,
          { isTokenReq: true },
          'DELETE'
        )
        // Validamos el resultado
        if (validateFetchData(result)) {
          // Cambiamos el estado de cambio de la data
          setChange(`${new Date()}`)
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
          <UsuariosTableHead
            order={order}
            onRequestSort={handleRequestSort}
            superUser={usuario.rol.super}
            setChange={setChange}
          />
          {!loading && data && (
            <TableBody>
              {_.orderBy(data, [o => o[order.id]], [order.direction]).map(
                (row, index) => {
                  return (
                    <TableRow
                      className="h-32"
                      hover
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell className="py-2" component="th" scope="row">
                        {index + 1 + page * rowsPerPage}
                      </TableCell>
                      <TableCell className="py-2" component="th" scope="row">
                        <Avatar
                          alt="img"
                          src={
                            row.img
                              ? row.img
                              : row.genero === 'M'
                              ? male
                              : female
                          }
                        />
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
                        {row.email}
                      </TableCell>
                      <TableCell className="py-2" component="th" scope="row">
                        {row.rol.nombre}
                      </TableCell>
                      {usuario.rol.super && (
                        <TableCell className="py-2" component="th" scope="row">
                          {row.rol.super ? 'TODOS' : row.departamento.nombre}
                        </TableCell>
                      )}
                      <TableCell
                        className="py-2 pr-40"
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.estado ? (
                          <Icon className="text-green text-20">
                            check_circle
                          </Icon>
                        ) : (
                          <Icon className="text-red text-20">cancel</Icon>
                        )}
                      </TableCell>
                      <TableCell
                        className="py-2"
                        component="th"
                        scope="row"
                        align="center"
                        width={140}
                        height={54}
                      >
                        {(usuario.rol.super ||
                          (accionesPerm &&
                            accionesPerm.indexOf('editar') !== -1)) && (
                          <Link to={`/usuarios/editar/${row._id}`}>
                            <Tooltip
                              title="Editar"
                              placement="bottom-start"
                              enterDelay={100}
                            >
                              <IconButton
                                color="primary"
                                aria-label="editar usuario"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        )}
                        {(usuario.rol.super ||
                          (accionesPerm &&
                            accionesPerm.indexOf('eliminar') !== -1)) && (
                          <Tooltip
                            title="Eliminar"
                            placement="bottom-start"
                            enterDelay={100}
                          >
                            <IconButton
                              style={{ color: '#F44343' }}
                              aria-label="eliminar usuario"
                              onClick={() => handleRemoveRow(row._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
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
UsuariosTable.propTypes = {
  setList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default UsuariosTable
