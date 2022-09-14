/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO ADMINISTRATIVO ---------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import AdminAccionesView from 'views/private/admin/acciones'
import AdminAccionesNewView from 'views/private/admin/acciones/accionesNew'
import AdminAccionesEditView from 'views/private/admin/acciones/accionesEdit'
import AdminRolesView from 'views/private/admin/roles'
import AdminRolesNewView from 'views/private/admin/roles/rolesNew'
import AdminRolesEditView from 'views/private/admin/roles/rolesEdit'
import AdminModulosView from 'views/private/admin/modulos'
import AdminModulosNewView from 'views/private/admin/modulos/modulosNew'
import AdminModulosEditView from 'views/private/admin/modulos/modulosEdit'
import AdminSesionesView from 'views/private/admin/sesiones'

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO ELECCIONES -------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import EleccionesView from 'views/private/elecciones'
import EleccionesNewView from 'views/private/elecciones/eleccionesNew'
import EleccionesEditView from 'views/private/elecciones/eleccionesEdit'

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO USUARIOS ---------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import UsuariosView from 'views/private/usuarios'
import UsuariosNewView from 'views/private/usuarios/usuariosNew'
import UsuariosEditView from 'views/private/usuarios/usuariosEdit'

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO ORGANIZACIONES POLÍTICAS -----------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO CENTROS DE VOTACIÓN ----------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import CentrosPersonerosView from 'views/private/centrosVotacion/personeros'
import CentrosPersonerosNewView from 'views/private/centrosVotacion/personeros/personerosNew'
import CentrosPersonerosEditView from 'views/private/centrosVotacion/personeros/personerosEdit'
import CentrosMesasView from 'views/private/centrosVotacion/mesas'
import CentrosMesasNewView from 'views/private/centrosVotacion/mesas/mesasNew'
import CentrosMesasEditView from 'views/private/centrosVotacion/mesas/mesasEdit'

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO MONITOREO --------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- MÓDULO REPORTES ---------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
//---- EN CONSTRUCCIÓN ---------------------------------------------------------------------//
//////////////////////////////////////////////////////////////////////////////////////////////
import Building from 'components/core/Building'

/*******************************************************************************************************/
// Definimos las rutas de navegación de la aplicación //
/*******************************************************************************************************/
const routes = {
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
    component: EleccionesView,
    children: [
      {
        path: '/elecciones/nuevo',
        component: EleccionesNewView
      },
      {
        path: '/elecciones/editar/:id',
        component: EleccionesEditView
      }
    ]
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
    rutas: {
      personeros: {
        path: '/centros-votacion/personeros',
        component: CentrosPersonerosView,
        children: [
          {
            path: '/centros-votacion/personeros/nuevo',
            component: CentrosPersonerosNewView
          },
          {
            path: '/centros-votacion/personeros/editar/:id',
            component: CentrosPersonerosEditView
          }
        ]
      },
      mesas: {
        path: '/centros-votacion/mesas',
        component: CentrosMesasView,
        children: [
          {
            path: '/centros-votacion/mesas/nuevo',
            component: CentrosMesasNewView
          },
          {
            path: '/centros-votacion/mesas/editar/:id',
            component: CentrosMesasEditView
          }
        ]
      }
    }
  },
  monitoreo: {
    path: '/monitoreo',
    component: Building
  },
  reportes: {
    path: '/reportes',
    component: Building
  }
}

/*******************************************************************************************************/
// Exportamos los rutas de navegación //
/*******************************************************************************************************/
export default routes
