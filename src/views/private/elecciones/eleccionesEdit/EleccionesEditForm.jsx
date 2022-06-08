/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import {
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import ProgressCircle from 'components/core/Progress/ProgressCircle'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import { fetchData } from 'services/fetch'

/*******************************************************************************************************/
// Checkbox personalizado //
/*******************************************************************************************************/
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />)

/*******************************************************************************************************/
// Definimos la Vista del componente Elección Editar Formulario //
/*******************************************************************************************************/
const EleccionesEditForm = props => {
  // Obtenemos el id del usuario de los parámetros de la ruta
  const { id } = useParams()

  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange, setForm } = props
  // Obtenemos los valores del formulario
  const { anho, tipo, actual } = formValues

  // Estado del valor mínimo del año
  const [anhoMin, setAnhoMin] = useState(null)

  // Estado de carga de los datos de las elecciones
  const [loading, setLoading] = useState(true)

  // Efecto para obtener los datos de la acción con el id
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener los datos de una elección
    const getEleccion = async () => {
      // Obtenemos los datos de una eleccion con fetch
      const result = await fetchData(`elecciones/${id}`, { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Obtenemos la elección
        const { eleccion } = result.data
        // Guardamos el año minimo
        setAnhoMin(eleccion.anho)
        // Guardamos los datos del formulario
        setForm({
          anho: eleccion.anho,
          tipo: eleccion.tipo,
          actual: eleccion.actual
        })
        // Finalizamos el estado de carga
        setLoading(false)
      }
    }
    // Si existe un id
    if (id) {
      // Obtenemos los datos de la elección
      getEleccion()
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [id, setForm])

  // Si los datos de la elección están cargando
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
          className="col-span-12 sm:col-span-2"
          type="number"
          name="anho"
          label="Año"
          accept="onlyNumber"
          value={anho}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            maxLength: 4,
            min: anhoMin
          }}
          required
        />
        <TextField
          select
          className="col-span-12 sm:col-span-4"
          name="tipo"
          label="Tipo de Elección"
          value={tipo}
          onChange={handleInputChange}
          variant="outlined"
          required
        >
          <MenuItem value="regional">Elecciones Regionales </MenuItem>
          <MenuItem value="general">Elecciones Generales </MenuItem>
        </TextField>
        <FormControlLabel
          className="col-span-12 sm:col-span-3"
          control={
            <GreenCheckbox
              checked={actual}
              onChange={handleInputChange}
              name="actual"
              color="primary"
            />
          }
          label="¿Es el actual?"
        />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
EleccionesEditForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default EleccionesEditForm
