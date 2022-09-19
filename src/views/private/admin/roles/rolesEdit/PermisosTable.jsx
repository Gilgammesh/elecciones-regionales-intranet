/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, IconButton, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import _ from 'lodash'
import PermisosTableHead from './PermisosTableHead'
import Scrollbars from 'components/core/Scrollbars'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { fetchData } from 'services/fetch'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import AssistantIcon from '@material-ui/icons/Assistant'
import { startAddModulo, startRemoveModulo } from 'redux/actions/permisos'
import DialogSubModulos from './DialogSubModulos'
import DialogAccionesModulo from './DialogAccionesModulo'

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Permisos Table //
/*******************************************************************************************************/
const PermisosTable = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el socket de conexión con la Api
  const socket = useSelector(state => state.socketio)

  // Obtenemos los permisos del Rol
  const permisos = useSelector(state => state.permisos)

  // Valor de la lista de módulos
  const [modulos, setModulos] = useState({})

  // Valor del array de los módulos seleccionados
  const [selectedMods, setSelectedMods] = useState([])

  // Valor del módulo seleccionado
  const [selectMod, setSelectMod] = useState({})

  // Estado del Modal de SubMódulos del Módulo
  const [openSubMod, setOpenSubMod] = useState(false)

  // Estado del Modal de Acciones del Módulo
  const [openAccion, setOpenAccion] = useState(false)

  // Estado de carga de la tabla
  const [loading, setLoading] = useState(true)

  // Efecto para obtener los módulos de la Aplicación
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todos los módulos
    const getModulos = async () => {
      // Obtenemos la lista de los módulos con fetch
      const result = await fetchData(`admin/modulos?page=1&pageSize=500`, {
        isTokenReq: true
      })
      // Recorremos los permisos permitidos
      const promises = permisos.map(ele => {
        return ele.modulo
      })
      const modulosPermitidos = await Promise.all(promises)
      // Guardamos los permisos permitidos
      setSelectedMods(modulosPermitidos)
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Actualizamos la lista en la data local
        setModulos(result.data.list)
      }
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Si existe un socket o cambia y si el contenido de permisos es mayor que cero
    if (socket && permisos.length > 0) {
      // Obtenemos los módulos
      getModulos()
      // Si un módulo fue creado
      socket.on('admin-modulo-creado', () => getModulos())
      // Si un módulo fue actualizado
      socket.on('admin-modulo-actualizado', () => getModulos())
      // Si un módulon fue eliminado
      socket.on('admin-modulo-eliminado', () => getModulos())
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [socket, permisos])

  // Función para abrir el Modal de SubMódulos
  const handleOpenSubMod = row => {
    // Establecemos el módulo seleccionado
    setSelectMod(row)
    setOpenSubMod(true)
  }

  // Función para abrir el Modal de Acciones
  const handleOpenAccion = row => {
    // Establecemos el módulo seleccionado
    setSelectMod(row)
    setOpenAccion(true)
  }

  // Función para seleccionar los módulos permitidos
  const handleSelectModulo = (evt, row) => {
    // Obtenemos el valor del checbox
    const { checked } = evt.target

    // Obtenemos el index del elemento en el array
    const currentIndex = selectedMods.indexOf(row.tag)
    const newSelectedMods = [...selectedMods]

    // Redefinimos el módulo permitido
    let row_ = {}
    if (row.type === 'collapse') {
      row_ = {
        modulo: row.tag,
        acciones: [],
        permisos: []
      }
    }
    if (row.type === 'item') {
      row_ = {
        modulo: row.tag,
        acciones: []
      }
    }

    // Evaluamos el estado del checkbox y almacenamos los arrays
    if (checked) {
      newSelectedMods.push(row.tag)
      dispatch(startAddModulo(permisos, row_))
    } else {
      newSelectedMods.splice(currentIndex, 1)
      dispatch(startRemoveModulo(permisos, row_))
    }
    setSelectedMods(newSelectedMods)
  }

  // Renderizamos el componente
  return (
    <div>
      <Scrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <PermisosTableHead />
          {!loading && modulos && (
            <TableBody>
              {_.orderBy(modulos, [{ orden: Number }], ['asc']).map(row => {
                return (
                  <TableRow className="h-32" hover tabIndex={-1} key={row._id}>
                    <TableCell className="py-2 pr-44" component="th" scope="row" align="left">
                      {row.orden}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="justify">
                      {row.descripcion}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center">
                      {row.type === 'collapse' && (
                        <IconButton
                          style={selectedMods.indexOf(row.tag) !== -1 ? { color: '#F44343' } : { color: '#FAACAC' }}
                          aria-label="submodulos"
                          onClick={() => handleOpenSubMod(row)}
                          disabled={!(selectedMods.indexOf(row.tag) !== -1)}
                        >
                          <FormatListBulletedIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center">
                      <IconButton
                        style={selectedMods.indexOf(row.tag) !== -1 ? { color: '#283346' } : { color: '#7F8591' }}
                        aria-label="acciones"
                        onClick={() => handleOpenAccion(row)}
                        disabled={!(selectedMods.indexOf(row.tag) !== -1)}
                      >
                        <AssistantIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center">
                      <Checkbox
                        edge="end"
                        style={{ color: 'green' }}
                        onChange={event => handleSelectModulo(event, row)}
                        checked={selectedMods.indexOf(row.tag) !== -1}
                        inputProps={{ 'aria-labelledby': row.orden }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </Scrollbars>
      {loading && (
        <div className="px-20 py-52">
          <ProgressLinear />
        </div>
      )}
      {!_.isEmpty(selectMod) && selectMod.type === 'collapse' && (
        <DialogSubModulos open={openSubMod} setOpen={setOpenSubMod} selectMod={selectMod} />
      )}
      {!_.isEmpty(selectMod) && (
        <DialogAccionesModulo open={openAccion} setOpen={setOpenAccion} selectMod={selectMod} />
      )}
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PermisosTable
