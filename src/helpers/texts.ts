/*******************************************************************************************************/
// Función para capitalizar un texto //
/*******************************************************************************************************/
export const capitalizar = (text: string) => {
	// Tamaño del texto
	const size: number = text.length;
	// Convertimos todo a minúscula
	const text_: string = text.toLowerCase();
	// Parte capitalizada
	const textC: string = text_.substring(0, 1).trim().toUpperCase();
	// Parte minúscula
	const textm: string = text_.substring(1, size).trim();
	return textC + textm;
};

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
