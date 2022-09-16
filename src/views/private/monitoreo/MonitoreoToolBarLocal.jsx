/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
  startSetMonitoreoSearch,
  startSetMonitoreoDepartamento,
  startSetMonitoreoProvincia
} from 'redux/actions/monitoreo'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo ToolBar - Local //
/*******************************************************************************************************/
const MonitoreoToolBarLocal = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de monitoreo
  const { search } = useSelector(state => state.monitoreo)

  // Estado del local de búsqueda
  const [local, setLocal] = useState('')

  // Efecto para limpiar los inputs del componente
  useEffect(() => {
    if (search.tipo !== 'local') {
      setLocal('')
    }
  }, [search])

  // Función para actualizar el valor del local de búsqueda
  const handleInputChange = evt => {
    const { value } = evt.target
    setLocal(value)
  }

  // Función para prevenir el mouse para abajo
  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  // Función para realizar la búsqueda
  const handleSearchQuery = () => {
    dispatch(startSetMonitoreoSearch('local', local))
    if (rol.super) {
      dispatch(startSetMonitoreoDepartamento('todos', 'todos', 'todos'))
    } else {
      dispatch(startSetMonitoreoProvincia('todos', 'todos'))
    }
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel htmlFor="input-monitoreo-local">Local</InputLabel>
      <Input
        id="input-monitoreo-local"
        type="text"
        value={local}
        onChange={handleInputChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle search"
              onClick={handleSearchQuery}
              onMouseDown={handleMouseDownSearch}
              // disabled={local === '' ? true : false}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoToolBarLocal.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoToolBarLocal
