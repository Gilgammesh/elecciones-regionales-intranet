/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Formsy from 'formsy-react';
import PageCarded from 'components/core/PageCarded';
import EleccionesNewHeader from './EleccionesNewHeader';
import EleccionesNewForm from './EleccionesNewForm';
import useForm from 'hooks/useForm';
import { fetchData } from 'services/fetch';
import { validateFetchData } from 'helpers/validateFetchData';
import { Toast } from 'configs/settings';

/*******************************************************************************************************/
// Definimos la Vista del componente Elección Nuevo //
/*******************************************************************************************************/
const EleccionesNew = () => {
	// Llamamos al history de las rutas
	const history = useHistory();

	// Estado inicial si el formulario es válido
	const [isFormValid, setIsFormValid] = useState(false);

	// Estado inicial del formulario
	const initialForm = {
		anho: new Date().getFullYear(),
		tipo: 'regional',
		actual: true
	};

	// Usamos el Hook personalizado de formularios
	const [formValues, handleInputChange, resetForm] = useForm(initialForm);

	// Función que se ejecuta cuando se envia el formulario
	const handleSubmit = async () => {
		// Guardamos la data de la acción
		const result = await fetchData('elecciones', { isTokenReq: true }, 'POST', formValues);
		// Validamos el resultado
		if (validateFetchData(result)) {
			// Reseteamos el formulario
			resetForm(initialForm);
			// Avisamos con un toast alert
			Toast.fire({
				icon: 'success',
				title: result.data.msg
			});
			// Redireccionamos a lista de elecciones
			history.push('/elecciones');
		}
	};

	// Función que deshabilita el botón de envio si el formulario no es válido
	const disableButton = () => {
		setIsFormValid(false);
	};

	// Función que habilita el botón de envio si el formulario es válido
	const enableButton = () => {
		setIsFormValid(true);
	};

	// Renderizamos el componente
	return (
		<Formsy onValidSubmit={handleSubmit} onValid={enableButton} onInvalid={disableButton}>
			<PageCarded
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<EleccionesNewHeader isFormValid={isFormValid} />}
				contentToolbar={
					<div className="px-16 sm:px-24">
						<h2>Registro</h2>
					</div>
				}
				content={<EleccionesNewForm formValues={formValues} handleInputChange={handleInputChange} />}
				innerScroll
			/>
		</Formsy>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default EleccionesNew;
