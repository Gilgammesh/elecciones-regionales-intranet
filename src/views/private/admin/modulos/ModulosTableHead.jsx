/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core'

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
    id: 'tag',
    align: 'left',
    disablePadding: false,
    label: 'Tag',
    sort: true
  },
  {
    id: 'nombre',
    align: 'left',
    disablePadding: false,
    label: 'Nombre',
    sort: true
  },
  {
    id: 'orden',
    align: 'center',
    disablePadding: false,
    label: 'Orden',
    sort: true
  },
  {
    id: 'url',
    align: 'left',
    disablePadding: false,
    label: 'Url',
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
    id: 'icon',
    align: 'center',
    disablePadding: false,
    label: 'Icono',
    sort: false
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Tipo',
    sort: false
  },
  {
    id: 'submodulos',
    align: 'center',
    disablePadding: false,
    label: 'Submódulos',
    sort: false
  },
  {
    id: 'activo',
    align: 'center',
    disablePadding: false,
    label: 'Activo',
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
// Definimos la Vista del componente Admin - Módulos Table Head //
/*******************************************************************************************************/
const ModulosTableHead = props => {
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
                  placement={
                    col.align === 'right' ? 'bottom-end' : 'bottom-start'
                  }
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
ModulosTableHead.propTypes = {
  order: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ModulosTableHead
