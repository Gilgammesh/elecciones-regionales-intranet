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
import { startSetConsejerosSearch } from 'redux/actions/consejeros'

/*******************************************************************************************************/
// Definimos la Vista del componente Consejeros ToolBar - Nombres y Apellidos //
/*******************************************************************************************************/
const ConsejerosToolBarNomApe = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los datos por defecto de los consejeros
  const { search } = useSelector(state => state.consejeros)

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
    dispatch(startSetConsejerosSearch('nombres', [nombres, apellidos]))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <div className={clsx('grid grid-cols-12 col-span-12', 'sm:col-span-4')}>
      <FormControl className="col-span-5">
        <InputLabel htmlFor="input-consejeros-nombres">Nombres</InputLabel>
        <Input id="input-consejeros-nombres" type="text" name="nombres" value={nombres} onChange={handleInputChange} />
      </FormControl>
      <FormControl className="col-span-7">
        <InputLabel htmlFor="input-consejeros-apellidos">Apellidos</InputLabel>
        <Input
          id="input-consejeros-apellidos"
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
ConsejerosToolBarNomApe.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ConsejerosToolBarNomApe
