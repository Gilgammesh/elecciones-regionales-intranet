/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip, IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import { startResetPersoneros } from 'redux/actions/personeros'

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
const headers = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: '#',
    sort: false
  },
  {
    id: 'nombres',
    align: 'left',
    disablePadding: false,
    label: 'Nombres',
    sort: true
  },
  {
    id: 'apellidos',
    align: 'left',
    disablePadding: false,
    label: 'Apellidos',
    sort: true
  },
  {
    id: 'dni',
    align: 'left',
    disablePadding: false,
    label: 'DNI',
    sort: false
  },
  {
    id: 'celular',
    align: 'left',
    disablePadding: false,
    label: 'Celular',
    sort: false
  },
  {
    id: 'tipo',
    align: 'left',
    disablePadding: false,
    label: 'Tipo Personero',
    sort: false
  },
  {
    id: 'asignadoA',
    align: 'left',
    disablePadding: false,
    label: 'Asignado a:',
    sort: false
  },
  {
    id: 'departamento',
    align: 'left',
    disablePadding: false,
    label: 'Departamento',
    sort: false
  },
  {
    id: 'estado',
    align: 'center',
    disablePadding: false,
    label: 'Habilitado',
    sort: true
  },
  {
    id: 'botones',
    align: 'center',
    disablePadding: false,
    label: '',
    sort: false
  }
]

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros Table Head //
/*******************************************************************************************************/
const PersonerosTableHead = props => {
  // Obtenemos las propiedades del componente
  const { order, onRequestSort } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Función para crear un ordenamiento de la columna
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  // Función para refrescar la tabla
  const refreshTable = () => {
    dispatch(startResetPersoneros())
  }

  // Renderizamos el componente
  return (
    <TableHead>
      <TableRow className="h-64">
        {headers
          .filter(ele => (rol.super ? ele : ele.id !== 'departamento'))
          .map(col => {
            return (
              <TableCell
                key={col.id}
                align={col.align}
                padding={col.disablePadding ? 'none' : 'normal'}
                className="font-extrabold"
                sortDirection={order.id === col.id ? order.direction : false}
              >
                {col.sort ? (
                  <Tooltip
                    title="Ordenar"
                    placement={col.align === 'right' ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={order.id === col.id}
                      direction={order.direction}
                      onClick={createSortHandler(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : col.id === 'botones' ? (
                  <Tooltip title="Refrescar" placement="bottom-start" enterDelay={100}>
                    <IconButton aria-label="refrescar" onClick={refreshTable}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  col.label
                )}
              </TableCell>
            )
          }, this)}
      </TableRow>
    </TableHead>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosTableHead.propTypes = {
  order: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosTableHead
