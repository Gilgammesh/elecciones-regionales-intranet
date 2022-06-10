/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Icon,
  Input
} from '@material-ui/core'
import { fetchData } from 'services/fetch'
import { normalizar } from 'helpers/texts'
import { startSetMesasLocal } from 'redux/actions/mesas'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas ToolBar - Locales //
/*******************************************************************************************************/
const MesasToolBarLocal = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de las mesas de votación
  const { departamento, provincia, distrito, local } = useSelector(
    state => state.mesas
  )

  // Estado inicial de la lista de locales
  const [dataLocales, setDataLocales] = useState([])
  const [listLocales, setListLocales] = useState([])

  // Estado inicial de la caja de búsqueda
  const [searchLocal, setSearchLocal] = useState('')

  // Efecto para obtener los locales
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener los locales
    const getLocales = async (dpto, prov, dist) => {
      // Obtenemos los locales con fetch
      const result = await fetchData(
        `centros-votacion/getLocales?departamento=${dpto}&provincia=${prov}&distrito=${dist}`,
        {
          isTokenReq: true
        }
      )
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos los locales
        setDataLocales(result.data.list)
        setListLocales(result.data.list)
      }
    }
    if (departamento === 'todos') {
      setDataLocales([])
      setListLocales([])
    } else {
      // Si es un superusuario
      if (usuario.rol.super) {
        // Obtenemos la lista de locales con el departamento, provincia y distrito
        getLocales(departamento, provincia, distrito)
      } else {
        // Obtenemos la lista de locales con el departamento, provincia y distrito
        getLocales(usuario.departamento.codigo, provincia, distrito)
      }
    }
    // Limpiamos la caja de búsqueda
    setSearchLocal('')
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [usuario, departamento, provincia, distrito])

  // Función para actualizar el valor del local
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetMesasLocal(value))
  }

  // Función para cambiar el valor de la caja de búsqueda
  const handleInputSearch = async evt => {
    // Obtenemos el valor
    const { value } = evt.target
    // Establecemos el valor de la caja
    setSearchLocal(value)
    // Normalizamos el valor
    const value_ = normalizar(value)
    // Recorremos la lista para filtrar los datos buscados
    const promises = listLocales
      .map(ele => ele)
      .filter(ele => {
        return normalizar(ele._id).includes(value_)
      })
    const filter = await Promise.all(promises)
    // Guardamos la data filtrada
    setDataLocales(filter)
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-centros-votacion-local">
        Local
      </InputLabel>
      <Select
        labelId="select-centros-votacion-local"
        className="col-span-12"
        value={local}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">{`--Todos (${listLocales.length}) --`}</MenuItem>
        <MenuItem
          onKeyDown={evt => evt.stopPropagation()}
          className="px-6"
          style={{ cursor: 'default', pointerEvents: 'none' }}
        >
          <Paper
            className="flex items-center w-full px-8 py-4 rounded-8"
            elevation={1}
            style={{ cursor: 'default', pointerEvents: 'auto' }}
          >
            <Icon color="action" onClick={evt => evt.stopPropagation()}>
              search
            </Icon>
            <Input
              placeholder="Buscar local"
              className="flex flex-1 mx-8"
              disableUnderline
              fullWidth
              value={searchLocal}
              inputProps={{
                'aria-label': 'Buscar'
              }}
              onChange={handleInputSearch}
              onClick={evt => evt.stopPropagation()}
            />
          </Paper>
        </MenuItem>
        {dataLocales.length > 0 &&
          dataLocales.map((ele, index) => {
            return (
              <MenuItem key={index} value={ele._id}>
                {ele._id}
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
export default MesasToolBarLocal
