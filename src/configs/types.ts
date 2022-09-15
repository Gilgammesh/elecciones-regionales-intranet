/*******************************************************************************************************/
// Interface de los Tipos //
/*******************************************************************************************************/
export interface ITypes {
  setAuth: string
  login: string
  logout: string
  setNavigation: string
  resetNavigation: string
  setSettings: string
  resetSettings: string
  openDialog: string
  closeDialog: string
  showMessage: string
  hideMessage: string
  toggleChatPanel: string
  openChatPanel: string
  closeChatPanel: string
  navbarToggleFolded: string
  navbarOpenFolded: string
  navbarCloseFolded: string
  navbarToggleMobile: string
  navbarOpenMobile: string
  navbarCloseMobile: string
  toggleQuickPanel: string
  openQuickPanel: string
  closeQuickPanel: string
  setSubmodulos: string
  resetSubmodulos: string
  setPermisos: string
  resetPermisos: string
  setSocketIO: string
  setUsuariosRol: string
  setUsuariosDepartamento: string
  setPersonerosSearch: string
  setPersonerosTipo: string
  setPersonerosEstado: string
  setPersonerosDepartamento: string
  resetPersoneros: string
  setMesasSearch: string
  setMesasAssign: string
  setMesasDepartamento: string
  setMesasProvincia: string
  setMesasDistrito: string
  setMesasChange: string
  resetMesas: string
  setOrganizacionesNombre: string
  resetOrganizaciones: string
  setGobernadoresSearch: string
  setGobernadoresOrganizacion: string
  setGobernadoresDepartamento: string
  resetGobernadores: string
  setConsejerosSearch: string
  setConsejerosOrganizacion: string
  setConsejerosDepartamento: string
  setConsejerosProvincia: string
  resetConsejeros: string
  setAlcaldesSearch: string
  setAlcaldesTipo: string
  setAlcaldesOrganizacion: string
  setAlcaldesDepartamento: string
  setAlcaldesProvincia: string
  setAlcaldesDistrito: string
  resetAlcaldes: string
}

/*******************************************************************************************************/
// Definimos los tipos de acciones para los reducers de la aplicación //
/*******************************************************************************************************/
const types: ITypes = {
  setAuth: '[auth] set',
  login: '[auth] login',
  logout: '[auth] logout',
  setNavigation: '[navigation] set',
  resetNavigation: '[navigation] reset',
  setSettings: '[settings] set',
  resetSettings: '[settings] reset',
  openDialog: '[dialog] open',
  closeDialog: '[dialog] close',
  showMessage: '[message] show',
  hideMessage: '[message] hide',
  toggleChatPanel: '[chatPanel] toggle',
  openChatPanel: '[chatPanel] open',
  closeChatPanel: '[chatPanel] close',
  navbarToggleFolded: '[navbar] toggleFolded',
  navbarOpenFolded: '[navbar] openFolded',
  navbarCloseFolded: '[navbar] closeFolded',
  navbarToggleMobile: '[navbar] toggleMobile',
  navbarOpenMobile: '[navbar] openMobile',
  navbarCloseMobile: '[navbar] closeMobile',
  toggleQuickPanel: '[quickPanel] toggle',
  openQuickPanel: '[quickPanel] open',
  closeQuickPanel: '[quickPanel] close',
  setSubmodulos: '[submodulos] set',
  resetSubmodulos: '[submodulos] reset',
  setPermisos: '[permisos] set',
  resetPermisos: '[permisos] reset',
  setSocketIO: '[socketio] socket',
  setUsuariosRol: '[usuarios] set rol',
  setUsuariosDepartamento: '[usuarios] set departamento',
  setPersonerosSearch: '[personeros] set search',
  setPersonerosTipo: '[personeros] set tipo',
  setPersonerosEstado: '[personeros] set estado',
  setPersonerosDepartamento: '[personeros] set departamento',
  resetPersoneros: '[personeros] reset',
  setMesasSearch: '[mesas] set search',
  setMesasAssign: '[mesas] set assign',
  setMesasDepartamento: '[mesas] set departamento',
  setMesasProvincia: '[mesas] set provincia',
  setMesasDistrito: '[mesas] set distrito',
  setMesasChange: '[mesas] set change',
  resetMesas: '[mesas] reset',
  setOrganizacionesNombre: '[organizaciones] set nombre',
  resetOrganizaciones: '[organizaciones] reset',
  setGobernadoresSearch: '[gobernadores] set search',
  setGobernadoresOrganizacion: '[gobernadores] set organizacion',
  setGobernadoresDepartamento: '[gobernadores] set departamento',
  resetGobernadores: '[gobernadores] reset',
  setConsejerosSearch: '[consejeros] set search',
  setConsejerosOrganizacion: '[consejeros] set organizacion',
  setConsejerosDepartamento: '[consejeros] set departamento',
  setConsejerosProvincia: '[consejeros] set provincia',
  resetConsejeros: '[consejeros] reset',
  setAlcaldesSearch: '[alcaldes] set search',
  setAlcaldesTipo: '[alcaldes] set tipo',
  setAlcaldesOrganizacion: '[alcaldes] set organizacion',
  setAlcaldesDepartamento: '[alcaldes] set departamento',
  setAlcaldesProvincia: '[alcaldes] set provincia',
  setAlcaldesDistrito: '[alcaldes] set distrito',
  resetAlcaldes: '[alcaldes] reset'
}

/*******************************************************************************************************/
// Exportamos los tipos //
/*******************************************************************************************************/
export default types
