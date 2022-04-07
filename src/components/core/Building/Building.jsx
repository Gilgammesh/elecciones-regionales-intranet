/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PageCarded from '../PageCarded';
import construccion from 'assets/images/gallery/construccion.png';

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles({
	layoutRoot: {}
});

/*******************************************************************************************************/
// Definimos el componente de En Construcción //
/*******************************************************************************************************/
const Building = () => {
	// Instanciamos los estilos
	const styles = useStyles();

	// Renderizamos el componente
	return (
		<PageCarded
			classes={{
				root: styles.layoutRoot
			}}
			header={<div className="py-24"> </div>}
			contentToolbar={<div className="px-24"></div>}
			content={
				<div className="flex flex-col justify-center items-center text-center p-24">
					<img src={construccion} className="w-256 sm:w-400 mt-20" alt="en construccion" />
					<h1 className="text-black font-600 mt-20">La sección se encuentra en construcción</h1>
				</div>
			}
		/>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Building;
