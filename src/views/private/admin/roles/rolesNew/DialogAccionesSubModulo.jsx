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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { fetchData } from 'services/fetch'
import {
  startAddAccionSubModulo,
  startRemoveAccionSubModulo
} from 'redux/actions/permisos'

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
const headers = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    sort: false
  },
  {
    id: 'nombre',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
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
    id: 'permitir',
    align: 'center',
    disablePadding: false,
    label: 'Permitir',
    sort: false
  }
]

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Vista Permisos Acciones de un SubMódulo de un Módulo //
/*******************************************************************************************************/
const DialogAccionesSubModulo = props => {
  // Obtenemos las propiedades del componente
  const { open, setOpen, selectMod, selectSubMod } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos los permisos del Rol
  const permisos = useSelector(state => state.permisos)

  // Valor de la lista de acciones
  const [acciones, setAcciones] = useState([])

  // Valor del array de las acciones seleccionadas
  const [selectedAccions, setSelectedAccions] = useState([])

  // Estado de carga de la tabla
  const [loading, setLoading] = useState(true)

  // Efecto para obtener las acciones de la Aplicación
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todas las acciones
    const getAcciones = async () => {
      // Inicializamos las acciones seleccionadas
      let selAccions = []
      // Recorremos los permisos del módulo
      const promises = permisos.map(async ele => {
        // Si el módulo coincide con el módulo seleccionado
        if (ele.modulo === selectMod.tag) {
          // Recorremos los permisos del submódulo
          const promises_ = ele.permisos.map(async ele_ => {
            // Si el submódulo coincide con el submódulo seleccionado
            if (ele_.submodulo === selectSubMod.tag) {
              // Recorremos las acciones del submódulo
              const promises__ = ele_.acciones.map(ele__ => {
                selAccions.push(`${ele.modulo}-${ele_.submodulo}-${ele__}`)
                return null
              })
              await Promise.all(promises__)
              return null
            }
          })
          await Promise.all(promises_)
          return null
        }
      })
      await Promise.all(promises)
      // Obtenemos la lista de las acciones
      const result = await fetchData(`admin/acciones?page=1&pageSize=500`, {
        isTokenReq: true
      })
      // Si el array de acciones seleccionadas es mayor que o
      if (selAccions.length > 0) {
        // Guardamos las acciones seleccionadas
        setSelectedAccions(selAccions)
      }
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Actualizamos la lista en la data local
        setAcciones(result.data.list)
      }
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Si existe un socket o cambia y si existe un módulo seleccionado y un submódulo seleccionado
    if (socket && selectMod?.tag && selectSubMod?.tag) {
      // Obtenemos las acciones
      getAcciones()
      // Si una acción fue creada
      socket.on('admin-accion-creada', () => getAcciones())
      // Si una acción fue actualizada
      socket.on('admin-accion-actualizada', () => getAcciones())
      // Si una acción fue eliminada
      socket.on('admin-accion-eliminada', () => getAcciones())
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [socket, selectMod, selectSubMod, permisos])

  // Función para seleccionar las acciones permitidas
  const handleSelectAccion = (evt, row) => {
    // Obtenemos el valor del checbox
    const { checked } = evt.target

    // Obtenemos el index del elemento en el array
    const currentIndex = selectedAccions.indexOf(
      `${selectMod.tag}-${selectSubMod.tag}-${row.nombre}`
    )
    const newSelectedAccions = [...selectedAccions]

    // Evaluamos el estado del checkbox y almacenamos los arrays
    if (checked) {
      newSelectedAccions.push(
        `${selectMod.tag}-${selectSubMod.tag}-${row.nombre}`
      )
      dispatch(
        startAddAccionSubModulo(
          permisos,
          selectMod.tag,
          selectSubMod.tag,
          row.nombre
        )
      )
    } else {
      newSelectedAccions.splice(currentIndex, 1)
      dispatch(
        startRemoveAccionSubModulo(
          permisos,
          selectMod.tag,
          selectSubMod.tag,
          row.nombre
        )
      )
    }
    setSelectedAccions(newSelectedAccions)
  }

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false)
  }

  // Renderizamos el componente
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="accionessubmods-list"
    >
      <DialogTitle id="accionessubmods-list">
        Acciones del SubMódulo {selectSubMod.nombre}
      </DialogTitle>
      <DialogContent>
        <div>
          <Table stickyHeader className="min-w-md" aria-labelledby="tableTitle">
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
            {!loading && acciones && (
              <TableBody>
                {acciones.map((row, index) => {
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
                        {index + 1}
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
                        <Checkbox
                          edge="end"
                          style={{ color: 'green' }}
                          onChange={event => handleSelectAccion(event, row)}
                          checked={
                            selectedAccions.indexOf(
                              `${selectMod.tag}-${selectSubMod.tag}-${row.nombre}`
                            ) !== -1
                          }
                          inputProps={{ 'aria-labelledby': row.nombre }}
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
DialogAccionesSubModulo.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  selectMod: PropTypes.object.isRequired,
  selectSubMod: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogAccionesSubModulo
