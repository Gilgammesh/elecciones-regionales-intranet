/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import Swal2 from 'sweetalert2'

/*******************************************************************************************************/
// Interface de Layout //
/*******************************************************************************************************/
export interface ILayout {
  style: string
}
/*******************************************************************************************************/
// Interface de Tema Inicial //
/*******************************************************************************************************/
export interface IInitTheme {
  main: string
  navbar: string
  toolbar: string
  footer: string
}

/*******************************************************************************************************/
// Definimos los ajustes de la aplicación //
/*******************************************************************************************************/
// Url Base de la App
export const appBaseUrl: string =
  process.env.REACT_APP_ELEC_URL || 'http://localhost:3000'
// export const appBaseUrl: string = process.env.REACT_APP_ELEC_URL_ || 'http://localhost:3000';
// Url Base de la API o endpoint de los servicios
export const apiBaseUrl: string =
  process.env.REACT_APP_API_ELEC_URL || 'http://localhost:4000'
// export const apiBaseUrl: string = process.env.REACT_APP_API_ELEC_URL_ || 'http://localhost:4000';
// Url de la Api de Geolocation DB
export const apiGeolocUrl: string = process.env.REACT_APP_GEOLOC_URL || ''
// Nombres de las variables de LocalStorage
export const store_lastpath: string = 'ELECI-lastPath'
export const store_changepath: string = 'ELECI-changePath'
export const store_token: string = 'ELECI-token'
export const store_settings: string = 'ELECI-settings'
// Idioma por defecto de la aplicación
export const language: string = 'es'
// Zona horaria de la aplicación
export const timeZone: string = 'America/Lima'
// Estilo del Diseño de la Aplicación ("vertical", "horizontal")
export const layout: ILayout = {
  style: 'vertical'
}
// Habilita los scroll bars personalizados
export const customScrollbars: boolean = true
// Habilita las animaciones
export const animations: boolean = true
// Tema General de la Aplicación
export const initTheme: IInitTheme = {
  main: 'main', // Tema de colores principal
  navbar: 'navbar', // Tema de colores de la barra de menu
  toolbar: 'toolbar', // Tema de colores de la barra de utilitarios
  footer: 'footer' // Tema de colores del pie de página
}
// Ancho de la barra navegación izquierda
export const navbarWidth: number = 280
// Configurción de los mensajes de alerta clásicos
export const Swal = Swal2.mixin({
  showConfirmButton: false,
  heightAuto: false,
  padding: '3em',
  background: '#fff url(/assets/images/bgalert.jpg)',
  width: 400,
  customClass: {
    confirmButton: 'btn-swal2',
    denyButton: 'btn-swal2'
  }
})
// Configuración de los mensajes de alerta tipo Toast
export const Toast = Swal2.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#43A047',
  iconColor: '#ffffff',
  customClass: {
    title: 'text-white'
  },
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
