/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Icon, Typography, Paper } from '@material-ui/core'
import { fetchData } from 'services/fetch'
import Animate from 'components/core/Animate'
import AnimateGroup from 'components/core/AnimateGroup'
import { EReportesTipo } from 'redux/reducers/reportesReducer'
import Searching from 'components/core/Animations/Searching'
import ReportesCandidato from './ReportesCandidato'
import ReportesVotoProvincia from './ReportesVotoProvincia'
import ReportesVotoDistrito from './ReportesVotoDistrito'
import ReportesToolBar from './ReportesToolBar'

/*******************************************************************************************************/
// Definimos la Vista del componente Reportes Container //
/*******************************************************************************************************/
const ReportesContainer = () => {
  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos los datos del usuario
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de reportes
  const { tipo, departamento, provincia, distrito } = useSelector(state => state.reportes)

  // Totales de mesas y actas
  const [totalMesas, setTotalMesas] = useState(0)
  const [totalActasProcesadas, setTotalActasProcesadas] = useState(0)

  // Totales de votantes
  const [totalVotantes, setTotalVotantes] = useState(0)
  const [totalVotos, setTotalVotos] = useState(0)
  const [totalVotosNulo, setTotalVotosNulos] = useState(0)
  const [totalVotosBlanco, setTotalVotosBlanco] = useState(0)
  const [totalVotosImpugnados, setTotalVotosImpugnados] = useState(0)
  const [maxVoto, setMaxVoto] = useState(0)

  // Lista de Candidatos
  const [list, setList] = useState([])

  // Lista de votos por Provincia
  const [votosxProv, setVotosxProv] = useState([])
  const [maxVotoxProv, setMaxVotoxProv] = useState(0)
  // Lista de votos por Distrito
  const [votosxDist, setVotosxDist] = useState([])
  const [maxVotoxDist, setMaxVotoxDist] = useState(0)

  // Estado de la organización seleccionada
  const [organizacion, setOrganizacion] = useState('')

  // Estado de carga de la tabla
  const [loading, setLoading] = useState(true)

  // Función de limpieza de los reportes
  const cleanReportes = () => {
    setList([])
    setMaxVoto(0)
    setTotalMesas(0)
    setTotalActasProcesadas(0)
    setTotalVotantes(0)
    setTotalVotos(0)
    setTotalVotosNulos(0)
    setTotalVotosBlanco(0)
    setTotalVotosImpugnados(0)
  }

  // Función de limpieza de los votos
  const cleanVotos = () => {
    setVotosxProv([])
    setVotosxDist([])
    setMaxVotoxProv(0)
    setMaxVotoxDist(0)
  }

  // Efecto para obtener la lista de las mesas de votación
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener los Reportes
    const getReportes = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      cleanReportes()
      let url = ''
      // Si el reporte es de Gobernadores
      if (tipo === EReportesTipo.GOBERNADORES) {
        url = 'reportes/gobernadores'
        // Agregamos el departamento
        if (usuario.rol.super) {
          url += `?departamento=${departamento}`
        } else {
          url += `?departamento=${usuario.departamento?._id}`
        }
      }
      // Si el reporte es de Alcaldes Provinciales
      if (tipo === EReportesTipo.ALCALDES && provincia !== 'todos' && distrito === 'todos') {
        url = 'reportes/alcaldes-provinciales'
        // Agregamos el departamento
        if (usuario.rol.super) {
          url += `?departamento=${departamento}`
        } else {
          url += `?departamento=${usuario.departamento?._id}`
        }
        url += `&provincia=${provincia}`
      }
      // Si el reporte es de Alcaldes Distritales
      if (tipo === EReportesTipo.ALCALDES && provincia !== 'todos' && distrito !== 'todos') {
        url = 'reportes/alcaldes-distritales'
        // Agregamos el departamento
        if (usuario.rol.super) {
          url += `?departamento=${departamento}`
        } else {
          url += `?departamento=${usuario.departamento?._id}`
        }
        url += `&provincia=${provincia}`
        url += `&distrito=${distrito}`
      }
      if (url !== '') {
        const result = await fetchData(url, { isTokenReq: true })
        // Si existe un resultado y el status es positivo
        if (result && mounted && result.data.status) {
          // Guardamos la lista de gobernadores
          setList(result.data.list)
          if (result.data.list.length > 0) {
            setMaxVoto(result.data.list[0].votos)
          }
          // Guardamos los datos de las mesas y actas
          setTotalMesas(result.data.totalMesas)
          setTotalActasProcesadas(result.data.totalActasProcesadas)
          // Guardamos los datos de los votantes
          setTotalVotantes(result.data.totalVotantes)
          setTotalVotos(result.data.totalVotos)
          setTotalVotosNulos(result.data.totalVotosNulo)
          setTotalVotosBlanco(result.data.totalVotosBlanco)
          setTotalVotosImpugnados(result.data.totalVotosImpugnados)
        }
      }
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Si existe un socket
    if (socket) {
      if (usuario.rol.super && departamento === 'todos') {
        // Finalizamos carga de la tabla
        setLoading(false)
      } else {
        getReportes()
        socket.on('centros-votacion-mesa-creada', () => getReportes())
        socket.on('centros-votacion-mesa-actualizada', () => getReportes())
        socket.on('centros-votacion-mesa-eliminada', () => getReportes())
        socket.on('centros-votacion-reportes-importadas', () => getReportes())
        socket.on('acta-upsert', () => getReportes())
        // Limpiamos el montaje
        return () => {
          mounted = false
          socket.off('centros-votacion-mesa-creada')
          socket.off('centros-votacion-mesa-actualizada')
          socket.off('centros-votacion-mesa-eliminada')
          socket.off('centros-votacion-reportes-importadas')
          socket.off('acta-upsert')
        }
      }
    }
  }, [usuario, socket, tipo, departamento, provincia, distrito])

  // Efecto para obtener la lista de votos por provincia
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener los Reportes
    const getVotos = async () => {
      cleanVotos()
      // Si el reporte es de Gobernadores
      if (tipo === EReportesTipo.GOBERNADORES) {
        let url = `reportes/votos-provincia`
        // Agregamos el departamento
        if (usuario.rol.super) {
          url += `?departamento=${departamento}`
        } else {
          url += `?departamento=${usuario.departamento?._id}`
        }
        url += `&organizacion=${organizacion}`
        const result = await fetchData(url, { isTokenReq: true })
        // Si existe un resultado y el status es positivo
        if (result && mounted && result.data.status) {
          // Guardamos los votos
          setVotosxProv(result.data.list)
          if (result.data.list.length > 0) {
            setMaxVotoxProv(result.data.list[0].votos)
          }
        }
      }
      // Si el reporte es de Alcaldes Provinciales
      if (tipo === EReportesTipo.ALCALDES && provincia !== 'todos' && distrito === 'todos') {
        let url = `reportes/votos-distrito`
        // Agregamos el departamento
        if (usuario.rol.super) {
          url += `?departamento=${departamento}`
        } else {
          url += `?departamento=${usuario.departamento?._id}`
        }
        url += `&provincia=${provincia}`
        url += `&organizacion=${organizacion}`
        const result = await fetchData(url, { isTokenReq: true })
        // Si existe un resultado y el status es positivo
        if (result && mounted && result.data.status) {
          // Guardamos los votos
          setVotosxDist(result.data.list)
          if (result.data.list.length > 0) {
            setMaxVotoxDist(result.data.list[0].votos)
          }
        }
      }
    }
    // Si existe un socket
    if (socket) {
      if (usuario.rol.super && departamento === 'todos') {
      } else {
        getVotos()
        socket.on('centros-votacion-mesa-creada', () => getVotos())
        socket.on('centros-votacion-mesa-actualizada', () => getVotos())
        socket.on('centros-votacion-mesa-eliminada', () => getVotos())
        socket.on('centros-votacion-reportes-importadas', () => getVotos())
        socket.on('acta-upsert', () => getVotos())
        // Limpiamos el montaje
        return () => {
          mounted = false
          socket.off('centros-votacion-mesa-creada')
          socket.off('centros-votacion-mesa-actualizada')
          socket.off('centros-votacion-mesa-eliminada')
          socket.off('centros-votacion-reportes-importadas')
          socket.off('acta-upsert')
        }
      }
    }
  }, [usuario, socket, tipo, organizacion, departamento, provincia, distrito])

  // Renderizamos el componente
  return (
    <div className="w-full flex flex-col">
      <ReportesToolBar />
      <hr />
      {loading ? (
        <Searching model="stretch" variant={1} height={500} width={500} playingState="playing" />
      ) : (
        <Fragment>
          <div className="p-12">
            <AnimateGroup
              className="flex flex-wrap"
              enter={{
                animation: 'transition.slideUpBigIn'
              }}
            >
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-blue-600">
                    <div className="flex items-center">
                      <Icon className="ml-12 text-white">dns</Icon>
                      <Typography className="text-15 px-12 text-white font-bold">Mesas</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {new Intl.NumberFormat('es-PE').format(totalMesas)}
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-blue-600">
                    <div className="flex items-center">
                      <Icon className="ml-12 text-white">assignment</Icon>
                      <Typography className="text-15 px-12 text-white font-bold">Actas Procesadas</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {new Intl.NumberFormat('es-PE').format(totalActasProcesadas)}
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-blue-600">
                    <div className="flex items-center">
                      <Typography className="text-15 px-12 text-white font-bold">% Actas Escrutadas</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {totalMesas > 0 ? ((totalActasProcesadas / totalMesas) * 100).toFixed(2) : '0.00'} %
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-teal-500">
                    <div className="flex items-center">
                      <Icon className="ml-12 text-white">people</Icon>
                      <Typography className="text-15 px-12 text-white font-bold">Votantes</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {new Intl.NumberFormat('es-PE').format(totalVotantes)}
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-teal-500">
                    <div className="flex items-center">
                      <Icon className="ml-12 text-white">how_to_vote</Icon>
                      <Typography className="text-15 px-12 text-white font-bold">Votos</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {new Intl.NumberFormat('es-PE').format(totalVotos)}
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-teal-500">
                    <div className="flex items-center">
                      <Typography className="text-15 px-12 text-white font-bold">% Participación</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {totalVotantes > 0 ? ((totalVotos / totalVotantes) * 100).toFixed(2) : '0.00'} %
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-indigo-500">
                    <div className="flex items-center">
                      <Icon className="ml-12 text-white">how_to_vote</Icon>
                      <Typography className="text-15 px-12 text-white font-bold">Votos Nulos</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {new Intl.NumberFormat('es-PE').format(totalVotosNulo)}
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-indigo-500">
                    <div className="flex items-center">
                      <Icon className="ml-12 text-white">how_to_vote</Icon>
                      <Typography className="text-15 px-12 text-white font-bold">Votos en Blanco</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {new Intl.NumberFormat('es-PE').format(totalVotosBlanco)}
                    </Typography>
                  </div>
                </Paper>
              </div>
              <div className="widget flex w-full p-12 sm:w-1/6">
                <Paper className="w-full rounded-8 shadow-1">
                  <div className="flex items-center justify-between px-4 py-8 rounded-t-8 bg-indigo-500">
                    <div className="flex items-center">
                      <Typography className="text-15 px-12 text-white font-bold">Votos Impugnados</Typography>
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-16 pt-10 pb-10">
                    <Typography className="text-15 w-full text-center font-bold">
                      {new Intl.NumberFormat('es-PE').format(totalVotosImpugnados)}
                    </Typography>
                  </div>
                </Paper>
              </div>
            </AnimateGroup>
          </div>
          <div className="flex flex-col justify-center w-full px-24 py-6">
            <div className="grid grid-cols-12 gap-24">
              <div className="col-span-12 sm:col-span-7">
                {tipo === EReportesTipo.GOBERNADORES && (
                  <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h6">Resultados de Gobernadores</Typography>
                  </Animate>
                )}
                {tipo === EReportesTipo.ALCALDES && distrito === 'todos' && (
                  <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h6">Resultados de Alcaldes Provinciales</Typography>
                  </Animate>
                )}
                {tipo === EReportesTipo.ALCALDES && distrito !== 'todos' && (
                  <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h6">Resultados de Alcaldes Distritales</Typography>
                  </Animate>
                )}
                <AnimateGroup
                  animation="transition.slideLeftIn"
                  delay={300}
                  className="flex flex-col justify-center items-center gap-12 py-10"
                >
                  {list &&
                    list.length > 0 &&
                    list.map(row => (
                      <ReportesCandidato
                        key={row._id}
                        row={row}
                        totalVotos={totalVotos}
                        maxVoto={maxVoto}
                        organizacion={organizacion}
                        setOrganizacion={setOrganizacion}
                      />
                    ))}
                </AnimateGroup>
              </div>
              {tipo === EReportesTipo.GOBERNADORES && (
                <div className="col-span-12 sm:col-span-5">
                  <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h6">Resultados por Provincia</Typography>
                  </Animate>
                  <AnimateGroup
                    animation="transition.slideLeftIn"
                    delay={300}
                    className="flex flex-col justify-center items-center gap-10 py-10"
                  >
                    {votosxProv &&
                      votosxProv.length > 0 &&
                      votosxProv.map(row => (
                        <ReportesVotoProvincia key={row._id} row={row} totalVotos={totalVotos} maxVoto={maxVotoxProv} />
                      ))}
                  </AnimateGroup>
                </div>
              )}
              {tipo === EReportesTipo.ALCALDES && distrito === 'todos' && (
                <div className="col-span-12 sm:col-span-5">
                  <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h6">Resultados por Distrito</Typography>
                  </Animate>
                  <AnimateGroup
                    animation="transition.slideLeftIn"
                    delay={300}
                    className="flex flex-col justify-center items-center gap-10 py-10"
                  >
                    {votosxDist &&
                      votosxDist.length > 0 &&
                      votosxDist.map(row => (
                        <ReportesVotoDistrito key={row._id} row={row} totalVotos={totalVotos} maxVoto={maxVotoxDist} />
                      ))}
                  </AnimateGroup>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ReportesContainer
