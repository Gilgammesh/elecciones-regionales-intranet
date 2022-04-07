/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react';
import PageCarded from 'components/core/PageCarded';
import SesionesHeader from './SesionesHeader';
import SesionesTable from './SesionesTable';

/*******************************************************************************************************/
// Definimos la Vista del componente Monitor - Sesiones //
/*******************************************************************************************************/
const Sesiones = () => {
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
			header={<SesionesHeader list={list} setData={setData} />}
			content={<SesionesTable setList={setList} data={data} setData={setData} />}
			innerScroll
		/>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Sesiones;
