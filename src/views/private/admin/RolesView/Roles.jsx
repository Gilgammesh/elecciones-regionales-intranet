/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react';
import PageCarded from 'components/core/PageCarded';
import RolesHeader from './RolesHeader';
import RolesTable from './RolesTable';

/*******************************************************************************************************/
// Definimos la Vista del componente Admin - Roles //
/*******************************************************************************************************/
const Roles = () => {
	// Estado inicial del contenido de la tabla
	const [list, setList] = useState([]);
	const [data, setData] = useState([]);

	// Renderizamos el componente
	return (
		<PageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<RolesHeader list={list} setData={setData} />}
			content={<RolesTable setList={setList} data={data} setData={setData} />}
			innerScroll
		/>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Roles;
