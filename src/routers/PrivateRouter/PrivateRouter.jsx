/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from 'configs/routes'
import Layout from 'components/core/Layout'
import ChildrenRouter from './ChildrenRouter'
import Building from 'components/core/Building'
import Password from 'views/private/contrasenha'

/*******************************************************************************************************/
// Definimos las Rutas Privadas de la Aplicación //
/*******************************************************************************************************/
const PrivateRouter = () => {
  // Recuperamos el state de authentication de usuario
  const auth = useSelector(state => state.auth)

  // Recuperamos los datos del usuario y sus permisos
  const { usuario, permisos } = auth

  // Obtenemos las rutas privadas condicionalmente a los permisos del usuario por ROL
  let rutas_ = null
  // Si el usuario es super administrador
  if (usuario.rol.super) {
    // Recorremos las rutas declaradas
    rutas_ = Object.values(routes).map(ele => {
      if (ele.component) {
        if (ele.children && ele.children.length > 0) {
          return <Route key={ele.path} path={ele.path} render={() => <ChildrenRouter rutas={ele} />} />
        } else {
          return <Route key={ele.path} exact path={ele.path} component={ele.component} />
        }
      } else {
        if (ele.rutas) {
          const submodulos = Object.values(ele.rutas).map(ele_ => {
            if (ele_.children && ele_.children.length > 0) {
              return <Route key={ele_.path} path={ele_.path} render={() => <ChildrenRouter rutas={ele_} />} />
            } else {
              return <Route key={ele_.path} exact path={ele_.path} component={ele_.component} />
            }
          })
          return submodulos
        }
      }
      return null
    })
  } else {
    // Recorremos los permisos de las rutas permitidas
    rutas_ = permisos.map(ele => {
      // Si existe el módulo declarado en las rutas generales
      if (routes[ele.modulo]) {
        // Renderizamos los módulos permitidos
        const { path, component, rutas, children } = routes[ele.modulo]
        // Si es del tipo item y cuenta con un componente
        if (component) {
          if (children && children.length > 0) {
            return <Route key={path} path={path} render={() => <ChildrenRouter rutas={routes[ele.modulo]} />} />
          } else {
            return <Route key={path} exact path={path} component={component} />
          }
        }
        // Caso contario es del tipo collapse, mostramos sus hijos
        else {
          // Si existen ruta
          if (rutas) {
            // Renderizamos los submódulos permitidos
            const submodulos = ele.permisos.map(ele_ => {
              // Si existe el submódulo declarado en las rutas del módulo
              if (rutas[ele_.submodulo]) {
                const rutas_ = rutas[ele_.submodulo]
                // Si existe rutas hijas del submódulo
                if (rutas_.children && rutas_.children.length > 0) {
                  return <Route key={ele_._id} path={rutas_.path} render={() => <ChildrenRouter rutas={rutas_} />} />
                } else {
                  return <Route key={ele_._id} exact path={rutas_.path} component={rutas_.component} />
                }
              }
              // Caso contrario debemos agregar el submódulo en el módulo en las rutas generales
              else {
                console.log('modulo:', ele.modulo, ' - submodulo:', ele_.submodulo, ', falta agregar a routes')
                return null
              }
            })
            return submodulos
          }
        }
      }
      // Caso contrario debemos agregar el módulo en las rutas generales
      else {
        console.log('modulo:', ele.modulo, ', falta agregar a routes')
        return null
      }
      return null
    })
  }

  // Renderizamos el componente condicionalmente si valida los módulos
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Building} />
        <Route exact path="/cambiar-contraseña" component={Password} />
        {rutas_}
        <Redirect to="/reportes" />
      </Switch>
    </Layout>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PrivateRouter
