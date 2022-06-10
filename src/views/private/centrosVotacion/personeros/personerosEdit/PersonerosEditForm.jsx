/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  FormControlLabel,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField
} from '@material-ui/core'
import ProgressCircle from 'components/core/Progress/ProgressCircle'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import IosSwitch from 'components/core/Switches/IosSwitch'
import { fetchData } from 'services/fetch'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros - Editar Formulario //
/*******************************************************************************************************/
const PersonerosEditForm = props => {
  // Obtenemos el id del usuario de los parámetros de la ruta
  const { id } = useParams()

  // Obtenemos lso datos del Usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange, setForm } = props
  const { nombres, apellidos, dni, celular, password, estado, departamento } =
    formValues

  // Estado inicial para mostrar la contraseña
  const [showPassword, setShowPassword] = useState(false)

  // Estado inicial de los departamentos
  const [departamentos, setDepartamentos] = useState([])

  // Estado de carga de los datos de usuario
  const [loading, setLoading] = useState(true)

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

  // Efecto para obtener los datos del personero con el id
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener los datos de un personero
    const getPersonero = async () => {
      // Obtenemos los datos de un personero con fetch
      const result = await fetchData(`centros-votacion/personeros/${id}`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Obtenemos el personero
        const { personero } = result.data
        // Guardamos los datos del formulario
        setForm({
          nombres: personero.nombres,
          apellidos: personero.apellidos,
          dni: personero.dni,
          celular: personero.celular,
          password: null,
          departamento: personero.departamento
            ? personero.departamento._id
            : '',
          estado: personero.estado
        })
        // Finalizamos el estado de carga de los datos del personero
        setLoading(false)
      }
    }
    // Si existe un id
    if (id) {
      // Obtenemos los datos del personero
      getPersonero()
    }
    return () => {
      mounted = false
    }
  }, [id, usuario.rol, setForm])

  // Si los datos del personero están cargando
  if (loading) {
    // Renderizamos el componente
    return (
      <div className="flex justify-center align-center w-full">
        <div className="px-20 py-60">
          <ProgressCircle />
        </div>
      </div>
    )
  }

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
        <TextFieldFormsy
          className="col-span-12 sm:col-span-3"
          type="text"
          name="password"
          label="Contraseña"
          value={password}
          onChange={handleInputChange}
          validations={{
            minLength: 6
          }}
          validationErrors={{
            minLength: 'La contraseña debe tener mínimo 06 dígitos'
          }}
          InputProps={{
            className: 'pr-2',
            type: showPassword ? 'text' : 'password',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  <Icon className="text-20" color="action">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </Icon>
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="outlined"
        />
        <div className="flex flex-col col-span-12 sm:col-span-2">
          <div className="grid grid-cols-12 gap-16 mt-16">
            <FormControlLabel
              className="ml-0 mr-0 col-span-12 sm:col-span-3"
              control={
                <IosSwitch
                  name="estado"
                  checked={estado}
                  onChange={handleInputChange}
                />
              }
              label={estado ? 'Activado' : 'Desactivado'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosEditForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosEditForm
