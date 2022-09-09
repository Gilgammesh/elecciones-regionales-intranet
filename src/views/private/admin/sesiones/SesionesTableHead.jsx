/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core'

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
    id: 'usuario',
    align: 'left',
    disablePadding: false,
    label: 'Usuario',
    sort: true
  },
  {
    id: 'dni',
    align: 'left',
    disablePadding: false,
    label: 'DNI',
    sort: true
  },
  {
    id: 'ultimo_ingreso',
    align: 'left',
    disablePadding: false,
    label: 'Último Ingreso',
    sort: true
  },
  {
    id: 'origen',
    align: 'left',
    disablePadding: false,
    label: 'Origen',
    sort: false
  },
  {
    id: 'ip',
    align: 'left',
    disablePadding: false,
    label: 'IP',
    sort: false
  },
  {
    id: 'dispositivo',
    align: 'left',
    disablePadding: false,
    label: 'Dispositivo',
    sort: false
  },
  {
    id: 'navegador',
    align: 'left',
    disablePadding: false,
    label: 'Navegador',
    sort: false
  },
  {
    id: 'estado',
    align: 'center',
    disablePadding: false,
    label: 'Estado',
    sort: true
  }
]

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Sesiones Table Head //
/*******************************************************************************************************/
const SesionesTableHead = props => {
  // Obtenemos las propiedades del componente
  const { order, onRequestSort } = props

  // Función para crear un ordenamiento de la columna
  const createSortHandler = property => event => {
    onRequestSort(event, property)
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
SesionesTableHead.propTypes = {
  order: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default SesionesTableHead
