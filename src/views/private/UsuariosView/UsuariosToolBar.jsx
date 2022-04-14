/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useSelector } from 'react-redux';
import UsuariosToolBarRoles from './UsuariosToolBarRoles';
import UsuariosToolBarDepartamentos from './UsuariosToolBarDepartamentos';

/*******************************************************************************************************/
// Definimos la Vista del componente Usuarios ToolBar //
/*******************************************************************************************************/
const VolumenesToolBar = () => {
	// Obtenemos el Rol de Usuario
	const { rol } = useSelector(state => state.auth.usuario);

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full px-16 sm:px-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				{rol.super && <UsuariosToolBarDepartamentos />}
				<UsuariosToolBarRoles />
			</div>
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default VolumenesToolBar;
