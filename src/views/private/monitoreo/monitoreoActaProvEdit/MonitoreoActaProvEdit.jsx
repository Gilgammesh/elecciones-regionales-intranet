/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PageCarded from 'components/core/PageCarded'
import MonitoreoActaProvEditHeader from './MonitoreoActaProvEditHeader'
import MonitoreoActaProvEditToolBar from './MonitoreoActaProvEditToolBar'
import MonitoreoActaProvEditTable from './MonitoreoActaProvEditTable'
import { fetchData } from 'services/fetch'
import Formsy from 'formsy-react'
import { validateFetchData } from 'helpers/validateFetchData'
import { startResetMonitoreoRow } from 'redux/actions/monitoreo'
import { Toast } from 'configs/settings'

/*******************************************************************************************************/
// Definimos la Vista del componente Acta Provincial Editar //
/*******************************************************************************************************/
const MonitoreoActaProvEdit = () => {
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
    alc_prov: 0,
    alc_dist: 0
  })
  // Estado de los votos en blanco
  const [blancos, setBlancos] = useState({
    alc_prov: 0,
    alc_dist: 0
  })
  // Estado de los votos impugnados
  const [impugnados, setImpugnados] = useState({
    alc_prov: 0,
    alc_dist: 0
  })

  // Si el row está vacio retornamos a monitoreo
  useEffect(() => {
    if (row._id === '') {
      // Redireccionamos a monitoreo
      history.push('/monitoreo')
    }
  }, [row, history])

  // Efecto para obtener las organizaciones políticas con sus alcaldes provinciales y distritales
  useEffect(() => {
    let mounted = true
    // Función para obtener las organizaciones con sus alcaldes provinciales y distritales
    const getOrganizaciones = async () => {
      const result = await fetchData(
        `monitoreo/votos/provinciales/${row._id}?departamento=${row.departamento._id}&provincia=${row.provincia._id}&distrito=${row.distrito._id}`,
        {
          isTokenReq: true
        }
      )
      if (mounted && result && result.data.status) {
        if (result.data.list) setOrganizaciones(result.data.list)
        if (result.data.nulos) {
          setNulos({ alc_prov: result.data.nulos.votos_alc_prov, alc_dist: result.data.nulos.votos_alc_dist })
        }
        if (result.data.blancos) {
          setBlancos({ alc_prov: result.data.blancos.votos_alc_prov, alc_dist: result.data.blancos.votos_alc_dist })
        }
        if (result.data.impugnados) {
          setImpugnados({
            alc_prov: result.data.impugnados.votos_alc_prov,
            alc_dist: result.data.impugnados.votos_alc_dist
          })
        }
        setLoading(false)
      }
    }
    if (row.departamento._id !== '' && row.provincia._id !== '' && row.distrito._id !== '') {
      getOrganizaciones()
    }
    return () => {
      mounted = false
    }
  }, [row])

  // Obtener total de votos de alcaldes provinciales
  const getTotalAlcProv = () => {
    const total = organizaciones.reduce((tot, org) => tot + org.votos_alc_prov, 0)
    return total + nulos.alc_prov + blancos.alc_prov + impugnados.alc_prov
  }

  // Obtener total de votos de alcaldes distritales
  const getTotalAlcDist = () => {
    const total = organizaciones.reduce((tot, org) => tot + org.votos_alc_dist, 0)
    return total + nulos.alc_dist + blancos.alc_dist + impugnados.alc_dist
  }

  // Función para establecer los votos del alcalde provincial de una organizacion politica
  const setVotosAlcProv = (evt, id) => {
    const { value } = evt.target
    const newOrganizaciones = organizaciones.slice().map(org => {
      if (org._id === id) {
        if (value === null || value === '') {
          return { ...org, votos_alc_prov: 0 }
        }
        return { ...org, votos_alc_prov: parseInt(value, 10) }
      }
      return org
    })
    setOrganizaciones(newOrganizaciones)
  }

  // Función para establecer los votos del alcalde distrital de una organización politica
  const setVotosAlcDist = (evt, id) => {
    const { value } = evt.target
    const newOrganizaciones = organizaciones.slice().map(org => {
      if (org._id === id) {
        if (value === null || value === '') {
          return { ...org, votos_alc_dist: 0 }
        }
        return { ...org, votos_alc_dist: parseInt(value, 10) }
      }
      return org
    })
    setOrganizaciones(newOrganizaciones)
  }

  // Función para enviar los votos provinciales y distritales
  const handleSubmit = async () => {
    const result = await fetchData('monitoreo/votos/provinciales', { isTokenReq: true }, 'POST', {
      row,
      organizaciones,
      nulos,
      blancos,
      impugnados,
      tipo: 'provincial'
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
        header={<MonitoreoActaProvEditHeader handleSubmit={handleSubmit} />}
        contentToolbar={<MonitoreoActaProvEditToolBar row={row} />}
        content={
          <MonitoreoActaProvEditTable
            row={row}
            loading={loading}
            nulos={nulos}
            setNulos={setNulos}
            blancos={blancos}
            setBlancos={setBlancos}
            impugnados={impugnados}
            setImpugnados={setImpugnados}
            organizaciones={organizaciones}
            getTotalAlcProv={getTotalAlcProv}
            getTotalAlcDist={getTotalAlcDist}
            setVotosAlcProv={setVotosAlcProv}
            setVotosAlcDist={setVotosAlcDist}
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
export default MonitoreoActaProvEdit
