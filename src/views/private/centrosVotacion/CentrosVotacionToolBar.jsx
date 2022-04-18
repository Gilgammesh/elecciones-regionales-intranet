/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useSelector } from 'react-redux';
import CentrosVotacionToolBarDptos from './CentrosVotacionToolBarDptos';
import CentrosVotacionToolBarProvs from './CentrosVotacionToolBarProvs';
import CentrosVotacionToolBarDists from './CentrosVotacionToolBarDists';

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación ToolBar //
/*******************************************************************************************************/
const CentrosVotacionToolBar = () => {
	// Obtenemos el Rol de Usuario
	const { rol } = useSelector(state => state.auth.usuario);

	// Renderizamos el componente
	return (
		<div className="flex flex-col justify-center w-full px-16 sm:px-24">
			<div className="grid grid-cols-12 gap-24 mt-16 mb-16">
				{rol.super && <CentrosVotacionToolBarDptos />}
				<CentrosVotacionToolBarProvs />
				<CentrosVotacionToolBarDists />
			</div>
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default CentrosVotacionToolBar;
