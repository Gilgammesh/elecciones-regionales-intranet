/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import clsx from 'clsx'
import { startSetPersonerosSearch, startSetPersonerosEstado } from 'redux/actions/personeros'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros ToolBar - Estados //
/*******************************************************************************************************/
const PersonerosToolBarEstados = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de la vista personeros
  const { estado } = useSelector(state => state.personeros)

  // Función para actualizar el valor del estado del personero
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetPersonerosSearch('', ''))
    dispatch(startSetPersonerosEstado(value))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className={clsx('col-span-12', rol.super ? 'sm:col-span-1' : 'sm:col-span-2')}>
      <InputLabel shrink id="select-centros-votacion-personeros-estado">
        Habilitado
      </InputLabel>
      <Select
        labelId="select-centros-votacion-personeros-estado"
        className="col-span-12"
        value={estado}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        <MenuItem value={true} className="text-green">
          Si
        </MenuItem>
        <MenuItem value={false} className="text-red">
          No
        </MenuItem>
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosToolBarEstados.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosToolBarEstados
