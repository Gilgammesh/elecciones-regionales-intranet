/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, Icon } from '@material-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
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
// Definimos la Vista del componente Organización Nuevo Formulario //
/*******************************************************************************************************/
const OrganizacionesNewForm = props => {
  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange, setForm } = props
  // Obtenemos los valores del formulario
  const { orden, nombre, siglas } = formValues

  // Instanciamos los estilos
  const styles = useStyles()

  // Estado inicial del logo de la organización
  const [logo, setLogo] = useState({
    url: '',
    type: ''
  })

  // Función para agregar el logo de la organización a la vista
  const handleUploadChange = evt => {
    // Obtenemos el archivo
    const file = evt.target.files[0]

    // Si no existe un archivo retornamos
    if (!file) {
      return
    }

    // Convertimos el tamaño en bytes a MB
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
    // Si el tamaño del logo es más de 2MB avisamos y retornamos
    if (sizeInMB > 2) {
      Swal.fire({
        title: 'El logo no puede tener mas de 2MB',
        icon: 'error'
      })
      return
    }

    // Convertimos a un lector de archivos
    const reader = new FileReader()
    reader.readAsBinaryString(file)

    // Leemos el logo y cargamos
    reader.onload = () => {
      // Guardamos los datos del logo
      setLogo({
        url: `data:${file.type};base64,${btoa(reader.result)}`,
        type: file.type
      })
      // Guardamos el archivo del logo en el formulario
      setForm({
        ...formValues,
        file
      })
    }

    // Si hubo un error al leer el logo
    reader.onerror = () => {
      console.log('Error al cargar el logo')
    }
  }

  // Función para remover el logo de la organización de la vista
  const handleRemoveLogo = () => {
    // Limpiamos los datos del logo
    setLogo({
      url: '',
      type: ''
    })
    // Limpiamos la imagen del formulario
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
          className="col-span-12 sm:col-span-1"
          type="number"
          name="orden"
          label="Orden"
          accept="onlyNumber"
          value={orden}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            maxLength: 2,
            min: 1,
            max: 99
          }}
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-5"
          type="text"
          name="nombre"
          label="Nombre"
          accept="onlyLetterAndSpace"
          value={nombre}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            maxLength: 30
          }}
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-2"
          type="text"
          name="siglas"
          label="Siglas"
          accept="onlyLetterAndSpace"
          value={siglas}
          onChange={handleInputChange}
          variant="outlined"
        />
        <div className="flex flex-col col-span-12 sm:col-span-4">
          <label className="ml-6">Logo</label>
          <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
            <Tooltip title="Añadir Logo" aria-label="add" arrow>
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
            {logo.url && (
              <div
                role="button"
                tabIndex={0}
                className={clsx(
                  styles.imageItem,
                  'flex items-center justify-center relative max-w-200 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                )}
              >
                <Icon className={styles.imageClose} onClick={handleRemoveLogo}>
                  cancel
                </Icon>
                <img className="max-w-none w-auto h-full" src={logo.url} alt="logo" />
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
OrganizacionesNewForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default OrganizacionesNewForm
