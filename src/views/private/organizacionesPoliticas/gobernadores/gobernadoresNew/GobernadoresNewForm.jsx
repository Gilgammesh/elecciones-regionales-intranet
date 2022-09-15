/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Tooltip, Icon, MenuItem, InputAdornment, TextField } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import { Swal } from 'configs/settings'
import { fetchData } from 'services/fetch'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  imageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  },
  imageClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#F44336',
    opacity: 0
  },
  imageItem: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      '& $imageClose': {
        opacity: 0.8
      }
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& $imageClose': {
        opacity: 1
      },
      '&:hover $imageClose': {
        opacity: 1
      }
    }
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Gobernador Nuevo Formulario //
/*******************************************************************************************************/
const GobernadoresNewForm = props => {
  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange, setForm } = props
  // Obtenemos los valores del formulario
  const { nombres, apellidos, dni, organizacion, departamento } = formValues

  // Obtenemos los datos del Usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Instanciamos los estilos
  const styles = useStyles()

  // Estado inicial de la foto
  const [foto, setFoto] = useState({
    url: '',
    type: ''
  })

  // Estado inicial de las organizaciones
  const [organizaciones, setOrganizaciones] = useState([])
  // Estado inicial de los departamentos
  const [departamentos, setDepartamentos] = useState([])

  // Efecto para obtener las organizaciones
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener la lista de organizaciones
    const getOrganizaciones = async () => {
      // Obtenemos las organizaciones con fetch
      const result = await fetchData(
        'organizaciones-politicas/gobernadores/organizaciones?page=1&pageSize=50&sort=nombre',
        {
          isTokenReq: true
        }
      )
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Recorremos la lista de organizaciones
        const promises = result.data.list.map(ele => {
          // Retornamos el elemento construido
          return (
            <MenuItem key={ele._id} value={ele._id}>
              {ele.nombre}
            </MenuItem>
          )
        })
        const listOrganizaciones = await Promise.all(promises)
        // Establecemos las organizaciones
        setOrganizaciones(listOrganizaciones)
      }
    }
    // Obtenemos las organizaciones
    getOrganizaciones()
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [])

  // Efecto para obtener los departamentos
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener la lista de departamentos
    const getDepartamentos = async () => {
      // Obtenemos los departamentos con fetch
      const result = await fetchData('ubigeo/departamentos?page=1&pageSize=50', { isTokenReq: true })
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

  // Función para agregar la foto
  const handleUploadChange = evt => {
    // Obtenemos el archivo
    const file = evt.target.files[0]

    // Si no existe un archivo retornamos
    if (!file) {
      return
    }

    // Convertimos el tamaño en bytes a MB
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
    // Si el tamaño de la foto es más de 2MB avisamos y retornamos
    if (sizeInMB > 2) {
      Swal.fire({
        title: 'La foto no puede tener mas de 2MB',
        icon: 'error'
      })
      return
    }

    // Convertimos a un lector de archivos
    const reader = new FileReader()
    reader.readAsBinaryString(file)

    // Leemos la foto y cargamos
    reader.onload = () => {
      // Guardamos los datos de la foto
      setFoto({
        url: `data:${file.type};base64,${btoa(reader.result)}`,
        type: file.type
      })
      // Guardamos el archivo de la foto en el formulario
      setForm({
        ...formValues,
        file
      })
    }

    // Si hubo un error al leer la foto
    reader.onerror = () => {
      console.log('Error al cargar la foto')
    }
  }

  // Función para remover la foto
  const handleRemoveFoto = () => {
    // Limpiamos los datos de la foto
    setFoto({
      url: '',
      type: ''
    })
    // Limpiamos la fotor del formulario
    setForm({
      ...formValues,
      file: null
    })
  }

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full p-16 sm:p-24">
      <div className="grid grid-cols-12 gap-16 mt-16 mb-16">
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
      </div>
      <div className="grid grid-cols-12 gap-16 mt-16 mb-16">
        <TextField
          select
          className="col-span-12 sm:col-span-4"
          name="organizacion"
          label="Organización Política"
          value={organizacion}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          {organizaciones}
        </TextField>
        {usuario.rol.super && departamentos && (
          <TextField
            select
            className="col-span-12 sm:col-span-4"
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
        <div className="flex flex-col col-span-12 sm:col-span-4">
          <label className="ml-6">Foto</label>
          <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
            <Tooltip title="Añadir Foto" aria-label="add" arrow>
              <label
                htmlFor="button-file"
                className={clsx(
                  styles.imageUpload,
                  'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                )}
              >
                <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  name="img"
                  onChange={handleUploadChange}
                  onClick={event => {
                    event.target.value = null
                  }}
                />
                <Icon fontSize="large" color="action">
                  add_a_photo
                </Icon>
              </label>
            </Tooltip>
            {foto.url && (
              <div
                role="button"
                tabIndex={0}
                className={clsx(
                  styles.imageItem,
                  'flex items-center justify-center relative max-w-200 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                )}
              >
                <Icon className={styles.imageClose} onClick={handleRemoveFoto}>
                  cancel
                </Icon>
                <img className="max-w-none w-auto h-full" src={foto.url} alt="foto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
GobernadoresNewForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default GobernadoresNewForm
