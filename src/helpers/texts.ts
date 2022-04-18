/*******************************************************************************************************/
// Función para normalizar un texto //
/*******************************************************************************************************/
export const normalizar = (text: string) => {
	// Normalizamos de acuerdo a criterio
	const normTxt: string = text
		.toLowerCase() // Convertimos a minúsculas
		.normalize('NFD') // Forma de Normalización de Descomposición Canónica
		.replace(/[\u0300-\u0302]/g, '') // Removemos los acentos
		.trim(); // Quitamos los espacios
	return normTxt;
};
