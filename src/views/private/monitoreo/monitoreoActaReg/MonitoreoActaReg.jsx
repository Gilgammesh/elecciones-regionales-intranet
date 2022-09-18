/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PageCarded from 'components/core/PageCarded'
import MonitoreoActaRegHeader from './MonitoreoActaRegHeader'
import MonitoreoActaRegToolBar from './MonitoreoActaRegToolBar'
import MonitoreoActaRegTable from './MonitoreoActaRegTable'
import { fetchData } from 'services/fetch'
import Formsy from 'formsy-react'
import { validateFetchData } from 'helpers/validateFetchData'
import { startResetMonitoreoRow } from 'redux/actions/monitoreo'
import { Toast } from 'configs/settings'

/*******************************************************************************************************/
// Definimos la Vista del componente Acta Regional //
/*******************************************************************************************************/
const MonitoreoActaReg = () => {
  // Llamamos al history de las rutas
  const history = useHistory()

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los estados por defecto de monitoreo
  const { row } = useSelector(state => state.monitoreo)

  // Lista de organizaciones políticas
  const [organizaciones, setOrganizaciones] = useState([])
  // Estado de carga de la información
  const [loading, setLoading] = useState(true)

  // Estado de los votos nulos
  const [nulos, setNulos] = useState({
    gober: 0,
    conse: 0
  })
  // Estado de los votos en blanco
  const [blancos, setBlancos] = useState({
    gober: 0,
    conse: 0
  })
  // Estado de los votos impugnados
  const [impugnados, setImpugnados] = useState({
    gober: 0,
    conse: 0
  })

  // Si el row está vacio retornamos a monitoreo
  useEffect(() => {
    if (row._id === '') {
      // Redireccionamos a monitoreo
      history.push('/monitoreo')
    }
  }, [row, history])

  // Efecto para obtener las organizaciones políticas con sus gobernadores y consejeros
  useEffect(() => {
    let mounted = true
    // Función para obtener las organizaciones con sus gobernadores y consejeros
    const getOrganizaciones = async () => {
      const result = await fetchData(
        `monitoreo/acta-regional?departamento=${row.departamento._id}&provincia=${row.provincia._id}`,
        {
          isTokenReq: true
        }
      )
      if (mounted && result && result.data.status) {
        setOrganizaciones(
          result.data.list.map(org => {
            return { ...org, votos_gober: 0, votos_conse: 0 }
          })
        )
        setLoading(false)
      }
    }
    if (row.departamento._id !== '' && row.provincia._id !== '') {
      getOrganizaciones()
    }
    return () => {
      mounted = false
    }
  }, [row])

  // Obtener total de votos de gobernadores
  const getTotalGober = () => {
    const total = organizaciones.reduce((tot, org) => tot + org.votos_gober, 0)
    return total + nulos.gober + blancos.gober + impugnados.gober
  }

  // Obtener total de votos de consejeros
  const getTotalConse = () => {
    const total = organizaciones.reduce((tot, org) => tot + org.votos_conse, 0)
    return total + nulos.conse + blancos.conse + impugnados.conse
  }

  // Función para establecer los votos del gobernador de una organizacion politica
  const setVotosGober = (evt, id) => {
    const { value } = evt.target
    const newOrganizaciones = organizaciones.slice().map(org => {
      if (org._id === id) {
        if (value === null || value === '') {
          return { ...org, votos_gober: 0 }
        }
        return { ...org, votos_gober: parseInt(value, 10) }
      }
      return org
    })
    setOrganizaciones(newOrganizaciones)
  }

  // Función para establecer los votos de un consejero de una organizacion politica
  const setVotosConse = (evt, id) => {
    const { value } = evt.target
    const newOrganizaciones = organizaciones.slice().map(org => {
      if (org._id === id) {
        if (value === null || value === '') {
          return { ...org, votos_conse: 0 }
        }
        return { ...org, votos_conse: parseInt(value, 10) }
      }
      return org
    })
    setOrganizaciones(newOrganizaciones)
  }

  // Función para enviar los votos regionales
  const handleSubmit = async () => {
    const result = await fetchData('monitoreo/votos/regionales', { isTokenReq: true }, 'POST', {
      row,
      organizaciones,
      nulos,
      blancos,
      impugnados,
      tipo: 'regional'
    })
    // Validamos el resultado
    if (validateFetchData(result)) {
      // Avisamos con un toast alert
      Toast.fire({
        icon: 'success',
        title: result.data.msg
      })
      // Reseteamos el row de mesa
      dispatch(startResetMonitoreoRow())
    }
  }

  // Renderizamos el componente
  return (
    <Formsy onValidSubmit={handleSubmit}>
      <PageCarded
        classes={{
          toolbar: 'p-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
        }}
        header={<MonitoreoActaRegHeader handleSubmit={handleSubmit} />}
        contentToolbar={<MonitoreoActaRegToolBar row={row} />}
        content={
          <MonitoreoActaRegTable
            loading={loading}
            nulos={nulos}
            setNulos={setNulos}
            blancos={blancos}
            setBlancos={setBlancos}
            impugnados={impugnados}
            setImpugnados={setImpugnados}
            organizaciones={organizaciones}
            getTotalGober={getTotalGober}
            getTotalConse={getTotalConse}
            setVotosGober={setVotosGober}
            setVotosConse={setVotosConse}
          />
        }
        innerScroll
      />
    </Formsy>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaReg
