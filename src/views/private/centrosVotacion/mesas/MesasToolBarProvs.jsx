/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { fetchData } from 'services/fetch'
import { startSetMesasProvincia } from 'redux/actions/mesas'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas ToolBar - Provincias //
/*******************************************************************************************************/
const MesasToolBarProvs = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el rol del usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de las mesas de votación
  const { departamento, provincia } = useSelector(state => state.mesas)

  // Estado inicial de la lista de provincias
  const [listProvincias, setListProvincias] = useState([])

  // Efecto para obtener las provincias
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener las provincias
    const getProvincias = async dpto => {
      // Obtenemos las provincias con fetch
      const result = await fetchData(
        `ubigeo/provincias?departamento=${dpto}&page=1&pageSize=100`,
        {
          isTokenReq: true
        }
      )
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos las provincias
        setListProvincias(result.data.list)
      }
    }
    // Si es un superusuario
    if (usuario.rol.super) {
      // Si departamento es igual a todos
      if (departamento === 'todos') {
        setListProvincias([])
      } else {
        // Obtenemos la lista de provincias con el departamento
        getProvincias(departamento)
      }
    } else {
      // Obtenemos la lista de provincias con el departamento
      getProvincias(usuario.departamento.codigo)
    }

    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [usuario, departamento])

  // Función para actualizar el valor de la provincia
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetMesasProvincia(value, 'todos', 'todos', 'todos'))
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-centros-votacion-provincia">
        Provincia
      </InputLabel>
      <Select
        labelId="select-centros-votacion-provincia"
        className="col-span-12"
        value={provincia}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todas--</MenuItem>
        {listProvincias.length > 0 &&
          listProvincias.map(ele => {
            return (
              <MenuItem key={ele.codigo} value={ele.codigo}>
                {ele.nombre}
              </MenuItem>
            )
          })}
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasToolBarProvs
