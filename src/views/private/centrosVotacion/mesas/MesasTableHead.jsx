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
    id: 'ubigeo',
    align: 'left',
    disablePadding: false,
    label: 'Ubigeo',
    sort: true
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
  const { order, onRequestSort, superUser } = props

  // Función para crear un ordenamiento de la columna
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  // Renderizamos el componente
  return (
    <TableHead>
      <TableRow className="h-64">
        {headers
          .filter(ele => {
            // Si es un superusuario mostramos todo
            if (superUser) {
              return ele
            }
            // Caso contrario excluimos el departamento
            else {
              return ele.id !== 'departamento'
            }
          })
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
MesasTableHead.propTypes = {
  order: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  superUser: PropTypes.bool.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasTableHead
