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
import { startSetMesasMesa } from 'redux/actions/mesas'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas ToolBar - Mesas //
/*******************************************************************************************************/
const MesasToolBarMesa = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de las mesas de votación
  const { departamento, provincia, distrito, local, mesa } = useSelector(
    state => state.mesas
  )

  // Estado inicial de la lista de mesas
  const [dataMesas, setDataMesas] = useState([])
  const [listMesas, setListMesas] = useState([])

  // Estado inicial de la caja de búsqueda
  const [searchMesa, setSearchMesa] = useState('')

  // Efecto para obtener las mesas
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener las mesas
    const getMesas = async (dpto, prov, dist, loc) => {
      // Obtenemos las mesas con fetch
      const result = await fetchData(
        `centros-votacion/getMesas?departamento=${dpto}&provincia=${prov}&distrito=${dist}&local=${loc}`,
        {
          isTokenReq: true
        }
      )
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos las mesas
        setDataMesas(result.data.list)
        setListMesas(result.data.list)
      }
    }

    if (departamento === 'todos') {
      setDataMesas([])
      setListMesas([])
    } else {
      // Si es un superusuario
      if (usuario.rol.super) {
        // Obtenemos la lista de mesas con el departamento, provincia y distrito
        getMesas(departamento, provincia, distrito, local)
      } else {
        // Obtenemos la lista de mesas con el departamento, provincia y distrito
        getMesas(usuario.departamento.codigo, provincia, distrito, local)
      }
    }
    // Limpiamos la caja de búsqueda
    setSearchMesa('')
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [usuario, departamento, provincia, distrito, local])

  // Función para actualizar el valor de la mesa
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetMesasMesa(value))
  }

  // Función para cambiar el valor de la caja de búsqueda
  const handleInputSearch = async evt => {
    // Obtenemos el valor
    const { value } = evt.target
    // Establecemos el valor de la caja
    setSearchMesa(value)
    // Normalizamos el valor
    const value_ = await normalizar(value)
    // Recorremos la lista para filtrar los datos buscados
    const promises = listMesas
      .map(ele => ele)
      .filter(ele => {
        return normalizar(ele._id).includes(value_)
      })
    const filter = await Promise.all(promises)
    // Guardamos la data filtrada
    setDataMesas(filter)
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-centros-votacion-mesa">
        Mesa
      </InputLabel>
      <Select
        labelId="select-centros-votacion-mesa"
        className="col-span-12"
        value={mesa}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">{`--Todas (${listMesas.length}) --`}</MenuItem>
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
            <Icon color="action" onClick={event => event.stopPropagation()}>
              search
            </Icon>
            <Input
              placeholder="Buscar mesa"
              className="flex flex-1 mx-8"
              disableUnderline
              fullWidth
              value={searchMesa}
              inputProps={{
                'aria-label': 'Buscar'
              }}
              onChange={handleInputSearch}
              onClick={event => event.stopPropagation()}
            />
          </Paper>
        </MenuItem>
        {dataMesas.length > 0 &&
          dataMesas.map((ele, index) => {
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
export default MesasToolBarMesa
