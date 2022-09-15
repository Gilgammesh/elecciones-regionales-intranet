/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core'
import clsx from 'clsx'
import SearchIcon from '@material-ui/icons/Search'
import validateInputRegexp from 'helpers/validateInputRegexp'
import { startSetPersonerosSearch } from 'redux/actions/personeros'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar - Nombres y Apellidos //
/*******************************************************************************************************/
const PersonerosToolBarNomApe = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de los personeros
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

  // Función para prevenir el mouse para abajo
  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  // Función para realizar la búsqueda
  const handleSearchQuery = () => {
    dispatch(startSetPersonerosSearch('nombres', [nombres, apellidos]))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <div className={clsx('grid grid-cols-12 col-span-12', rol.super ? 'sm:col-span-3' : 'sm:col-span-4')}>
      <FormControl className="col-span-5">
        <InputLabel htmlFor="input-centros-votacion-personeros-nombres">Nombres</InputLabel>
        <Input
          id="input-centros-votacion-personeros-nombres"
          type="text"
          name="nombres"
          value={nombres}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className="col-span-7">
        <InputLabel htmlFor="input-centros-votacion-personeros-apellidos">Apellidos</InputLabel>
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
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosToolBarNomApe.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosToolBarNomApe
