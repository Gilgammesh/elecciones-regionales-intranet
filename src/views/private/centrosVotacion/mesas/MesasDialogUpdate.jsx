/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Slide,
  Tooltip,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SyncIcon from '@material-ui/icons/Sync'
import { Icon as Iconify } from '@iconify/react'
import fileExcel from '@iconify-icons/mdi/file-excel'
import { fetchData } from 'services/fetch'
import clsx from 'clsx'
import { validateFetchData } from 'helpers/validateFetchData'
import { startResetMesas } from 'redux/actions/mesas'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#FFFBC6'
  },
  downloadTemplate: {
    background: 'rgba(233,62,53,0.2)',
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  },
  excelUpload: {
    background: '#ECECEC',
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  },
  processBtn: {
    animation: '$rotating 3s linear infinite'
  },
  '@keyframes rotating': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(-360deg)'
    }
  }
}))

/*******************************************************************************************************/
// Transición del Modal hacia la dirección de arriba //
/*******************************************************************************************************/
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas - Importar Excel //
/*******************************************************************************************************/
const MesasDialogUpdate = props => {
  // Obtenemos las propiedades del componente
  const { open, setOpen, setErrors, setOpenErrors } = props

  // Obtenemos los estados por defecto de la vista mesas
  const { departamento } = useSelector(state => state.mesas)

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Instanciamos los estilos
  const styles = useStyles()

  // Tipo de procesamiento de mesas de votación
  const defaultTipo = 'new'
  const [tipo, setTipo] = useState(defaultTipo)

  // Url del template
  const [url, setUrl] = useState(null)

  // Datos del archivo excel
  const [file, setFile] = useState({
    size: '',
    type: '',
    name: ''
  })

  // Estado de los botones
  const [disabled, setDisabled] = useState(false)

  // Valor del estado cuando se procesa la información
  const [procesando, setProcesando] = useState(false)

  // Efecto para limpiar el archivo excel adjunto
  useEffect(() => {
    let mounted = true
    // Función para crear la plantilla de las mesas
    const createTemplate = async () => {
      setUrl(null)
      const result = await fetchData(
        `centros-votacion/mesas/template`,
        {
          isTokenReq: true
        },
        'POST',
        { tipo, departamento }
      )
      if (mounted && result && result.data.status) {
        setUrl(result.data.url)
      }
    }
    if (open) {
      setFile({
        file: null,
        size: '',
        type: '',
        name: ''
      })
      if (tipo) createTemplate()
    }
    return () => {
      mounted = false
    }
  }, [open, tipo, departamento])

  // Función para evitar cerrar el modal ante Escape o presionar el backdrop
  const handleCloseDialog = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false)
    }
  }

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false)
  }

  // Función para cambiar el valor del tipo de procesamiento de mesas de votación
  const handleRadioChange = evt => {
    const { value } = evt.target
    setTipo(value)
  }

  // Función para agregar el archivo excel
  const handleUploadChange = evt => {
    // Obtenemos el archivo
    const file = evt.target.files[0]
    // Si no existe un archivo retornamos
    if (!file) {
      return
    }
    // Convertimos el tamaño en bytes a MB
    const sizeInMB = (((file.size / (1024 * 1024)) * 100) / 100).toFixed(2)
    // Convertimos a un lector de archivos
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    // Leemos el archivo excel y cargamos
    reader.onload = () => {
      setFile({
        file: file,
        size: sizeInMB,
        type: file.type,
        name: file.name
      })
    }
    // Si hubo un error al leer el archivo excel
    reader.onerror = () => {
      console.log('Error al cargar el excel')
    }
  }

  // Función para procesar el archivo excel
  const handleProcessFile = async () => {
    // Creamos la data como un FormData
    let formData = new FormData()
    formData.append('file', file.file)
    formData.append('tipo', tipo)
    formData.append('departamento', departamento)

    // Iniciamos el proceso
    setProcesando(true)
    // Deshabilitamos los botones
    setDisabled(true)

    // Importamos las mesas de votación
    const result = await fetchData(
      'centros-votacion/mesas/import-excel',
      { isTokenReq: true, contentType: 'multipart/form-data' },
      'POST',
      formData
    )
    // Validamos el resultado
    if (validateFetchData(result)) {
      if (result.data.errores && result.data.errores.length > 0) {
        // Mostramos los errores en la importación
        setErrors(result.data.errores)
        setOpenErrors(true)
      } else {
        // Reseteamos los datos de mesas de votación
        dispatch(startResetMesas())
      }
      // Finalizamos el proceso
      setProcesando(false)
      // Habilitamos los botones
      setDisabled(false)
      // Cerramos el modal de carga
      setOpen(false)
    }
  }

  // Renderizamos el componente
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={(event, reason) => handleCloseDialog(event, reason)}
      aria-labelledby="attach-excel"
    >
      <DialogContent>
        <div className="grid grid-cols-12 gap-16 mt-16 mb-16">
          <div className="flex flex-col col-span-12 justify-center items-center mb-20">
            <div className="flex justify-center flex-wrap mb-10">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue={defaultTipo}
                value={tipo}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="new" control={<Radio color="secondary" />} label="Nuevas mesas" />
                <FormControlLabel value="update" control={<Radio color="secondary" />} label="Actualizar mesas" />
              </RadioGroup>
            </div>
            {tipo === 'new' && (
              <Paper className={clsx(styles.paper, 'mb-20 p-16 text-justify')}>
                <p className="mt-6">
                  <b>Primero:</b> Descargue la plantilla de excel.
                </p>
                <p className="mt-6">
                  <b>Segundo:</b> Llene la información de la plantilla con los datos de las mesas y sus respectivos
                  locales de votación.
                </p>
                <p className="mt-6">
                  <b>Tercero:</b> Si existen personeros disponibles asignelos.
                </p>
                <p className="mt-6">
                  <b>Cuarto:</b> Adjunte la plantilla llena y procese la información.
                </p>
              </Paper>
            )}
            {tipo === 'update' && (
              <Paper className={clsx(styles.paper, 'mb-20 p-16 text-justify')}>
                <p className="mt-6">
                  <b>Primero:</b> Descargue la plantilla de excel con las mesas de votación.
                </p>
                <p className="mt-6">
                  <b>Segundo:</b> Asigne los personeros disponibles a su mesa ó local de votación correspondiente.
                </p>
                <p className="mt-6">
                  <b>Tercero:</b> Adjunte la plantilla llena y procese la información.
                </p>
              </Paper>
            )}
            <div className="flex justify-center flex-wrap mt-10">
              <Tooltip title="Descargar Plantilla" aria-label="add" arrow>
                {procesando || !url ? (
                  <label
                    className={clsx(
                      styles.downloadTemplate,
                      'flex items-center justify-center relative min-w-128 h-128 rounded-8 ml-8 mr-36 mb-16 overflow-hidden shadow-1'
                    )}
                  >
                    <div className="flex flex-col justify-center items-center px-16">
                      <Icon fontSize="large" color="action">
                        cloud_download
                      </Icon>
                      <label className="font-500 mt-20">Descargar Plantilla</label>
                    </div>
                  </label>
                ) : (
                  <Link
                    className={clsx(
                      styles.downloadTemplate,
                      'flex items-center justify-center relative min-w-128 h-128 rounded-8 ml-8 mr-36 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                    )}
                    to={{
                      pathname: url
                    }}
                    target="_blank"
                    download
                  >
                    <div className="flex flex-col justify-center items-center px-16">
                      <Icon fontSize="large" color="action">
                        cloud_download
                      </Icon>
                      <label className="font-500 mt-20 cursor-pointer">Descargar Plantilla</label>
                    </div>
                  </Link>
                )}
              </Tooltip>
              <Tooltip title="Adjuntar plantilla" aria-label="add" arrow>
                <label
                  htmlFor="button-file"
                  className={clsx(
                    styles.excelUpload,
                    'flex items-center justify-center relative min-w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden shadow-1',
                    procesando ? '' : 'cursor-pointer hover:shadow-5'
                  )}
                >
                  <input
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    className="hidden"
                    id="button-file"
                    type="file"
                    name="file"
                    onChange={handleUploadChange}
                    onClick={event => {
                      event.target.value = null
                    }}
                    disabled={procesando}
                  />
                  {file.size && file.size > 0 ? (
                    <div className="flex flex-col justify-center items-center px-16">
                      <Iconify className="mb-10" width="48" icon={fileExcel} color="#008000" />
                      <label className="font-500 mb-20">
                        {file.name} ({file.size} MB)
                      </label>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center px-16">
                      <Icon fontSize="large" color="action">
                        attach_file
                      </Icon>
                      <label className="font-500 mt-20">Adjuntar plantilla</label>
                    </div>
                  )}
                </label>
              </Tooltip>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="mb-10">
        {file.size && file.size > 0 && (
          <Button
            className="whitespace-no-wrap normal-case"
            variant="contained"
            startIcon={<SyncIcon className={clsx('', procesando && styles.processBtn)} />}
            color="primary"
            onClick={handleProcessFile}
            disabled={disabled}
          >
            {procesando ? 'Procesando' : 'Procesar'}
          </Button>
        )}
        <Button onClick={handleClose} color="primary" disabled={disabled}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MesasDialogUpdate.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setOpenErrors: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasDialogUpdate
