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
import clsx from 'clsx'
import SearchIcon from '@material-ui/icons/Search'
import validateInputRegexp from 'helpers/validateInputRegexp'
import { startSetPersonerosSearch } from 'redux/actions/personeros'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar - Nombres y Apellidos //
/*******************************************************************************************************/
const PersonerosToolBarNomApe = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de la vista personeros
  const { search } = useSelector(state => state.personeros)

  // Estado de los nombres y apellidos de búsqueda
  const [nomApe, setNomApe] = useState({
    nombres: '',
    apellidos: ''
  })
  const { nombres, apellidos } = nomApe

  // Efecto para limpiar los inputs del componente
  useEffect(() => {
    if (search.tipo !== 'nombres') {
      setNomApe({
        nombres: '',
        apellidos: ''
      })
    }
  }, [search])

  // Función para actualizar el valor de los nombres y apellidos de búsqueda
  const handleInputChange = evt => {
    const { name, value } = evt.target
    if (!validateInputRegexp('onlyLetterAndSpace', value)) {
      return
    }
    setNomApe({
      ...nomApe,
      [name]: value
    })
  }

  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  const handleSearchQuery = () => {
    dispatch(startSetPersonerosSearch('nombres', [nombres, apellidos]))
  }

  // Renderizamos el componente
  return (
    <div
      className={clsx(
        'grid grid-cols-12 col-span-12',
        rol.super ? 'sm:col-span-3' : 'sm:col-span-4'
      )}
    >
      <FormControl className="col-span-5">
        <InputLabel htmlFor="input-centros-votacion-personeros-nombres">
          Nombres
        </InputLabel>
        <Input
          id="input-centros-votacion-personeros-nombres"
          type="text"
          name="nombres"
          value={nombres}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className="col-span-7">
        <InputLabel htmlFor="input-centros-votacion-personeros-apellidos">
          Apellidos
        </InputLabel>
        <Input
          id="input-centros-votacion-personeros-apellidos"
          type="text"
          name="apellidos"
          value={apellidos}
          onChange={handleInputChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle search"
                onClick={handleSearchQuery}
                onMouseDown={handleMouseDownSearch}
                disabled={nombres === '' && apellidos === '' ? true : false}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosToolBarNomApe
