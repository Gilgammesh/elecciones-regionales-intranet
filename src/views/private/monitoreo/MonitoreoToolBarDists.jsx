/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { fetchData } from 'services/fetch'
import { startSetMonitoreoSearch, startSetMonitoreoDistrito } from 'redux/actions/monitoreo'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo ToolBar - Distritos //
/*******************************************************************************************************/
const MonitoreoToolBarDists = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el rol del usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de monitoreo
  const { departamento, provincia, distrito } = useSelector(state => state.monitoreo)

  // Estado inicial de la lista de distritos
  const [listDistritos, setListDistritos] = useState([])

  // Efecto para obtener los distritos
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener los distritos
    const getDistritos = async (dpto, prov) => {
      // Obtenemos los distritos con fetch
      const result = await fetchData(`ubigeo/distritos_?departamento=${dpto}&provincia=${prov}&page=1&pageSize=100`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos los distritos
        setListDistritos(result.data.list)
      }
    }
    // Si es un superusuario
    if (usuario.rol.super) {
      // Si departamento o provincia es igual a todos
      if (departamento === 'todos' || provincia === 'todos') {
        setListDistritos([])
      }
      if (provincia !== 'todos') {
        // Obtenemos la lista de distritos con el departamento y provincia
        getDistritos(departamento, provincia)
      }
    } else {
      if (provincia !== 'todos') {
        // Obtenemos la lista de distritos con el departamento y provincia
        getDistritos(usuario.departamento._id, provincia)
      }
    }
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [usuario, departamento, provincia])

  // Función para actualizar el valor del distrito
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetMonitoreoSearch('', ''))
    dispatch(startSetMonitoreoDistrito(value))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-monitoreo-distrito">
        Distrito
      </InputLabel>
      <Select
        labelId="select-monitoreo-distrito"
        className="col-span-12"
        value={listDistritos.length > 0 ? distrito : 'todos'}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        {listDistritos.length > 0 &&
          listDistritos.map(ele => {
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
MonitoreoToolBarDists.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoToolBarDists
