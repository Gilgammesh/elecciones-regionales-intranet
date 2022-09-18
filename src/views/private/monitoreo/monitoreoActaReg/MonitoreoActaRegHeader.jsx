/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Typography, useTheme } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Animate from 'components/core/Animate'
import { startGetAccionesModulo } from 'redux/actions/auth'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional Header //
/*******************************************************************************************************/
const MonitoreoActaRegHeader = props => {
  // Obtenemos las propiedades
  const { handleSubmit } = props

  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos el tema de la app
  const theme = useTheme()

  // Array de Permisos de Acciones del Módulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del módulo
  useEffect(() => {
    let mounted = true
    dispatch(startGetAccionesModulo('monitoreo')).then(res => {
      if (mounted) setAccionesPerm(res)
    })
    return () => (mounted = false)
  }, [dispatch])

  // Renderizamos el componente
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full">
        <Animate animation="transition.slideRightIn" delay={300}>
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/monitoreo"
            color="inherit"
          >
            <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
            <span className="mx-4">Monitoreo</span>
          </Typography>
        </Animate>
        <div className="flex items-center max-w-full">
          <Animate animation="transition.expandIn" delay={300}>
            <AssignmentIcon fontSize="large" />
          </Animate>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <Animate animation="transition.slideLeftIn" delay={300}>
              <Typography className="text-16 sm:text-20 truncate">Acta Regional y Consejero</Typography>
            </Animate>
          </div>
        </div>
      </div>
      {(rol.super || (accionesPerm && accionesPerm.indexOf('crear') !== -1)) && (
        <Animate animation="transition.slideRightIn" delay={300}>
          <Button
            type="button"
            className="whitespace-no-wrap normal-case"
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </Animate>
      )}
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegHeader.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegHeader
