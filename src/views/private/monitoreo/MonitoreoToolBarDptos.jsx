/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { fetchData } from 'services/fetch'
import { startSetMonitoreoSearch, startSetMonitoreoDepartamento } from 'redux/actions/monitoreo'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo ToolBar - Departamentos //
/*******************************************************************************************************/
const MonitoreoToolBarDptos = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los datos por defecto de monitoreo
  const { departamento } = useSelector(state => state.monitoreo)

  // Estado inicial de la lista de departamentos
  const [listDepartamentos, setListDepartamentos] = useState([])

  // Efecto para obtener los departamentos
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener los departamentos
    const getDepartamentos = async () => {
      // Obtenemos los departamentos con fetch
      const result = await fetchData('ubigeo/departamentos?page=1&pageSize=100', { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos los departamentos
        setListDepartamentos(result.data.list)
      }
    }
    // Obtenemos la lista de departamentos
    getDepartamentos()
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [])

  // Función para actualizar el valor del departamento
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetMonitoreoSearch('', ''))
    dispatch(startSetMonitoreoDepartamento(value, 'todos', 'todos'))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-1">
      <InputLabel shrink id="select-monitoreo-departamento">
        Departamento
      </InputLabel>
      <Select
        labelId="select-monitoreo-departamento"
        className="col-span-12"
        value={departamento}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        {listDepartamentos.length > 0 &&
          listDepartamentos.map(ele => {
            return (
              <MenuItem key={ele._id} value={ele._id}>
                {ele.nombre}
              </MenuItem>
            )
          })}
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoToolBarDptos.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoToolBarDptos
