/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import { useState, ChangeEvent } from 'react';

/*******************************************************************************************************/
// Definimos el hook personalizado para manejo de formularios //
/*******************************************************************************************************/
const useForm = (initialValues: any) => {
	// Se establece el valor inicial pasado, en caso no se mande un objeto vacio
	const [formValues, setForm] = useState<any>(initialValues);

	// Función para resetear el formulario al estado inicial
	const resetForm = (initialForm: any) => {
		setForm(initialForm);
	};

	// Función para guardar los valores de los inputs en el estado del formulario
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Obtenemos las propiedades del target
		const { type, checked, name, value } = event.target;
		// En caso sea un checkbox se actualiza el valor si está chekeado o no
		const value_ = type === 'checkbox' ? checked : value;
		setForm({
			...formValues,
			[name]: value_
		});
	};

	// Retornamos el estado del formulario, la función de cambios de inputs y el reseteo del formulario
	return [formValues, handleInputChange, resetForm, setForm];
};

/*******************************************************************************************************/
// Exportamos el hook //
/*******************************************************************************************************/
export default useForm;
