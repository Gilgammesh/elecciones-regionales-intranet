/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import validateInputRegexp from 'helpers/validateInputRegexp'
import { startSetPersonerosSearch } from 'redux/actions/personeros'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar - Dni //
/*******************************************************************************************************/
const PersonerosToolBarDni = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los estados por defecto de la vista personeros
  const { search } = useSelector(state => state.personeros)

  // Estado del dni de búsqueda
  const [dni, setDni] = useState('')

  // Efecto para limpiar los inputs del componente
  useEffect(() => {
    if (search.tipo !== 'dni') {
      setDni('')
    }
  }, [search])

  // Función para actualizar el valor del dni de búsqueda
  const handleInputChange = evt => {
    const { value } = evt.target
    if (!validateInputRegexp('onlyNumber', value)) {
      return
    }
    setDni(value)
  }

  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  const handleSearchQuery = () => {
    dispatch(startSetPersonerosSearch('dni', dni))
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel htmlFor="input-centros-votacion-personeros-dni">
        DNI
      </InputLabel>
      <Input
        id="input-centros-votacion-personeros-dni"
        type="text"
        value={dni}
        onChange={handleInputChange}
        inputProps={{
          maxLength: 8
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle search"
              onClick={handleSearchQuery}
              onMouseDown={handleMouseDownSearch}
              disabled={dni === '' ? true : false}
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
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosToolBarDni
