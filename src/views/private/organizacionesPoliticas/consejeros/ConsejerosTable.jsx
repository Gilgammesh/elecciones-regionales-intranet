/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Scrollbars from 'components/core/Scrollbars'
import ConsejerosTableHead from './ConsejerosTableHead'
import _ from 'lodash'
import { fetchData } from 'services/fetch'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { Swal, Toast } from 'configs/settings'
import { validateFetchData } from 'helpers/validateFetchData'
import { startGetAccionesSubModulo } from 'redux/actions/auth'
import ConsejerosToolBar from './ConsejerosToolBar'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(() => ({
  avatar: {
    width: '40px',
    height: '50px',
    borderRadius: '50px'
  },
  avatarImg: {
    display: 'block',
    borderRadius: '40px',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  partido: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Consejeros Table //
/*******************************************************************************************************/
const ConsejerosTable = props => {
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

  // Obtenemos los estados por defecto de los consejeros
  const { search, organizacion, departamento, provincia, change } = useSelector(state => state.consejeros)

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
    dispatch(startGetAccionesSubModulo('organizaciones-politicas', 'consejeros')).then(res => setAccionesPerm(res))
  }, [dispatch])

  // Efecto para obtener la lista de los consejeros
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todos los consejeros de las organizaciones politicas
    const getConsejeros = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de los consejeros con fetch
      let url = `organizaciones-politicas/consejeros?page=${page + 1}&pageSize=${rowsPerPage}`
      // Agregamos los parámetros
      url += `&searchTipo=${search.tipo}&searchValue=${search.value}`
      url += `&organizacion=${organizacion}`
      url += `&departamento=${departamento}`
      url += `&provincia=${provincia}`
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
    // Si existe un socket, número de página y filas por página
    if (socket && page >= 0 && rowsPerPage >= 1) {
      // Obtenemos los consejeros
      getConsejeros()
      // Si un consejero fue creado
      socket.on('organizaciones-politicas-consejero-creado', () => getConsejeros())
      // Si un consejero fue actualizado
      socket.on('organizaciones-politicas-consejero-actualizado', () => getConsejeros())
      // Si un consejero fue eliminado
      socket.on('organizaciones-politicas-consejero-eliminado', () => getConsejeros())

      // Limpiamos el montaje y los eventos con socket
      return () => {
        mounted = false
        socket.off('organizaciones-politicas-consejero-creado')
        socket.off('organizaciones-politicas-consejero-actualizado')
        socket.off('organizaciones-politicas-consejero-eliminado')
      }
    }
  }, [socket, search, organizacion, departamento, provincia, change, page, rowsPerPage, setData])

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
      title: '¿Está seguro que quiere eliminar el consejero?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`
    }).then(async result => {
      if (result.isConfirmed) {
        // Eliminamos la acción
        const result = await fetchData(`organizaciones-politicas/consejeros/${id}`, { isTokenReq: true }, 'DELETE')
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
      <ConsejerosToolBar resetPages={resetPages} />
      <hr />
      <Scrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ConsejerosTableHead order={order} onRequestSort={handleRequestSort} resetPages={resetPages} />
          {!loading && data && (
            <TableBody>
              {_.orderBy(data, [order.id], [order.direction]).map((row, index) => {
                return (
                  <TableRow className="h-32" hover tabIndex={-1} key={row._id}>
                    <TableCell className="py-2" component="th" scope="row">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell className="py-4" component="th" scope="row">
                      <div className={styles.avatar}>
                        <img className={styles.avatarImg} alt="logo" src={row.foto} />
                      </div>
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.nombres}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.apellidos}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.numero}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.dni}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      <div className={styles.partido}>
                        <img alt="logo" src={row.organizacion.logo} width="40" height="auto" />
                        <span className="ml-10">{row.organizacion.nombre}</span>
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
                    <TableCell className="py-2" component="th" scope="row" align="center" width={140} height={48}>
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) && (
                        <Link to={`/organizaciones-politicas/consejeros/editar/${row._id}`}>
                          <Tooltip title="Editar" placement="bottom-start" enterDelay={100}>
                            <IconButton color="primary" aria-label="editar consejero">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                      {(rol.super || (accionesPerm && accionesPerm.indexOf('eliminar') !== -1)) && (
                        <Tooltip title="Eliminar" placement="bottom-start" enterDelay={100}>
                          <IconButton
                            style={{ color: '#F44343' }}
                            aria-label="eliminar consejero"
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
ConsejerosTable.propTypes = {
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
export default ConsejerosTable
