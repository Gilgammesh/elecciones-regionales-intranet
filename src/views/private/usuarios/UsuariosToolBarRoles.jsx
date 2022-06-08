/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { fetchData } from 'services/fetch'
import { startSetUsuariosRol } from 'redux/actions/usuarios'

/*******************************************************************************************************/
// Definimos la Vista del componente Usuarios ToolBar - Roles //
/*******************************************************************************************************/
const UsuariosToolBarRoles = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el rol por defecto de la lista de usuarios
  const { rol } = useSelector(state => state.usuarios)

  // Estado inicial de la lista de roles
  const [listRoles, setListRoles] = useState([])

  // Efecto para obtener los roles
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener los roles
    const getRoles = async () => {
      // Obtenemos los roles con fetch
      const result = await fetchData('usuarios/roles?page=1&pageSize=50', {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Establecemos los roles
        setListRoles(result.data.list)
      }
    }
    // Obtenemos la lista de roles
    getRoles()
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [])

  // Función para actualizar el valor del rol
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetUsuariosRol(value))
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-3">
      <InputLabel shrink id="select-usuarios-rol">
        Tipo de Usuario
      </InputLabel>
      <Select
        labelId="select-usuarios-rol"
        className="col-span-12"
        value={rol}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="todos">--Todos--</MenuItem>
        {listRoles.length > 0 &&
          listRoles.map(ele => {
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
// Exportamos el componente //
/*******************************************************************************************************/
export default UsuariosToolBarRoles
