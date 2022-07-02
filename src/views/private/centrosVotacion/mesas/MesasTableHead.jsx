/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip, IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import { startResetMesas } from 'redux/actions/mesas'

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
    id: 'mesa',
    align: 'left',
    disablePadding: false,
    label: 'Mesa',
    sort: true
  },
  {
    id: 'personero_mesa',
    align: 'left',
    disablePadding: false,
    label: 'Personero Mesa',
    sort: false
  },
  {
    id: 'local',
    align: 'left',
    disablePadding: false,
    label: 'Local',
    sort: false
  },
  {
    id: 'personero_local',
    align: 'left',
    disablePadding: false,
    label: 'Personero Local',
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
    id: 'provincia',
    align: 'left',
    disablePadding: false,
    label: 'Provincia',
    sort: false
  },
  {
    id: 'distrito',
    align: 'left',
    disablePadding: false,
    label: 'Distrito',
    sort: false
  },
  {
    id: 'ubigeo',
    align: 'left',
    disablePadding: false,
    label: 'Ubigeo',
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
// Definimos la Vista del componente Centros de Votación - Mesas Table Head //
/*******************************************************************************************************/
const MesasTableHead = props => {
  // Obtenemos las propiedades del componente
  const { order, onRequestSort, resetPages } = props

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
    dispatch(startResetMesas())
    resetPages()
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
MesasTableHead.propTypes = {
  order: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasTableHead
