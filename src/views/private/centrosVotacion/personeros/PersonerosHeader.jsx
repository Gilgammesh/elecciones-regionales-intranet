/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Animate from 'components/core/Animate'
import { startGetAccionesSubModulo } from 'redux/actions/auth'
import AnimateGroup from 'components/core/AnimateGroup'
import PersonerosDialogUpdate from './PersonerosDialogUpdate'
import PersonerosDialogErrores from './PersonerosDialogErrores'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros Header //
/*******************************************************************************************************/
const PersonerosHeader = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de la vista personeros
  const { departamento } = useSelector(state => state.personeros)

  // Estado de apertura del Modal
  const [openMod, setOpenMod] = useState(false)

  // Estado del array de errores al importar el excel
  const [errors, setErrors] = useState([])

  // Estado de apertura del modal de errores
  const [openErrors, setOpenErrors] = useState(false)

  // Array de Permisos de Acciones del SubMódulo
  const [accionesPerm, setAccionesPerm] = useState(null)

  // Efecto para obtener las acciones del submódulo
  useEffect(() => {
    dispatch(startGetAccionesSubModulo('centros-votacion', 'personeros')).then(
      res => setAccionesPerm(res)
    )
  }, [dispatch])

  // Función para abrir el Modal
  const handleOpenMod = () => {
    setOpenMod(true)
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
            Personeros
          </Typography>
        </Animate>
      </div>
      {(rol.super ||
        (accionesPerm && accionesPerm.indexOf('crear') !== -1)) && (
        <AnimateGroup animation="transition.slideRightIn" delay={300}>
          <Button
            className="whitespace-no-wrap normal-case"
            variant="contained"
            startIcon={<AssignmentIcon />}
            onClick={handleOpenMod}
            disabled={
              rol.super ? (departamento === 'todos' ? true : false) : false
            }
          >
            <span className="hidden sm:flex">Importar Personeros</span>
            <span className="flex sm:hidden">Importar</span>
          </Button>
          <Button
            component={Link}
            to="/centros-votacion/personeros/nuevo"
            className="whitespace-no-wrap normal-case ml-16"
            variant="contained"
            startIcon={<AddCircleIcon />}
          >
            <span className="hidden sm:flex">Añadir Personero</span>
            <span className="flex sm:hidden">Nueva</span>
          </Button>
        </AnimateGroup>
      )}
      {openMod && (
        <PersonerosDialogUpdate
          open={openMod}
          setOpen={setOpenMod}
          setErrors={setErrors}
          setOpenErrors={setOpenErrors}
        />
      )}
      {openErrors && (
        <PersonerosDialogErrores
          open={openErrors}
          setOpen={setOpenErrors}
          errors={errors}
        />
      )}
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosHeader
