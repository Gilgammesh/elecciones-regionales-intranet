/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { fetchData } from 'services/fetch'
import { startSetAlcaldesSearch, startSetAlcaldesDepartamento } from 'redux/actions/alcaldes'

/*******************************************************************************************************/
// Definimos la Vista del componente Alcaldes ToolBar - Departamentos //
/*******************************************************************************************************/
const AlcaldesToolBarDptos = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los datos por defecto de los alcaldes
  const { departamento } = useSelector(state => state.alcaldes)

  // Estado inicial de la lista de departamentos
  const [listDepartamentos, setListDepartamentos] = useState([])

  // Efecto para obtener los departamentos
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener los departamentos
    const getDepartamentos = async () => {
      // Obtenemos los departamentos con fetch
      const result = await fetchData('ubigeo/departamentos?page=1&pageSize=100', { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos los departamentos
        setListDepartamentos(result.data.list)
      }
    }
    // Obtenemos la lista de departamentos
    getDepartamentos()
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [])

  // Función para actualizar el valor del departamento
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetAlcaldesSearch('', ''))
    dispatch(startSetAlcaldesDepartamento(value, 'todos', 'todos'))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-alcaldes-departamento">
        Departamento
      </InputLabel>
      <Select
        labelId="select-alcaldes-departamento"
        className="col-span-12"
        value={departamento}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        {listDepartamentos.length > 0 &&
          listDepartamentos.map(ele => {
            return (
              <MenuItem key={ele._id} value={ele._id}>
                {ele.nombre}
              </MenuItem>
            )
          })}
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
AlcaldesToolBarDptos.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AlcaldesToolBarDptos
