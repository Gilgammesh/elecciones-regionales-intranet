/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import Scrollbars from 'components/core/Scrollbars';
import Navigation from 'components/layouts/shared-components/Navigation';

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Horizontal - NavBar //
/*******************************************************************************************************/
const NavbarHorizontal = () => {
	// Renderizamos el componente
	return (
		<div className="flex flex-auto justify-between items-center w-full h-full container p-0 lg:px-24">
			{/* <div className="flex flex-shrink-0 items-center"></div> */}

			<Scrollbars className="flex h-full items-center">
				<Navigation className="w-full" layout="horizontal" />
			</Scrollbars>
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default NavbarHorizontal;
