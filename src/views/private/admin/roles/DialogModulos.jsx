/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
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
import ListIcon from '@material-ui/icons/List'
import DialogSubModulos from './DialogSubModulos'
import DialogAccionesModulo from './DialogAccionesModulo'

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
    id: 'modulo',
    align: 'left',
    disablePadding: false,
    label: 'Módulo',
    sort: false
  },
  {
    id: 'submodulos',
    align: 'center',
    disablePadding: false,
    label: 'SubMódulos Permitidos',
    sort: false
  },
  {
    id: 'acciones',
    align: 'center',
    disablePadding: false,
    label: 'Acciones',
    sort: false
  }
]

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Vista Permisos Módulos del ROL //
/*******************************************************************************************************/
const DialogModulos = props => {
  // Obtenemos las propiedades del componente
  const { open, setOpen, rol } = props

  // Valor del módulo seleccionado
  const [modulo, setModulo] = useState()

  // Estado del Modal de SubMódulos del Módulo
  const [openSubMod, setOpenSubMod] = useState(false)

  // Estado del Modal de Acciones del Módulo
  const [openAccion, setOpenAccion] = useState(false)

  // Función para abrir el Modal de SubMódulos del Módulo
  const handleOpenSubMod = row => {
    // Establecemos el submódulo seleccionado
    setModulo(row)
    setOpenSubMod(true)
  }

  // Función para abrir el Modal de Acciones del Módulo
  const handleOpenAccion = row => {
    // Establecemos el submódulo seleccionado
    setModulo(row)
    setOpenAccion(true)
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
      aria-labelledby="modulos-list"
    >
      <DialogTitle id="modulos-list">Módulos del Rol {rol.nombre}</DialogTitle>
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
            {rol.permisos && (
              <TableBody>
                {rol.permisos.map((row, index) => {
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
                        {row.modulo}
                      </TableCell>
                      <TableCell
                        className="py-2"
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {row.permisos && (
                          <IconButton
                            style={{ color: '#F44343' }}
                            aria-label="modulos"
                            onClick={() => handleOpenSubMod(row)}
                          >
                            <ListIcon />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell
                        className="py-2"
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <IconButton
                          style={{ color: '#283346' }}
                          aria-label="acciones"
                          onClick={() => handleOpenAccion(row)}
                        >
                          <AssistantIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
          {modulo && (
            <DialogSubModulos
              open={openSubMod}
              setOpen={setOpenSubMod}
              modulo={modulo}
            />
          )}
          {modulo && (
            <DialogAccionesModulo
              open={openAccion}
              setOpen={setOpenAccion}
              modulo={modulo}
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
DialogModulos.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  rol: PropTypes.object.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogModulos
