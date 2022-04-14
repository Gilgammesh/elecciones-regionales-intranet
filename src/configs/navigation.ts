/*******************************************************************************************************/
// Interface del Item de Navegación por Defecto //
/*******************************************************************************************************/
interface IChildrenItem {
	id: string;
	title: string;
	type: string;
	icon: string;
	url: string;
	badge?: {
		title: number;
		bg: string;
		fg: string;
	};
}
interface IDefaultNavigationItem {
	orden: number;
	id: string;
	type: string;
	title?: string;
	icon?: string;
	children?: Array<IChildrenItem>;
}

/*******************************************************************************************************/
// Definimos la navegación de la aplicación por defecto //
/*******************************************************************************************************/
const defaultNavigation: Array<IDefaultNavigationItem> = [
	/* {
		orden: 1,
		id: 'interfaz-usuario',
		type: 'group',
		title: 'Interfaz Usuario',
		icon: 'web',
		children: [
			{
				id: 'chat',
				title: 'Chat',
				type: 'item',
				icon: 'chat',
				url: '/chat',
				badge: {
					title: 0,
					bg: '#09D261',
					fg: '#FFFFFF'
				}
			}
		]
	},
	{
		orden: 2,
		id: 'divider-1',
		type: 'divider'
	} */
];

/*******************************************************************************************************/
// Exportamos la navegación por defecto //
/*******************************************************************************************************/
export default defaultNavigation;
