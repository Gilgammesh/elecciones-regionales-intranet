/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Icon,
  Input,
  Paper,
  Typography,
  useTheme
} from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Animate from 'components/core/Animate'
import { selectContrastMainTheme } from 'configs/themes'
import { normalizar } from 'helpers/texts'
import { startGetAccionesModulo } from 'redux/actions/auth'

/*******************************************************************************************************/
// Definimos la Vista del componente Usuarios Header //
/*******************************************************************************************************/
const UsuariosHeader = props => {
  // Obtenemos las propiedades del componente
  const { list, setData } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos el tema de la app
  const theme = useTheme()

  // Obtenemos el tema de contraste
  const contrastTheme = selectContrastMainTheme(theme)

  // Estado inicial de la caja de búsqueda
  const [searchText, setSearchText] = useState('')

  // Array de Permisos de Acciones del Módulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del módulo
  useEffect(() => {
    dispatch(startGetAccionesModulo('usuarios')).then(res =>
      setAccionesPerm(res)
    )
  }, [dispatch])

  // Si hay un cambio en la lista de usuarios
  useEffect(() => {
    // Limpiamos la caja de búsqueda
    setSearchText('')
  }, [list])

  // Función para cambiar el valor de la caja de búsqueda
  const handleInputSearch = async evt => {
    // Obtenemos el valor
    const { value } = evt.target
    // Establecemos el valor de la caja
    setSearchText(value)
    // Normalizamos el valor
    const value_ = await normalizar(value)
    // Recorremos la lista para filtrar los datos buscados
    const promises = list
      .map(ele => ele)
      .filter(ele => {
        return (
          normalizar(ele.nombres).includes(value_) ||
          normalizar(ele.apellidos).includes(value_) ||
          normalizar(ele.dni).includes(value_)
        )
      })
    const filter = await Promise.all(promises)
    // Guardamos la data filtrada
    setData(filter)
  }

  // Renderizamos el componente
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Animate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">group</Icon>
        </Animate>
        <Animate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Usuarios
          </Typography>
        </Animate>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={contrastTheme}>
          <Animate animation="transition.slideDownIn" delay={300}>
            <Paper
              className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
              elevation={1}
            >
              <Icon color="action">search</Icon>
              <Input
                placeholder="Buscar"
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Buscar'
                }}
                onChange={handleInputSearch}
              />
            </Paper>
          </Animate>
        </ThemeProvider>
      </div>
      {(rol.super ||
        (accionesPerm && accionesPerm.indexOf('crear') !== -1)) && (
        <Animate animation="transition.slideRightIn" delay={300}>
          <Button
            component={Link}
            to="/usuarios/nuevo"
            className="whitespace-no-wrap normal-case ml-16"
            variant="contained"
            startIcon={<AddCircleIcon />}
          >
            <span className="hidden sm:flex">Añadir Usuario</span>
            <span className="flex sm:hidden">Nuevo</span>
          </Button>
        </Animate>
      )}
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
UsuariosHeader.propTypes = {
  list: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default UsuariosHeader
