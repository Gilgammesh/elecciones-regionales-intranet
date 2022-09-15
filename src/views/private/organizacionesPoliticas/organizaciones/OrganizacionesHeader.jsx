/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Animate from 'components/core/Animate'
import { startGetAccionesSubModulo } from 'redux/actions/auth'

/*******************************************************************************************************/
// Definimos la Vista del componente Organizaciones Header //
/*******************************************************************************************************/
const OrganizacionesHeader = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Array de Permisos de Acciones del SubMódulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del submódulo
  useEffect(() => {
    dispatch(startGetAccionesSubModulo('organizaciones-politicas', 'organizaciones')).then(res => setAccionesPerm(res))
  }, [dispatch])

  // Renderizamos el componente
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Animate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">contact_mail</Icon>
        </Animate>
        <Animate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Organizaciones
          </Typography>
        </Animate>
      </div>
      {(rol.super || (accionesPerm && accionesPerm.indexOf('crear') !== -1)) && (
        <Animate animation="transition.slideRightIn" delay={300}>
          <Button
            component={Link}
            to="/organizaciones-politicas/organizaciones/nuevo"
            className="whitespace-no-wrap normal-case"
            variant="contained"
            startIcon={<AddCircleIcon />}
          >
            <span className="hidden sm:flex">Añadir Organización</span>
            <span className="flex sm:hidden">Nueva</span>
          </Button>
        </Animate>
      )}
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default OrganizacionesHeader
