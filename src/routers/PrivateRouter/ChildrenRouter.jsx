/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Switch, Route } from 'react-router-dom'

/*******************************************************************************************************/
// Ruteador de los childrens //
/*******************************************************************************************************/
const ChildrenRouter = ({ rutas }) => {
  // Renderizamos las rutas hijos de los submódulos
  return (
    <Switch>
      <Route exact path={rutas.path} component={rutas.component} />
      {rutas?.children?.map(ele => {
        return <Route key={ele.path} exact path={ele.path} component={ele.component} />
      })}
    </Switch>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ChildrenRouter
