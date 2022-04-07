/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import vertical, { IConfigVertical } from './layout-vertical/VerticalConfig';
import horizontal, { IConfigHorizontal } from './layout-horizontal/HorizontalConfig';

/*******************************************************************************************************/
// Interface de Configuraciones de Layouts //
/*******************************************************************************************************/
export interface IConfigLayouts {
	vertical: IConfigVertical;
	horizontal: IConfigHorizontal;
}

/*******************************************************************************************************/
// Guardamos las configuraciones de los layouts en un objeto //
/*******************************************************************************************************/
const exportLayoutConfigs: IConfigLayouts = {
	vertical,
	horizontal
};

/*******************************************************************************************************/
// Exportamos las configuraciones de los layouts //
/*******************************************************************************************************/
export default exportLayoutConfigs;
