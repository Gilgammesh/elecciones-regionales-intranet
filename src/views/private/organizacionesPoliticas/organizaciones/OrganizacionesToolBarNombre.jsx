/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core'
import clsx from 'clsx'
import SearchIcon from '@material-ui/icons/Search'
import validateInputRegexp from 'helpers/validateInputRegexp'
import { startSetOrganizacionesNombre } from 'redux/actions/organizaciones'

/*******************************************************************************************************/
// Definimos la Vista del componente Organizaciones ToolBar - Nombre //
/*******************************************************************************************************/
const OrganizacionesToolBarNombre = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Valor del nombre buscado
  const [nombre, setNombre] = useState('')

  // Función para actualizar el valor del nombre
  const handleInputChange = evt => {
    const { value } = evt.target
    if (!validateInputRegexp('onlyLetterAndSpace', value)) {
      return
    }
    setNombre(value)
  }

  // Función para prevenir el mouse para abajo
  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  // Función para realizar la búsqueda
  const handleSearchQuery = () => {
    dispatch(startSetOrganizacionesNombre(nombre))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <div className={clsx('grid grid-cols-12 col-span-12', 'sm:col-span-4')}>
      <FormControl className="col-span-12">
        <InputLabel htmlFor="input-organizaciones-nombre">Nombre</InputLabel>
        <Input
          id="input-organizaciones-nombre"
          type="text"
          value={nombre}
          onChange={handleInputChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle search"
                onClick={handleSearchQuery}
                onMouseDown={handleMouseDownSearch}
                disabled={nombre === '' ? true : false}
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
OrganizacionesToolBarNombre.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default OrganizacionesToolBarNombre
