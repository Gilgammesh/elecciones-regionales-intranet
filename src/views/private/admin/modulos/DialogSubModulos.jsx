/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import _ from 'lodash'

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
const headers = [
  {
    id: 'orden',
    align: 'center',
    disablePadding: false,
    label: 'Orden',
    sort: true
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
    id: 'activo',
    align: 'center',
    disablePadding: false,
    label: 'Activo',
    sort: true
  }
]

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Vista Permisos SubMódulos de Módulo //
/*******************************************************************************************************/
const DialogSubModulos = props => {
  // Obtenemos las propiedades del componente
  const { open, setOpen, selectMod } = props

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
          <Table stickyHeader className="min-w-lg" aria-labelledby="tableTitle">
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
            {selectMod.children && (
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
                        className="py-2 pr-44"
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.orden}
                      </TableCell>
                      <TableCell className="py-2" component="th" scope="row">
                        {row.tag}
                      </TableCell>
                      <TableCell className="py-2" component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell className="py-2" component="th" scope="row">
                        {row.url}
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
                        height={48}
                      >
                        {row.estado ? (
                          <Icon className="text-green text-20">
                            check_circle
                          </Icon>
                        ) : (
                          <Icon className="text-red text-20">cancel</Icon>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
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
