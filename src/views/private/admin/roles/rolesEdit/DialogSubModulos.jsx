/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import AssistantIcon from '@material-ui/icons/Assistant'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { startAddSubModulo, startRemoveSubModulo } from 'redux/actions/permisos'
import _ from 'lodash'
import DialogAccionesSubModulo from './DialogAccionesSubModulo'

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
const headers = [
  {
    id: 'orden',
    align: 'left',
    disablePadding: false,
    label: 'Orden',
    sort: false
  },
  {
    id: 'modulo',
    align: 'left',
    disablePadding: false,
    label: 'Módulo',
    sort: false
  },
  {
    id: 'descripcion',
    align: 'left',
    disablePadding: false,
    label: 'Descripción',
    sort: false
  },
  {
    id: 'acciones',
    align: 'center',
    disablePadding: false,
    label: 'Acciones',
    sort: false
  },
  {
    id: 'permitir',
    align: 'center',
    disablePadding: false,
    label: 'Permitir',
    sort: false
  }
]

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Vista Permisos SubMódulos de Módulo //
/*******************************************************************************************************/
const DialogSubModulos = props => {
  // Obtenemos las propiedades del componente
  const { open, setOpen, selectMod } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los permisos del Rol
  const permisos = useSelector(state => state.permisos)

  // Valor del array de los submódulos seleccionados
  const [selectedSubMods, setSelectedSubMods] = useState([])

  // Valor del submódulo seleccionado
  const [selectSubMod, setSelectSubMod] = useState({})

  // Estado del Modal de Acciones del SubMódulo
  const [openAccion, setOpenAccion] = useState(false)

  // Estado de carga de la tabla
  const [loading, setLoading] = useState(true)

  // Efecto para obtener los submódulos permitidos
  useEffect(() => {
    // Función para obtener los submódulos permitidos
    const getSubModulosPermitidos = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Recorremos los permisos permitidos
      const promises = permisos.map(async ele => {
        if (ele.modulo === selectMod.tag) {
          const promises_ = ele.permisos.map(ele_ => {
            return `${selectMod.tag}-${ele_.submodulo}`
          })
          const submodulosPermitidos = await Promise.all(promises_)
          // Guardamos los submódulos permitidos
          setSelectedSubMods(submodulosPermitidos)
        }
        return null
      })
      await Promise.all(promises)
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Si el contenido de permisos es mayor que cero y existe un módulo seleccionado
    if (permisos.length > 0 && selectMod?.tag) {
      // Obtenemos los submódulos permitidos
      getSubModulosPermitidos()
    }
  }, [selectMod, permisos])

  // Función para abrir el Modal de Acciones
  const handleOpenAccion = row => {
    // Establecemos el submódulo seleccionado
    setSelectSubMod(row)
    setOpenAccion(true)
  }

  // Función para seleccionar los submódulos permitidos
  const handleSelectSubModulo = (evt, row) => {
    // Obtenemos el valor del checbox
    const { checked } = evt.target

    // Obtenemos el index del elemento en el array
    const currentIndex = selectedSubMods.indexOf(`${selectMod.tag}-${row.tag}`)
    const newSelectedSubMods = [...selectedSubMods]

    // Redefinimos el submódulo permitido
    const row_ = {
      nombre: row.tag,
      acciones: []
    }

    // Evaluamos el estado del checkbox y almacenamos los arrays
    if (checked) {
      newSelectedSubMods.push(`${selectMod.tag}-${row.tag}`)
      dispatch(startAddSubModulo(permisos, selectMod.tag, row_))
    } else {
      newSelectedSubMods.splice(currentIndex, 1)
      dispatch(startRemoveSubModulo(permisos, selectMod.tag, row_))
    }
    setSelectedSubMods(newSelectedSubMods)
  }

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false)
  }

  // Renderizamos el componente
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      aria-labelledby="submodulos-list"
    >
      <DialogTitle id="submodulos-list">
        SubMódulos del Módulo {selectMod.nombre}
      </DialogTitle>
      <DialogContent>
        <div>
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <TableHead>
              <TableRow className="h-64">
                {headers.map(col => {
                  return (
                    <TableCell
                      key={col.id}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                      className="font-extrabold"
                    >
                      {col.label}
                    </TableCell>
                  )
                }, this)}
              </TableRow>
            </TableHead>
            {!loading && selectMod.children && (
              <TableBody>
                {_.orderBy(
                  selectMod.children,
                  [{ orden: Number }],
                  ['asc']
                ).map(row => {
                  return (
                    <TableRow
                      className="h-32"
                      hover
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell
                        className="py-2"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {row.orden}
                      </TableCell>
                      <TableCell className="py-2" component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell
                        className="py-2"
                        component="th"
                        scope="row"
                        align="justify"
                      >
                        {row.descripcion}
                      </TableCell>
                      <TableCell
                        className="py-2"
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <IconButton
                          style={
                            selectedSubMods.indexOf(
                              `${selectMod.tag}-${row.tag}`
                            ) !== -1
                              ? { color: '#283346' }
                              : { color: '#7F8591' }
                          }
                          aria-label="acciones"
                          onClick={() => handleOpenAccion(row)}
                          disabled={
                            !(
                              selectedSubMods.indexOf(
                                `${selectMod.tag}-${row.tag}`
                              ) !== -1
                            )
                          }
                        >
                          <AssistantIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        className="py-2"
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Checkbox
                          edge="end"
                          style={{ color: 'green' }}
                          onChange={event => handleSelectSubModulo(event, row)}
                          checked={
                            selectedSubMods.indexOf(
                              `${selectMod.tag}-${row.tag}`
                            ) !== -1
                          }
                          inputProps={{ 'aria-labelledby': row.orden }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
          {loading && (
            <div className="px-20 py-52">
              <ProgressLinear />
            </div>
          )}
          {!_.isEmpty(selectSubMod) && (
            <DialogAccionesSubModulo
              open={openAccion}
              setOpen={setOpenAccion}
              selectMod={selectMod}
              selectSubMod={selectSubMod}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
DialogSubModulos.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  selectMod: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogSubModulos
