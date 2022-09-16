/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import validateInputRegexp from 'helpers/validateInputRegexp'
import clsx from 'clsx'
import {
  startSetMonitoreoSearch,
  startSetMonitoreoDepartamento,
  startSetMonitoreoProvincia
} from 'redux/actions/monitoreo'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo ToolBar - Número Mesa //
/*******************************************************************************************************/
const MonitoreoToolBarMesa = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de monitoreo
  const { search } = useSelector(state => state.monitoreo)

  // Estado del número de mesa de búsqueda
  const [mesa, setMesa] = useState('')

  // Efecto para limpiar los inputs del componente
  useEffect(() => {
    if (search.tipo !== 'mesa') {
      setMesa('')
    }
  }, [search])

  // Función para actualizar el valor del número de mesa de búsqueda
  const handleInputChange = evt => {
    const { value } = evt.target
    if (!validateInputRegexp('onlyNumber', value)) {
      return
    }
    setMesa(value)
  }

  // Función para prevenir el mouse para abajo
  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  // Función para realizar la búsqueda
  const handleSearchQuery = () => {
    dispatch(startSetMonitoreoSearch('mesa', mesa))
    if (rol.super) {
      dispatch(startSetMonitoreoDepartamento('todos', 'todos', 'todos'))
    } else {
      dispatch(startSetMonitoreoProvincia('todos', 'todos'))
    }
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className={clsx('col-span-12', rol.super ? 'sm:col-span-1' : 'sm:col-span-2')}>
      <InputLabel htmlFor="input-monitoreo-mesa">Mesa</InputLabel>
      <Input
        id="input-monitoreo-mesa"
        type="text"
        value={mesa}
        onChange={handleInputChange}
        inputProps={{ maxLength: 6 }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle search"
              onClick={handleSearchQuery}
              onMouseDown={handleMouseDownSearch}
              // disabled={mesa === '' ? true : false}
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
MonitoreoToolBarMesa.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoToolBarMesa
