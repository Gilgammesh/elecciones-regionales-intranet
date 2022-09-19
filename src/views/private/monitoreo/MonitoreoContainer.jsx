/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TablePagination, TableRow, Icon, Typography, Paper } from '@material-ui/core'
import Scrollbars from 'components/core/Scrollbars'
import MonitoreoTableHead from './MonitoreoTableHead'
import _ from 'lodash'
import { fetchData } from 'services/fetch'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import AnimateGroup from 'components/core/AnimateGroup'
import { startGetAccionesModulo } from 'redux/actions/auth'
import { startSetMonitoreoRow } from 'redux/actions/monitoreo'
import { EMesaEstadoActa } from 'enums/mesas'
import { Swal } from 'configs/settings'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Table //
/*******************************************************************************************************/
const MonitoreoContainer = props => {
  // Obtenemos las propiedades del componente
  const { data, setData, page, setPage, rowsPerPage, setRowsPerPage, resetPages } = props

  // Llamamos al history de las rutas
  const history = useHistory()

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de monitoreo
  const { search, departamento, provincia, distrito, estadoActaReg, estadoActaProv, change } = useSelector(
    state => state.monitoreo
  )

  // Total de registros de la tablas
  const [totalReg, setTotalReg] = useState(0)

  // Totales de actas
  const [totalActas, setTotalActas] = useState(0)
  const [totalActasReg, setTotalActasReg] = useState({
    enviadas: 0,
    porenviar: 0,
    reabiertas: 0
  })
  const [totalActasProv, setTotalActasProv] = useState({
    enviadas: 0,
    porenviar: 0,
    reabiertas: 0
  })

  // Totales de votantes
  const [totalVotantes, setTotalVotantes] = useState(0)
  const [totalVotosGober, setTotalVotosGober] = useState(0)
  const [totalVotosConse, setTotalVotosConse] = useState(0)
  const [totalVotosAlcProv, setTotalVotosAlcProv] = useState(0)
  const [totalVotosAlcDist, setTotalVotosAlcDist] = useState(0)

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
    dispatch(startGetAccionesModulo('monitoreo')).then(res => setAccionesPerm(res))
  }, [dispatch])

  // Efecto para obtener la lista de las mesas de votación
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todos las mesas de votación
    const getMonitoreo = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de las mesas de votación con fetch
      let url = `monitoreo/mesas?page=${page + 1}&pageSize=${rowsPerPage}`
      // Agregamos los parámetros
      url += `&searchTipo=${search.tipo}&searchValue=${search.value}`
      url += `&departamento=${departamento}`
      url += `&provincia=${provincia}`
      url += `&distrito=${distrito}`
      url += `&estadoActaReg=${estadoActaReg}`
      url += `&estadoActaProv=${estadoActaProv}`
      const result = await fetchData(url, { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Actualizamos el total de registros de la lista
        setTotalReg(result.data.totalRegistros)
        // Actualizamos la lista en la data local
        setData(result.data.list)
        // Guardamos los datos de las actas
        setTotalActas(result.data.totalActas)
        setTotalActasReg(result.data.totalActasReg)
        setTotalActasProv(result.data.totalActasProv)
        // Guardamos los datos de los votantes
        setTotalVotantes(result.data.totalVotantes)
        setTotalVotosGober(result.data.totalVotosGober)
        setTotalVotosConse(result.data.totalVotosConse)
        setTotalVotosAlcProv(result.data.totalVotosAlcProv)
        setTotalVotosAlcDist(result.data.totalVotosAlcDist)
      }
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Si existe un socket, número de página y filas por página
    if (socket && page >= 0 && rowsPerPage >= 1) {
      getMonitoreo()
      socket.on('centros-votacion-mesa-creada', () => getMonitoreo())
      socket.on('centros-votacion-mesa-actualizada', () => getMonitoreo())
      socket.on('centros-votacion-mesa-eliminada', () => getMonitoreo())
      socket.on('centros-votacion-monitoreo-importadas', () => getMonitoreo())
      socket.on('acta-upsert', () => getMonitoreo())
      socket.on('acta-reopen', () => getMonitoreo())
      // Limpiamos el montaje
      return () => {
        mounted = false
        socket.off('centros-votacion-mesa-creada')
        socket.off('centros-votacion-mesa-actualizada')
        socket.off('centros-votacion-mesa-eliminada')
        socket.off('centros-votacion-monitoreo-importadas')
        socket.off('acta-upsert')
        socket.off('acta-reopen')
      }
    }
  }, [
    socket,
    search,
    departamento,
    provincia,
    distrito,
    estadoActaReg,
    estadoActaProv,
    change,
    page,
    rowsPerPage,
    setData
  ])

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

  // Función para registrar una acta
  const handleRegisterActa = (row, acta) => {
    // Guardamos el row de la mesa
    dispatch(startSetMonitoreoRow(row))
    // Redireccionamos a registrar el acta correspondiente
    history.push(`/monitoreo/acta-${acta}`)
  }

  // Función para actualizar una acta
  const handleUpdateActa = (row, acta) => {
    // Guardamos el row de la mesa
    dispatch(startSetMonitoreoRow(row))
    // Redireccionamos a edita el acta correspondiente
    history.push(`/monitoreo/acta-${acta}-edit`)
  }

  // Función para reabrir una acta
  const handleReopenActa = (id, acta) => {
    Swal.fire({
      title: `¿Está seguro que reabrir el acta ${acta} de la mesa de votación?`,
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `SI`,
      denyButtonText: `NO`
    }).then(async result => {
      if (result.isConfirmed) {
        // Reabrimos el acta
        await fetchData(`monitoreo/mesa/${id}/reopen?acta=${acta}`, { isTokenReq: true }, 'PUT')
      }
    })
  }

  // Renderizamos el componente
  return (
    <div className="w-full flex flex-col">
      <div className="p-12">
        <AnimateGroup
          className="flex flex-wrap"
          enter={{
            animation: 'transition.slideUpBigIn'
          }}
        >
          <div className="widget flex w-full p-12 sm:w-1/3">
            <Paper className="w-full rounded-8 shadow-1">
              <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-blue-600">
                <div className="flex items-center">
                  <Icon className="ml-12 text-white">how_to_vote</Icon>
                  <Typography className="text-16 px-12 text-white font-bold">Actas Regionales</Typography>
                </div>
                {totalActas > 0 && (
                  <Typography className="text-16 px-12 text-white font-bold">
                    {((totalActasReg.enviadas / totalActas) * 100).toFixed(2)} %
                  </Typography>
                )}
              </div>
              <div className="flex items-center px-16 pt-10 pb-2">
                <Typography className="text-15 flex w-full">
                  <span className="text-green w-80">Enviadas</span>:
                  <span className="px-8 font-semibold">
                    {totalActasReg.enviadas} de {totalActas}
                  </span>
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-2">
                <Typography className="text-15 flex w-full">
                  <span className="text-red w-80">Por enviar</span>:
                  <span className="px-8 font-semibold">{totalActasReg.porenviar}</span>
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-10">
                <Typography className="text-15 flex w-full">
                  <span className="text-blue w-80">Reabiertas</span>:
                  <span className="px-8 font-semibold">{totalActasReg.reabiertas}</span>
                </Typography>
              </div>
            </Paper>
          </div>
          <div className="widget flex w-full p-12 sm:w-1/3">
            <Paper className="w-full rounded-8 shadow-1">
              <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-blue-600">
                <div className="flex items-center">
                  <Icon className="ml-12 text-white">how_to_vote</Icon>
                  <Typography className="text-16 px-12 text-white font-bold">Actas Provinciales</Typography>
                </div>
                {totalActas > 0 && (
                  <Typography className="text-16 px-12 text-white font-bold">
                    {((totalActasProv.enviadas / totalActas) * 100).toFixed(2)} %
                  </Typography>
                )}
              </div>
              <div className="flex items-center px-16 pt-10 pb-2">
                <Typography className="text-15 flex w-full">
                  <span className="text-green w-80">Enviadas</span>:
                  <span className="px-8 font-semibold">
                    {totalActasProv.enviadas} de {totalActas}
                  </span>
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-2">
                <Typography className="text-15 flex w-full">
                  <span className="text-red w-80">Por enviar</span>:
                  <span className="px-8 font-semibold">{totalActasProv.porenviar}</span>
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-10">
                <Typography className="text-15 flex w-full">
                  <span className="text-blue w-80">Reabiertas</span>:
                  <span className="px-8 font-semibold">{totalActasProv.reabiertas}</span>
                </Typography>
              </div>
            </Paper>
          </div>
          <div className="widget flex w-full p-12 sm:w-1/3">
            <Paper className="w-full rounded-8 shadow-1">
              <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-teal-500">
                <div className="flex items-center">
                  <Icon className="ml-12 text-white">how_to_vote</Icon>
                  <Typography className="text-16 px-12 text-white font-bold">Votantes</Typography>
                </div>
                <Typography className="text-16 px-12 text-white font-bold">
                  {new Intl.NumberFormat('es-PE').format(totalVotantes)}
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-2">
                <Typography className="text-15 flex w-full">
                  <span className="w-160 text-blue-gray-800">Gobernador</span>:
                  <span className="px-8 font-semibold">{totalVotosGober}</span>
                  {totalVotantes > 0 && (
                    <span className="px-4 font-semibold text-blue-gray-900">
                      ({((totalVotosGober / totalVotantes) * 100).toFixed(2)} %)
                    </span>
                  )}
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-2">
                <Typography className="text-15 flex w-full">
                  <span className="w-160 text-blue-gray-800">Consejeros</span>:
                  <span className="px-8 font-semibold">{totalVotosConse}</span>
                  {totalVotantes > 0 && (
                    <span className="px-4 font-semibold text-blue-gray-900">
                      ({((totalVotosConse / totalVotantes) * 100).toFixed(2)} %)
                    </span>
                  )}
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-2">
                <Typography className="text-15 flex w-full">
                  <span className="w-160 text-blue-gray-800">Alcaldes Provinciales</span>:
                  <span className="px-8 font-semibold">{totalVotosAlcProv}</span>
                  {totalVotantes > 0 && (
                    <span className="px-4 font-semibold text-blue-gray-900">
                      ({((totalVotosAlcProv / totalVotantes) * 100).toFixed(2)} %)
                    </span>
                  )}
                </Typography>
              </div>
              <div className="flex items-center px-16 pt-10 pb-10">
                <Typography className="text-15 flex w-full">
                  <span className="w-160 text-blue-gray-800">Alcaldes Distritales</span>:
                  <span className="px-8 font-semibold">{totalVotosAlcDist}</span>
                  {totalVotantes > 0 && (
                    <span className="px-4 font-semibold text-blue-gray-900">
                      ({((totalVotosAlcDist / totalVotantes) * 100).toFixed(2)} %)
                    </span>
                  )}
                </Typography>
              </div>
            </Paper>
          </div>
        </AnimateGroup>
      </div>
      <Scrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <MonitoreoTableHead order={order} onRequestSort={handleRequestSort} resetPages={resetPages} />
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
                          <Typography className="mr-10 text-red">--Sin asignar--</Typography>
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
                          <Typography className="mr-10 text-red">--Sin asignar--</Typography>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.votantes}
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
                    <TableCell component="th" scope="row" align="center">
                      <div className="flex flex-row justify-center gap-2">
                        {row.acta_reg === EMesaEstadoActa.PorEnviar && (
                          <div className="flex flex-col items-center text-red-600 w-60">
                            <Icon>assignment_late</Icon>
                            <span className="text-10">{row.acta_reg}</span>
                          </div>
                        )}
                        {row.acta_reg === EMesaEstadoActa.Enviado && (
                          <div className="flex flex-col items-center text-green w-60">
                            <Icon>assignment_turned_in</Icon>
                            <span className="text-10">{row.acta_reg}</span>
                          </div>
                        )}
                        {row.acta_reg === EMesaEstadoActa.Reabierto && (
                          <div className="flex flex-col items-center text-blue-400 w-60">
                            <Icon>assignment</Icon>
                            <span className="text-10">{row.acta_reg}</span>
                          </div>
                        )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) &&
                          row.acta_reg === EMesaEstadoActa.PorEnviar && (
                            <div
                              className="flex flex-col items-center w-72 cursor-pointer"
                              onClick={() => handleRegisterActa(row, 'regional')}
                            >
                              <Icon>assignment</Icon>
                              <span className="text-10">registrar acta</span>
                            </div>
                          )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) &&
                          row.acta_reg === EMesaEstadoActa.Reabierto && (
                            <div
                              className="flex flex-col items-center w-72 cursor-pointer"
                              onClick={() => handleUpdateActa(row, 'regional')}
                            >
                              <Icon>assignment</Icon>
                              <span className="text-10">actualizar acta</span>
                            </div>
                          )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) &&
                          row.acta_reg === EMesaEstadoActa.Enviado && (
                            <div
                              className="flex flex-col items-center w-72 cursor-pointer text-blue-900"
                              onClick={() => handleReopenActa(row._id, 'regional')}
                            >
                              <Icon>libary_books</Icon>
                              <span className="text-10">reabrir acta</span>
                            </div>
                          )}
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <div className="flex flex-row justify-center gap-2">
                        {row.acta_prov === EMesaEstadoActa.PorEnviar && (
                          <div className="flex flex-col items-center text-red-600 w-60">
                            <Icon>assignment_late</Icon>
                            <span className="text-10">{row.acta_prov}</span>
                          </div>
                        )}
                        {row.acta_prov === EMesaEstadoActa.Enviado && (
                          <div className="flex flex-col items-center text-green w-60">
                            <Icon>assignment_turned_in</Icon>
                            <span className="text-10">{row.acta_prov}</span>
                          </div>
                        )}
                        {row.acta_prov === EMesaEstadoActa.Reabierto && (
                          <div className="flex flex-col items-center text-blue-400 w-60">
                            <Icon>assignment</Icon>
                            <span className="text-10">{row.acta_prov}</span>
                          </div>
                        )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) &&
                          row.acta_prov === EMesaEstadoActa.PorEnviar && (
                            <div
                              className="flex flex-col items-center w-72 cursor-pointer"
                              onClick={() => handleRegisterActa(row, 'provincial')}
                            >
                              <Icon>assignment</Icon>
                              <span className="text-10">registrar acta</span>
                            </div>
                          )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) &&
                          row.acta_prov === EMesaEstadoActa.Reabierto && (
                            <div
                              className="flex flex-col items-center w-72 cursor-pointer"
                              onClick={() => handleUpdateActa(row, 'provincial')}
                            >
                              <Icon>assignment</Icon>
                              <span className="text-10">actualizar acta</span>
                            </div>
                          )}
                        {(rol.super || (accionesPerm && accionesPerm.indexOf('editar') !== -1)) &&
                          row.acta_prov === EMesaEstadoActa.Enviado && (
                            <div
                              className="flex flex-col items-center w-72 cursor-pointer text-blue-900"
                              onClick={() => handleReopenActa(row._id, 'provincial')}
                            >
                              <Icon>libary_books</Icon>
                              <span className="text-10">reabrir acta</span>
                            </div>
                          )}
                      </div>
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
MonitoreoContainer.propTypes = {
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
export default MonitoreoContainer
