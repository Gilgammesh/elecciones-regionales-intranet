/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO ADMINISTRATIVO ---------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import AdminAccionesView from 'views/private/admin/AccionesView';
import AdminAccionesNewView from 'views/private/admin/AccionesView/AccionesNew';
import AdminAccionesEditView from 'views/private/admin/AccionesView/AccionesEdit';
import AdminRolesView from 'views/private/admin/RolesView';
import AdminRolesNewView from 'views/private/admin/RolesView/RolesNew';
import AdminRolesEditView from 'views/private/admin/RolesView/RolesEdit';
import AdminModulosView from 'views/private/admin/ModulosView';
import AdminModulosNewView from 'views/private/admin/ModulosView/ModulosNew';
import AdminModulosEditView from 'views/private/admin/ModulosView/ModulosEdit';
import AdminSesionesView from 'views/private/admin/SesionesView';

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO ELECCIONES -------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO USUARIOS ---------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import UsuariosView from 'views/private/UsuariosView';
import UsuariosNewView from 'views/private/UsuariosView/UsuariosNew';
import UsuariosEditView from 'views/private/UsuariosView/UsuariosEdit';

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO ORGANIZACIONES POLÍTICAS -----------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO CENTROS DE VOTACIÓN ----------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO MONITOREO --------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO REPORTES ---------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- EN CONSTRUCCIÓN ---------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import Building from 'components/core/Building';

/*******************************************************************************************************/
// Interface de los Módulos y SubMódulos de las Rutas //
/*******************************************************************************************************/
export interface IRoutesChildren {
	path: string;
	component: React.ComponentType;
}
export interface IRoutesSubModulo {
	path: string;
	component: React.ComponentType;
	children?: Array<IRoutesChildren>;
}
export interface IRoutesSubModulos {
	[key: string]: IRoutesSubModulo;
}
export interface IRoutesModulo {
	path: string;
	component?: React.ComponentType;
	rutas?: IRoutesSubModulos;
	children?: Array<IRoutesChildren>;
}
export interface IRoutesModulos {
	[key: string]: IRoutesModulo;
}

/*******************************************************************************************************/
// Definimos las rutas de navegación de la aplicación //
/*******************************************************************************************************/
const routes: IRoutesModulos = {
	admin: {
		path: '/admin',
		rutas: {
			roles: {
				path: '/admin/roles',
				component: AdminRolesView,
				children: [
					{
						path: '/admin/roles/nuevo',
						component: AdminRolesNewView
					},
					{
						path: '/admin/roles/editar/:id',
						component: AdminRolesEditView
					}
				]
			},
			modulos: {
				path: '/admin/modulos',
				component: AdminModulosView,
				children: [
					{
						path: '/admin/modulos/nuevo',
						component: AdminModulosNewView
					},
					{
						path: '/admin/modulos/editar/:id',
						component: AdminModulosEditView
					}
				]
			},
			acciones: {
				path: '/admin/acciones',
				component: AdminAccionesView,
				children: [
					{
						path: '/admin/acciones/nuevo',
						component: AdminAccionesNewView
					},
					{
						path: '/admin/acciones/editar/:id',
						component: AdminAccionesEditView
					}
				]
			},
			sesiones: {
				path: '/admin/sesiones',
				component: AdminSesionesView
			},
			logs: {
				path: '/admin/logs',
				component: Building
			}
		}
	},
	elecciones: {
		path: '/elecciones',
		component: Building
	},
	usuarios: {
		path: '/usuarios',
		component: UsuariosView,
		children: [
			{
				path: '/usuarios/nuevo',
				component: UsuariosNewView
			},
			{
				path: '/usuarios/editar/:id',
				component: UsuariosEditView
			}
		]
	},
	'organizaciones-politicas': {
		path: '/organizaciones-politicas',
		component: Building
	},
	'centros-votacion': {
		path: '/centros-votacion',
		component: Building
	},
	monitoreo: {
		path: '/monitoreo',
		component: Building
	},
	reportes: {
		path: '/reportes',
		component: Building
	}
};

/*******************************************************************************************************/
// Exportamos los rutas de navegación //
/*******************************************************************************************************/
export default routes;
