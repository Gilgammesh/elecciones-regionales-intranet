/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PublicRoute from 'components/core/Route/PublicRoute'
import PrivateRoute from 'components/core/Route/PrivateRoute'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
import { IRootReducers } from '../redux/store'

/*******************************************************************************************************/
// Definimos las Rutas de la Aplicación //
/*******************************************************************************************************/
const AppRouter = () => {
  // Llamamos al state global de auth
  const auth = useSelector((state: IRootReducers) => state.auth)
  // Obtenemos si el usuario esta logueado
  const { isLogged } = auth.usuario

  // Si está logueado
  if (isLogged === true) {
    // Renderizamos el componente
    return (
      <Switch>
        <PrivateRoute path="/" component={PrivateRouter} />
      </Switch>
    )
  }

  // Si no está logueado
  if (isLogged === false) {
    // Renderizamos el componente
    return (
      <Switch>
        <PublicRoute path="/auth" component={PublicRouter} />
      </Switch>
    )
  }

  // Si el estado de logueo es indefinido
  return <Switch />
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AppRouter
