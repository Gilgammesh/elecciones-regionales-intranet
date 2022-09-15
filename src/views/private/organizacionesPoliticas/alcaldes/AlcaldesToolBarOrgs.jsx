/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { fetchData } from 'services/fetch'
import clsx from 'clsx'
import { startSetAlcaldesSearch, startSetAlcaldesOrganizacion } from 'redux/actions/alcaldes'

/*******************************************************************************************************/
// Definimos la Vista del componente Alcaldes ToolBar - Organizaciones //
/*******************************************************************************************************/
const AlcaldesToolBarOrgs = props => {
  // Obtenemos las propiedades del componente
  const { resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de los alcaldes
  const { organizacion } = useSelector(state => state.alcaldes)

  // Estado inicial de la lista de organizaciones
  const [listOrganizaciones, setListOrganizaciones] = useState([])

  // Efecto para obtener las organizaciones
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener las organizaciones
    const getOrganizaciones = async () => {
      // Obtenemos las organizaciones con fetch
      const result = await fetchData(
        'organizaciones-politicas/alcaldes/organizaciones?page=1&pageSize=50&sort=nombre',
        { isTokenReq: true }
      )
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos las organizaciones
        setListOrganizaciones(result.data.list)
      }
    }
    // Obtenemos la lista de organizaciones
    getOrganizaciones()
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [])

  // Función para actualizar el valor de la organizacion
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetAlcaldesSearch('', ''))
    dispatch(startSetAlcaldesOrganizacion(value))
    resetPages()
  }

  // Renderizamos el componente
  return (
    <FormControl className={clsx('col-span-12', rol.super ? 'sm:col-span-2' : 'sm:col-span-3')}>
      <InputLabel shrink id="select-alcaldes-organizaciones">
        Organización Política
      </InputLabel>
      <Select
        labelId="select-alcaldes-organizaciones"
        className="col-span-12"
        value={organizacion}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        {listOrganizaciones.length > 0 &&
          listOrganizaciones.map(ele => {
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
AlcaldesToolBarOrgs.propTypes = {
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AlcaldesToolBarOrgs
