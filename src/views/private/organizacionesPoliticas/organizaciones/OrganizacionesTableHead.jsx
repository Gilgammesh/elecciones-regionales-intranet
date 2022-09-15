/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip, IconButton } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import { startResetOrganizaciones } from 'redux/actions/organizaciones'

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
    id: 'logo',
    align: 'left',
    disablePadding: false,
    label: 'Logo',
    sort: false
  },
  {
    id: 'orden',
    align: 'left',
    disablePadding: false,
    label: 'Orden Acta',
    sort: true
  },
  {
    id: 'nombre',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: false
  },
  {
    id: 'siglas',
    align: 'left',
    disablePadding: false,
    label: 'Siglas',
    sort: false
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
// Definimos la Vista del componente Organizaciones Table Head //
/*******************************************************************************************************/
const OrganizacionesTableHead = props => {
  // Obtenemos las propiedades del componente
  const { order, onRequestSort, resetPages } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Función para crear un ordenamiento de la columna
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  // Función para refrescar la tabla
  const refreshTable = () => {
    dispatch(startResetOrganizaciones())
    resetPages()
  }

  // Renderizamos el componente
  return (
    <TableHead>
      <TableRow className="h-64">
        {headers.map(col => {
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
OrganizacionesTableHead.propTypes = {
  order: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  resetPages: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default OrganizacionesTableHead
