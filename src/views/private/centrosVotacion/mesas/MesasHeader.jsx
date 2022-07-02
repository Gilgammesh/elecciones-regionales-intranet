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
import MesasDialogUpdate from './MesasDialogUpdate'
import MesasDialogErrores from './MesasDialogErrores'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas Header //
/*******************************************************************************************************/
const MesasHeader = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los estados por defecto de la vista mesas
  const { departamento } = useSelector(state => state.mesas)

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
    dispatch(startGetAccionesSubModulo('centros-votacion', 'mesas')).then(res => setAccionesPerm(res))
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
          <Icon className="text-32">how_to_vote</Icon>
        </Animate>
        <Animate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Mesas y Locales de Votación
          </Typography>
        </Animate>
      </div>
      {(rol.super || (accionesPerm && accionesPerm.indexOf('crear') !== -1)) && (
        <AnimateGroup animation="transition.slideRightIn" delay={300}>
          <Button
            className="whitespace-no-wrap normal-case"
            variant="contained"
            startIcon={<AssignmentIcon />}
            onClick={handleOpenMod}
            disabled={rol.super ? (departamento === 'todos' ? true : false) : false}
          >
            <span className="hidden sm:flex">Importar Mesas</span>
            <span className="flex sm:hidden">Importar</span>
          </Button>
          <Button
            component={Link}
            to="/centros-votacion/mesas/nuevo"
            className="whitespace-no-wrap normal-case ml-16"
            variant="contained"
            startIcon={<AddCircleIcon />}
          >
            <span className="hidden sm:flex">Añadir Nueva Mesa</span>
            <span className="flex sm:hidden">Nueva</span>
          </Button>
        </AnimateGroup>
      )}
      {openMod && (
        <MesasDialogUpdate open={openMod} setOpen={setOpenMod} setErrors={setErrors} setOpenErrors={setOpenErrors} />
      )}
      {openErrors && <MesasDialogErrores open={openErrors} setOpen={setOpenErrors} errors={errors} />}
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasHeader
