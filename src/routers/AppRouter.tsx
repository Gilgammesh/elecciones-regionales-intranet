/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
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

  // Renderizamos el componente
  return (
    <Switch>
      <PublicRoute path="/auth" component={PublicRouter} />
      <PrivateRoute path="/" component={PrivateRouter} />
      {isLogged ? <Redirect to="/usuarios" /> : <Redirect to="/auth/login" />}
    </Switch>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default AppRouter
