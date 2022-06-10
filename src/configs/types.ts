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
  setMesasDepartamento: string
  setMesasProvincia: string
  setMesasDistrito: string
  setMesasLocal: string
  setMesasMesa: string
  setMesasPersonero: string
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
  setMesasDepartamento: '[mesas] set departamento',
  setMesasProvincia: '[mesas] set provincia',
  setMesasDistrito: '[mesas] set distrito',
  setMesasLocal: '[mesas] set local',
  setMesasMesa: '[mesas] set mesa',
  setMesasPersonero: '[mesas] set personero'
}

/*******************************************************************************************************/
// Exportamos los tipos //
/*******************************************************************************************************/
export default types
