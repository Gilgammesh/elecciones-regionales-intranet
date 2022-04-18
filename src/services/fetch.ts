/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import { browserName, isDesktop, isMobile, isTablet } from 'react-device-detect';
import { appBaseUrl, apiBaseUrl, apiGeolocUrl } from 'configs/settings';
import { getToken } from 'helpers/authToken';

/*******************************************************************************************************/
// Interface de Parametros de entrada //
/*******************************************************************************************************/
interface IParamsFetchData {
	isTokenReq: boolean;
	contentType?: string;
}

/*******************************************************************************************************/
// Interface del Resultado de Fetch //
/*******************************************************************************************************/
export interface IResultFetch {
	status: boolean;
	data?: {
		[key: string]: any;
		status: boolean;
		msg: string;
	};
	msg?: string;
}

/*******************************************************************************************************/
// Función asíncrona para obtener datos de una petición al servidor usando Fetch //
/*******************************************************************************************************/
export const fetchData = async (
	path: string,
	{ isTokenReq, contentType = 'application/json' }: IParamsFetchData,
	method: string = 'GET',
	formData: any = {}
) => {
	// path : ruta relativa del servidor a cual hacemos la petición
	// isTokenReq: estado que indica si el token es requerido en la petición (true o false)
	// contentType: tipo de contenido enviado por defecto "application/json"
	// method: método de la petición al servidor ('GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE')
	// formData: objeto donde se recibe datos del cuerpo de la petición.

	// Fuente de donde se origina la consulta
	const source: string = 'intranet';

	// Url de origen de la consulta
	const origin: string = appBaseUrl;

	// Intentamos obtener la IPv4 del usuario
	let ipv4: string = '';
	try {
		const resGeo = await fetch(apiGeolocUrl);
		const dataGeo = await resGeo.json();
		ipv4 = dataGeo.IPv4;
	} catch (error) {
		ipv4 = '127.0.0.0';
	}

	// Dispositivo del origen
	let device: string = '';
	if (isMobile) device = 'Mobile';
	if (isTablet) device = 'Tablet';
	if (isDesktop) device = 'Desktop';

	// Navegador de donde se realiza la consulta
	const browser: string = browserName;

	// Definimos el resultado inicial
	let result: IResultFetch = { status: false, msg: '' };

	// Obtenemos el token del localstorage si está guardado, caso contrario vacio
	const token: string = getToken();

	// Definimos la url de la API a la cual haremos la petición, usando la api base
	const url: string = `${apiBaseUrl}/${path}`;

	// Definimos las cabeceras de la petición
	let headers: HeadersInit = {
		Source: source,
		Origin: origin,
		Ip: ipv4,
		Device: device,
		Browser: browser
	};
	// Si el contenido es de tipo JSON
	if (contentType === 'application/json') {
		headers = { ...headers, 'Content-Type': contentType };
	}
	// Si el token es requerido en la petición, pasamos la autorización
	if (isTokenReq) {
		headers = { ...headers, Authorization: token };
	}

	// Definimos las opciones de la petición
	let options: RequestInit = { headers };
	// Si el método es diferente de GET => pasamos el método, las cabeceras y el cuerpo con la data
	if (method !== 'GET') {
		let bodyData = null;
		if (contentType === 'application/json') {
			bodyData = JSON.stringify(formData);
		}
		if (contentType === 'multipart/form-data') {
			bodyData = formData;
		}
		options = { method, headers, body: bodyData };
	}

	// Aplicamos la función fetch pasando la url y las opciones, y esperamos la respuesta
	await fetch(url, options)
		// La respuesta la convertimos a JSON
		.then(res => res.json())
		// Almacenamos la respuesta con un estado positivo
		.then(data => {
			result = {
				status: true,
				data
			};
		})
		// En caso hubiese un error mostramos en consola y devolvemos el estado y mensaje
		.catch(err => {
			console.log('Conexión API con FETCH', url, err);
			result = {
				status: false,
				msg: 'No se pudo establecer la conexión con el servidor'
			};
		});

	// Retornamos el resultado de la petición
	return result;
};
