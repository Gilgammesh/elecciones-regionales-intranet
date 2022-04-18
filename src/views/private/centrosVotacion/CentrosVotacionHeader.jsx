/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Animate from 'components/core/Animate';
import { startGetAccionesModulo } from 'redux/actions/auth';
import AnimateGroup from 'components/core/AnimateGroup';
import CentrosVotacionDialogUpdate from './CentrosVotacionDialogUpdate';

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación Header //
/*******************************************************************************************************/
const CentrosVotacionHeader = () => {
	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Obtenemos el Rol de Usuario
	const { rol } = useSelector(state => state.auth.usuario);

	// Estado de apoertura del Modal
	const [openMod, setOpenMod] = useState(false);

	// Array de Permisos de Acciones del Módulo
	const [accionesPerm, setAccionesPerm] = useState(null);

	// Efecto para obtener las acciones del módulo
	useEffect(() => {
		dispatch(startGetAccionesModulo('centros-votacion')).then(res => setAccionesPerm(res));
	}, [dispatch]);

	// Función para abrir el Modal
	const handleOpenMod = () => {
		setOpenMod(true);
	};

	// Renderizamos el componente
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Animate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">how_to_vote</Icon>
				</Animate>
				<Animate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Centros de Votación
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
					>
						<span className="hidden sm:flex">Importar Excel</span>
						<span className="flex sm:hidden">Importar</span>
					</Button>
					<Button
						component={Link}
						to="/centros-votacion/nuevo"
						className="whitespace-no-wrap normal-case ml-16"
						variant="contained"
						startIcon={<AddCircleIcon />}
					>
						<span className="hidden sm:flex">Añadir Nuevo Centro</span>
						<span className="flex sm:hidden">Nueva</span>
					</Button>
				</AnimateGroup>
			)}
			{openMod && <CentrosVotacionDialogUpdate open={openMod} setOpen={setOpenMod} />}
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default CentrosVotacionHeader;
