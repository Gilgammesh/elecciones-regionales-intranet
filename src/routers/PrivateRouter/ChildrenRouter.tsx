/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IRoutesSubModulo, IRoutesChildren } from 'configs/routes';

/*******************************************************************************************************/
// Props para el componente //
/*******************************************************************************************************/
type Props = {
	rutas: IRoutesSubModulo;
};

/*******************************************************************************************************/
// Ruteador de los childrens //
/*******************************************************************************************************/
const ChildrenRouter = ({ rutas }: Props) => {
	// Renderizamos las rutas hijos de los submódulos
	return (
		<Switch>
			<Route exact path={rutas.path} component={rutas.component} />
			{rutas?.children?.map((ele: IRoutesChildren) => {
				return <Route key={ele.path} exact path={ele.path} component={ele.component} />;
			})}
		</Switch>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ChildrenRouter;
