/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import UpdateIcon from '@material-ui/icons/Update'
import { blue } from '@material-ui/core/colors'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import useForm from 'hooks/useForm'
import SubModulosTable from './SubModulosTable'
import {
  startAddSubmodulo,
  startUpdateSubmodulo
} from 'redux/actions/submodulos'
import { Swal } from 'configs/settings'

/*******************************************************************************************************/
// Definimos los Estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

/*******************************************************************************************************/
// Definimos los estilos del botón personalizado //
/*******************************************************************************************************/
const BlueButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700]
    }
  }
}))(Button)

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Sub Módulo Nuevo //
/*******************************************************************************************************/
const SubModulosEdit = () => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos la lista de submódulos
  const submodulos = useSelector(state => state.submodulos)

  // Estado inicial del formulario
  const initialForm = {
    orden: 1,
    tag: '',
    nombre: '',
    descripcion: '',
    type: 'item',
    url: '',
    estado: true
  }

  // Usamos el Hook personalizado de formularios
  const [formValues, handleInputChange, resetForm, setForm] =
    useForm(initialForm)
  const { orden, tag, nombre, descripcion, url } = formValues

  // Valor de la Fase Añadir o Editar
  const [fase, setFase] = useState('add')

  // Valor inicial del row que se está editando
  const [row, setRow] = useState({})

  // Función para añadir un submódulo a la lista y almacenarla en redux
  const handleAddSubMod = () => {
    if (validateAddSubMod()) {
      dispatch(startAddSubmodulo(submodulos, formValues))
      resetForm(initialForm)
    }
  }

  // Función para actualizar un submódulo
  const handleUpdateSubMod = () => {
    if (validateUpdateSubMod()) {
      dispatch(startUpdateSubmodulo(submodulos, formValues, row.orden))
      resetForm(initialForm)
      setFase('add')
      setRow({})
    }
  }

  // Función para validar el añadir un nuevo submódulo
  const validateAddSubMod = () => {
    if (
      submodulos.filter(ele => parseInt(ele.orden, 10) === parseInt(orden, 10))
        .length > 0
    ) {
      Swal.fire({
        title: 'Ya existe un submódulo con este orden',
        icon: 'error'
      })
      return false
    }
    if (submodulos.filter(ele => ele.tag === tag).length > 0) {
      Swal.fire({
        title: 'Ya existe un submódulo con este tag',
        icon: 'error'
      })
      return false
    }
    if (submodulos.filter(ele => ele.nombre === nombre).length > 0) {
      Swal.fire({
        title: 'Ya existe un submódulo con este nombre',
        icon: 'error'
      })
      return false
    }
    if (submodulos.filter(ele => ele.url === url).length > 0) {
      Swal.fire({
        title: 'Ya existe un submódulo con esta url',
        icon: 'error'
      })
      return false
    }
    return true
  }

  // Función para validar el actualizar un nuevo submódulo
  const validateUpdateSubMod = () => {
    const submodulos_ = submodulos.filter(ele => ele.orden !== row.orden)
    if (
      submodulos_.filter(ele => parseInt(ele.orden, 10) === parseInt(orden, 10))
        .length > 0
    ) {
      Swal.fire({
        title: 'Ya existe un submódulo con este orden',
        icon: 'error'
      })
      return false
    }
    if (submodulos_.filter(ele => ele.tag === tag).length > 0) {
      Swal.fire({
        title: 'Ya existe un submódulo con este tag',
        icon: 'error'
      })
      return false
    }
    if (submodulos_.filter(ele => ele.nombre === nombre).length > 0) {
      Swal.fire({
        title: 'Ya existe un submódulo con este nombre',
        icon: 'error'
      })
      return false
    }
    if (submodulos_.filter(ele => ele.url === url).length > 0) {
      Swal.fire({
        title: 'Ya existe un submódulo con esta url',
        icon: 'error'
      })
      return false
    }
    return true
  }

  // Renderizamos el componente
  return (
    <div>
      <hr
        style={{
          height: 1,
          borderWidth: 0,
          color: 'gray',
          backgroundColor: 'gray'
        }}
      />
      {fase === 'add' && <h2 className="mt-16 mb-16">Agregar SubMódulo</h2>}
      {fase === 'edit' && <h2 className="mt-16 mb-16">Editar SubMódulo</h2>}
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <TextFieldFormsy
          className="col-span-6 sm:col-span-1"
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
        />
        <TextFieldFormsy
          className="col-span-6 sm:col-span-2"
          type="text"
          name="tag"
          label="Tag"
          accept="onlyLetterAndGuion"
          value={tag}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            maxLength: 20
          }}
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-3"
          type="text"
          name="nombre"
          label="Nombre"
          accept="onlyLetterAndSpace"
          value={nombre}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            maxLength: 26
          }}
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-4"
          type="text"
          name="url"
          label="Url"
          value={url}
          onChange={handleInputChange}
          variant="outlined"
        />
      </div>
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <TextFieldFormsy
          className="col-span-12 sm:col-span-10"
          name="descripcion"
          label="Descripción"
          multiline
          rows={2}
          value={descripcion}
          onChange={handleInputChange}
          variant="outlined"
        />
        {fase === 'add' && (
          <div className="col-span-6 sm:col-span-2">
            <BlueButton
              variant="contained"
              color="primary"
              className={styles.margin}
              startIcon={<AddIcon />}
              onClick={handleAddSubMod}
            >
              Añadir
            </BlueButton>
          </div>
        )}
        {fase === 'edit' && (
          <div className="col-span-6 sm:col-span-2">
            <BlueButton
              variant="contained"
              color="primary"
              className={styles.margin}
              startIcon={<UpdateIcon />}
              onClick={handleUpdateSubMod}
            >
              Actualizar
            </BlueButton>
          </div>
        )}
      </div>
      <SubModulosTable setFase={setFase} setForm={setForm} setRow={setRow} />
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default SubModulosEdit
