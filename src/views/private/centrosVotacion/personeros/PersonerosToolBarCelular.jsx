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
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar - Celular //
/*******************************************************************************************************/
const PersonerosToolBarCelular = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los estados por defecto de la vista personeros
  const { search } = useSelector(state => state.personeros)

  // Estado del celular de búsqueda
  const [celular, setCelular] = useState('')

  // Efecto para limpiar los inputs del componente
  useEffect(() => {
    if (search.tipo !== 'celular') {
      setCelular('')
    }
  }, [search])

  // Función para actualizar el valor del celular de búsqueda
  const handleInputChange = evt => {
    const { value } = evt.target
    if (!validateInputRegexp('onlyNumber', value)) {
      return
    }
    setCelular(value)
  }

  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  const handleSearchQuery = () => {
    dispatch(startSetPersonerosSearch('celular', celular))
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel htmlFor="input-centros-votacion-personeros-celular">
        Celular
      </InputLabel>
      <Input
        id="input-centros-votacion-personeros-celular"
        type="text"
        value={celular}
        onChange={handleInputChange}
        inputProps={{
          maxLength: 9
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle search"
              onClick={handleSearchQuery}
              onMouseDown={handleMouseDownSearch}
              disabled={celular === '' ? true : false}
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
export default PersonerosToolBarCelular
