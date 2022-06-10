/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Icon, InputAdornment, MenuItem, TextField } from '@material-ui/core'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import { fetchData } from 'services/fetch'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros - Nuevo Formulario //
/*******************************************************************************************************/
const PersonerosNewForm = props => {
  // Obtenemos los datos del Usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange } = props
  const { nombres, apellidos, dni, celular, departamento } = formValues

  // Estado inicial de los departamentos
  const [departamentos, setDepartamentos] = useState([])

  // Efecto para obtener los departamentos
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener la lista de departamentos
    const getDepartamentos = async () => {
      // Obtenemos los departamentos con fetch
      const result = await fetchData(
        'ubigeo/departamentos?page=1&pageSize=50',
        { isTokenReq: true }
      )
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Recorremos la lista de departamentos
        const promises = result.data.list.map(ele => {
          // Retornamos el elemento construido
          return (
            <MenuItem key={ele._id} value={ele._id}>
              {ele.nombre}
            </MenuItem>
          )
        })
        const listDepartamentos = await Promise.all(promises)
        // Establecemos los departamentos
        setDepartamentos(listDepartamentos)
      }
    }
    // Si es un superusuario
    if (usuario.rol.super) {
      // Obtenemos los departamentos
      getDepartamentos()
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [usuario.rol])

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full p-16 sm:p-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <TextFieldFormsy
          className="col-span-12 sm:col-span-4"
          type="text"
          name="nombres"
          label="Nombres"
          accept="onlyLetterAndSpace"
          value={nombres}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-4"
          type="text"
          name="apellidos"
          label="Apellidos"
          accept="onlyLetterAndSpace"
          value={apellidos}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-2"
          type="text"
          name="dni"
          label="DNI"
          accept="onlyNumber"
          value={dni}
          onChange={handleInputChange}
          validations={{
            minLength: 8,
            maxLength: 8
          }}
          validationErrors={{
            minLength: 'El dni debe tener 08 dígitos',
            maxLength: 'El dni debe tener 08 dígitos'
          }}
          inputProps={{
            maxLength: 8
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  contact_mail
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-2"
          type="text"
          name="celular"
          label="Celular"
          accept="onlyNumber"
          value={celular}
          onChange={handleInputChange}
          validations={{
            minLength: 9,
            maxLength: 9
          }}
          validationErrors={{
            minLength: 'El celular debe tener 09 dígitos',
            maxLength: 'El celular debe tener 09 dígitos'
          }}
          inputProps={{
            maxLength: 9
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon className="text-20" color="action">
                  smartphone
                </Icon>
              </InputAdornment>
            )
          }}
          variant="outlined"
        />
      </div>
      <div className="grid grid-cols-12 gap-16 mt-16 mb-16">
        {usuario.rol.super && departamentos && (
          <TextField
            select
            className="col-span-12 sm:col-span-3"
            name="departamento"
            label="Departamento"
            value={departamento}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {departamentos}
          </TextField>
        )}
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosNewForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosNewForm
