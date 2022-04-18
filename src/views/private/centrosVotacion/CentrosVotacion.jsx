/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react';
import PageCarded from 'components/core/PageCarded';
import CentrosVotacionHeader from './CentrosVotacionHeader';
import CentrosVotacionToolBar from './CentrosVotacionToolBar';
import CentrosVotacionTable from './CentrosVotacionTable';

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación //
/*******************************************************************************************************/
const CentrosVotacion = () => {
	// Estado inicial del contenido de la tabla
	const [data, setData] = useState([]);

	// Renderizamos el componente
	return (
		<PageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<CentrosVotacionHeader />}
			contentToolbar={<CentrosVotacionToolBar />}
			content={<CentrosVotacionTable data={data} setData={setData} />}
			innerScroll
		/>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default CentrosVotacion;
