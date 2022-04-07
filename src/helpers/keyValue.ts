/*******************************************************************************************************/
// Función para retonar el valor de un key en un objeto //
/*******************************************************************************************************/
export const getKeyValue =
	<U extends keyof T, T extends object>(key: U) =>
	(obj: T) =>
		obj[key];
