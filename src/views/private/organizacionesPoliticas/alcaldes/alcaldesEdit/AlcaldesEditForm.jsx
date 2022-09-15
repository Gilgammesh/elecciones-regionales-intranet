/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Tooltip, Icon, MenuItem, InputAdornment, TextField } from '@material-ui/core'
import ProgressCircle from 'components/core/Progress/ProgressCircle'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import clsx from 'clsx'
import { fetchData } from 'services/fetch'
import { Swal } from 'configs/settings'

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
// Definimos la Vista del componente Consjero Editar Formulario //
/*******************************************************************************************************/
const AlcaldesEditForm = props => {
  // Obtenemos el id del alcalde de los parámetros de la ruta
  const { id } = useParams()

  // Obtenemos las propiedades del componente
  const { setFileState, formValues, handleInputChange, setForm } = props
  // Obtenemos los valores del formulario
  const { nombres, apellidos, dni, tipo, organizacion, departamento, provincia, distrito } = formValues

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
  // Estado inicial de las provincias
  const [provincias, setProvincias] = useState([])
  // Estado inicial de los distritos
  const [distritos, setDistritos] = useState([])

  // Estado de carga de los datos del alcalde
  const [loading, setLoading] = useState(true)

  // Efecto para obtener las organizaciones
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener la lista de organizaciones
    const getOrganizaciones = async () => {
      // Obtenemos las organizaciones con fetch
      const result = await fetchData(
        'organizaciones-politicas/alcaldes/organizaciones?page=1&pageSize=50&sort=nombre',
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

  // Efecto para obtener los departamentos, provincias y distritos
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener los departamentos
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
    // Función para obtener las provincias
    const getProvincias = async dpto => {
      // Obtenemos las provincias con fetch
      const result = await fetchData(`ubigeo/provincias_?departamento=${dpto}&page=1&pageSize=100`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Recorremos la lista de provincias
        const promises = result.data.list.map(ele => {
          return (
            <MenuItem key={ele._id} value={ele._id}>
              {ele.nombre}
            </MenuItem>
          )
        })
        const listProvincias = await Promise.all(promises)
        // Establecemos las provincias
        setProvincias(listProvincias)
      }
    }
    // Función para obtener los distritos
    const getDistritos = async (dpto, prov) => {
      // Obtenemos los distritos con fetch
      const result = await fetchData(`ubigeo/distritos_?departamento=${dpto}&provincia=${prov}&page=1&pageSize=100`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Recorremos la lista de distritos
        const promises = result.data.list
          .filter(ele => ele.codigo !== '01')
          .map(ele => {
            return (
              <MenuItem key={ele._id} value={ele._id}>
                {ele.nombre}
              </MenuItem>
            )
          })
        const listDistritos = await Promise.all(promises)
        // Establecemos los distritos
        setDistritos(listDistritos)
      }
    }
    // Si es un superusuario
    if (usuario.rol.super) {
      // Obtenemos los departamentos
      getDepartamentos()
      // Si existe un departamento
      if (departamento && departamento !== '') {
        // Obtenemos la lista de provincias con el departamento
        getProvincias(departamento)
        if (provincia && provincia !== '') {
          // Obtenemos la lista de distritos con el departamento y la provincia
          getDistritos(departamento, provincia)
        }
      }
    } else {
      // Obtenemos la lista de provincias con el departamento del usuario logueado
      getProvincias(usuario.departamento._id)
      if (provincia && provincia !== '') {
        // Obtenemos la lista de distritos con el departamento y la provincia
        getDistritos(usuario.departamento._id, provincia)
      }
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [usuario, departamento, provincia])

  // Efecto para obtener los datos del alcalde con el id
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener los datos de un alcalde
    const getAlcalde = async () => {
      // Obtenemos los datos de un alcalde con fetch
      const result = await fetchData(`organizaciones-politicas/alcaldes/${id}`, { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Obtenemos el alcalde
        const { alcalde } = result.data
        // Si tiene una foto
        if (alcalde.foto) {
          setFoto({
            url: alcalde.foto,
            type: ''
          })
        }
        // Guardamos los datos del formulario
        setForm({
          nombres: alcalde.nombres,
          apellidos: alcalde.apellidos,
          dni: alcalde.dni,
          tipo: alcalde.tipo,
          organizacion: alcalde.organizacion ? alcalde.organizacion._id : '',
          departamento: alcalde.departamento ? alcalde.departamento._id : '',
          provincia: alcalde.provincia ? alcalde.provincia._id : '',
          distrito: alcalde.distrito ? alcalde.distrito._id : '',
          file: null
        })
        // Finalizamos el estado de carga de los datos del alcalde
        setLoading(false)
      }
    }
    // Si existe un id
    if (id) {
      // Obtenemos los datos del alcalde
      getAlcalde()
    }
    return () => {
      mounted = false
    }
  }, [id, setForm])

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
      // Guardamos el estado del archivo del logo
      setFileState('added')
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
    // Guardamos el estado del archivo del logo
    setFileState('removed')
  }

  // Si los datos del alcalde están cargando
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
          className="col-span-12 sm:col-span-2"
          name="tipo"
          label="Tipo"
          value={tipo}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          <MenuItem value="provincial">Provincial</MenuItem>
          <MenuItem value="distrital">Distrital</MenuItem>
        </TextField>
        {usuario.rol.super && departamentos && (
          <TextField
            select
            className="col-span-12 sm:col-span-2"
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
        {provincias && (
          <TextField
            select
            className={clsx('col-span-12', usuario.rol.super ? 'sm:col-span-3' : 'sm:col-span-4')}
            name="provincia"
            label="Provincia"
            value={provincia}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {provincias}
          </TextField>
        )}
        {tipo === 'distrital' && distritos && (
          <TextField
            select
            className={clsx('col-span-12', usuario.rol.super ? 'sm:col-span-3' : 'sm:col-span-4')}
            name="distrito"
            label="Distrito"
            value={distrito}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {distritos}
          </TextField>
        )}
      </div>
      <div className="grid grid-cols-12 gap-16 mt-16 mb-16">
        <TextField
          select
          className={clsx('col-span-12', usuario.rol.super ? 'sm:col-span-4' : 'sm:col-span-4')}
          name="organizacion"
          label="Organización Política"
          value={organizacion}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          {organizaciones}
        </TextField>
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
AlcaldesEditForm.propTypes = {
  setFileState: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AlcaldesEditForm
