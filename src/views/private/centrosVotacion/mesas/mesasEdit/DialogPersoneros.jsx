/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton
} from '@material-ui/core'
import Scrollbars from 'components/core/Scrollbars'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import SearchIcon from '@material-ui/icons/Search'
import TouchAppIcon from '@material-ui/icons/TouchApp'
import { fetchData } from 'services/fetch'
import DialogPersonerosNombres from './DialogPersonerosNombres'
import DialogPersonerosApellidos from './DialogPersonerosApellidos'
import DialogPersonerosDni from './DialogPersonerosDni'

/*******************************************************************************************************/
// Tipos del Componente //
/*******************************************************************************************************/
const TiposPers = {
  MESA: 'mesa',
  LOCAL: 'local'
}

/*******************************************************************************************************/
// Columnas cabecera de la Tabla //
/*******************************************************************************************************/
const headers = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: '#'
  },
  {
    id: 'nombres',
    align: 'left',
    disablePadding: false,
    label: 'Nombres'
  },
  {
    id: 'apellidos',
    align: 'left',
    disablePadding: false,
    label: 'Apellidos'
  },
  {
    id: 'dni',
    align: 'left',
    disablePadding: false,
    label: 'DNI'
  }
]

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas - Editar - Personeros Disponibles //
/*******************************************************************************************************/
const DialogPersoneros = props => {
  // Obtenemos las propiedades del componente
  const { open, setOpen, formValues, setForm, mesa, tipo, setPersMesaDet, setPersLocalDet } = props

  // Estado de los parámetros de búsqueda
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [dni, setDni] = useState('')
  const [query, setQuery] = useState({
    nombres: '',
    apellidos: '',
    dni: ''
  })

  // Lista de personeros disponibles
  const [data, setData] = useState([])
  // Id de personero seleccionado
  const [persId, setPersId] = useState(null)

  // Estado para definir el número de página de la tabla
  const [page, setPage] = useState(0)
  // Estado para definir el número de filas por página
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // Total de registros de la tablas
  const [totalReg, setTotalReg] = useState(0)

  // Estado de carga de la tabla
  const [loading, setLoading] = useState(true)

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false)
  }

  // Función para cambiar la página de la tabla
  const handleChangePage = (evt, value) => {
    // Guardamos el número de página
    setPage(value)
  }

  // Función para cambiar el tamaño de registros de una página
  const handleChangeRowsPerPage = evt => {
    // Reiniciamos a la página inicial
    setPage(0)
    // Guardamos el número de registro por página
    setRowsPerPage(evt.target.value)
  }

  // Efecto para limpiar el id del personero y los filtros de búsqueda al abrirse el modal
  useEffect(() => {
    if (open) {
      setPersId(null)
      setNombres('')
      setApellidos('')
      setDni('')
    }
  }, [open])

  // Efecto para obtener la lista de los personeros disponibles
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener todos los personeros disponibles
    const getPersoneros = async () => {
      // Iniciamos carga de la tabla
      setLoading(true)
      // Obtenemos la lista de los personeros con fetch
      let url = `centros-votacion/mesas/personeros?page=${page + 1}&pageSize=${rowsPerPage}`
      // Agregamos los parámetros
      url += `&departamento=${mesa.departamento._id}`
      url += `&nombres=${query.nombres}`
      url += `&apellidos=${query.apellidos}`
      url += `&dni=${query.dni}`
      if (mesa.personero_mesa) {
        url += `&personero_mesa=${mesa.personero_mesa._id}`
      }
      if (mesa.personero_local) {
        url += `&personero_local=${mesa.personero_local._id}`
      }
      const result = await fetchData(url, { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Actualizamos el total de registros de la lista
        setTotalReg(result.data.totalRegistros)
        // Actualizamos la lista en la data local
        setData(result.data.list)
      }
    }
    // Si existe número de página y filas por página
    if (open && page >= 0 && rowsPerPage >= 1) {
      // Obtenemos los personeros
      getPersoneros()
      // Finalizamos carga de la tabla
      setLoading(false)
    }
    // Limpiamos el montaje
    return () => {
      mounted = false
    }
  }, [open, mesa, query, page, rowsPerPage])

  // Función para prevenir el mouse para abajo
  const handleMouseDownSearch = evt => {
    evt.preventDefault()
  }

  // Función para realizar la búsqueda
  const handleSearchQuery = evt => {
    evt.preventDefault()
    setQuery({ nombres, apellidos, dni })
    setPage(0)
    setRowsPerPage(10)
  }

  // Función para seleccionar los datos del personero
  const handleSelectPers = row => {
    setPersId(row._id)
    if (tipo === TiposPers.MESA) setPersMesaDet(`${row.nombres} ${row.apellidos}`)
    if (tipo === TiposPers.LOCAL) setPersLocalDet(`${row.nombres} ${row.apellidos}`)
  }

  // Función para asignar el personero a la mesa o local de votación
  const handleAssignPerson = async () => {
    setForm({
      ...formValues,
      ...(tipo === TiposPers.MESA && { personero_mesa: persId }),
      ...(tipo === TiposPers.LOCAL && { personero_local: persId })
    })
    // Cerramos el modal
    handleClose()
  }

  // Renderizamos el componente
  return (
    <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose} aria-labelledby="personeros-list">
      <DialogTitle id="personeros-list" style={{ paddingBottom: '2px' }}>
        Personeros disponibles
      </DialogTitle>
      <DialogContent>
        <div>
          <div className="flex flex-col justify-center w-full">
            <form onSubmit={handleSearchQuery}>
              <div className="grid grid-cols-12 gap-24 mb-16">
                <DialogPersonerosNombres nombres={nombres} setNombres={setNombres} />
                <DialogPersonerosApellidos apellidos={apellidos} setApellidos={setApellidos} />
                <DialogPersonerosDni dni={dni} setDni={setDni} />
                <div>
                  <IconButton type="submit" aria-label="toggle search" onMouseDown={handleMouseDownSearch}>
                    <SearchIcon />
                  </IconButton>
                </div>
              </div>
            </form>
          </div>
          <Scrollbars className="flex-grow overflow-x-auto">
            <Table stickyHeader className="min-w-lg" aria-labelledby="tableTitle">
              <TableHead>
                <TableRow className="h-32">
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
              {!loading && data && (
                <TableBody>
                  {data.map((row, index) => {
                    return (
                      <TableRow
                        className="h-32"
                        hover
                        tabIndex={-1}
                        key={row._id}
                        style={{ cursor: 'pointer' }}
                        selected={persId === row._id}
                        onClick={() => handleSelectPers(row)}
                      >
                        <TableCell className="py-2" component="th" scope="row">
                          {index + 1 + page * rowsPerPage}
                        </TableCell>
                        <TableCell className="py-2" component="th" scope="row">
                          {row.nombres}
                        </TableCell>
                        <TableCell className="py-2" component="th" scope="row">
                          {row.apellidos}
                        </TableCell>
                        <TableCell className="py-2" component="th" scope="row">
                          {row.dni}
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
          </Scrollbars>
          {data && (
            <TablePagination
              className="overflow-hidden flex-shrink-0"
              component="div"
              count={totalReg}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions className="mb-10">
        <Button
          className="whitespace-no-wrap normal-case"
          variant="contained"
          disabled={!persId}
          startIcon={<TouchAppIcon />}
          onClick={handleAssignPerson}
        >
          Asignar
        </Button>
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
DialogPersoneros.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  mesa: PropTypes.object.isRequired,
  tipo: PropTypes.string.isRequired,
  setPersMesaDet: PropTypes.func.isRequired,
  setPersLocalDet: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default DialogPersoneros
