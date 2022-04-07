/*******************************************************************************************************/
// Interface Configuracion Vertical //
/*******************************************************************************************************/
interface IOptions {
	name: string;
	value: string;
}
export interface IConfigVertical {
	title: string;
	defaults: {
		mode: string;
		scroll: string;
		navbar: {
			display: boolean;
			folded: boolean;
			position: string;
		};
		toolbar: {
			display: boolean;
			style: string;
			position: string;
		};
		footer: {
			display: boolean;
			style: string;
			position: string;
		};
		leftSidePanel: {
			display: boolean;
		};
		rightSidePanel: {
			display: boolean;
		};
	};
	form: {
		mode: {
			title: string;
			type: string;
			options: Array<IOptions>;
		};
		scroll: {
			title: string;
			type: string;
			options: Array<IOptions>;
		};
		navbar: {
			type: string;
			title: string;
			children: {
				display: {
					title: string;
					type: string;
				};
				folded: {
					title: string;
					type: string;
				};
				position: {
					title: string;
					type: string;
					options: Array<IOptions>;
				};
			};
		};
		toolbar: {
			type: string;
			title: string;
			children: {
				display: {
					title: string;
					type: string;
				};
				style: {
					title: string;
					type: string;
					options: Array<IOptions>;
				};
				position: {
					title: string;
					type: string;
					options: Array<IOptions>;
				};
			};
		};
		footer: {
			type: string;
			title: string;
			children: {
				display: {
					title: string;
					type: string;
				};
				style: {
					title: string;
					type: string;
					options: Array<IOptions>;
				};
				position: {
					title: string;
					type: string;
					options: Array<IOptions>;
				};
			};
		};
	};
}

/*******************************************************************************************************/
// Definimos la configuración del Layout Vertical //
/*******************************************************************************************************/
const config: IConfigVertical = {
	title: 'Vertical',
	defaults: {
		mode: 'fullwidth',
		scroll: 'content',
		navbar: {
			display: true,
			folded: false,
			position: 'left'
		},
		toolbar: {
			display: true,
			style: 'fixed',
			position: 'below'
		},
		footer: {
			display: true,
			style: 'fixed',
			position: 'below'
		},
		leftSidePanel: {
			display: true
		},
		rightSidePanel: {
			display: true
		}
	},
	form: {
		mode: {
			title: 'Mode',
			type: 'radio',
			options: [
				{
					name: 'Boxed',
					value: 'boxed'
				},
				{
					name: 'Full Width',
					value: 'fullwidth'
				}
			]
		},
		scroll: {
			title: 'Scrollable Area',
			type: 'radio',
			options: [
				{
					name: 'Body',
					value: 'body'
				},
				{
					name: 'Content',
					value: 'content'
				}
			]
		},
		navbar: {
			type: 'group',
			title: 'Navbar',
			children: {
				display: {
					title: 'Display',
					type: 'switch'
				},
				folded: {
					title: 'Folded',
					type: 'switch'
				},
				position: {
					title: 'Position',
					type: 'radio',
					options: [
						{
							name: 'Left',
							value: 'left'
						},
						{
							name: 'Right',
							value: 'right'
						}
					]
				}
			}
		},
		toolbar: {
			type: 'group',
			title: 'Toolbar',
			children: {
				display: {
					title: 'Display',
					type: 'switch'
				},
				style: {
					title: 'Style',
					type: 'radio',
					options: [
						{
							name: 'Fixed',
							value: 'fixed'
						},
						{
							name: 'Static',
							value: 'static'
						}
					]
				},
				position: {
					title: 'Position',
					type: 'radio',
					options: [
						{
							name: 'Above',
							value: 'above'
						},
						{
							name: 'Below',
							value: 'below'
						}
					]
				}
			}
		},
		footer: {
			type: 'group',
			title: 'Footer',
			children: {
				display: {
					title: 'Display',
					type: 'switch'
				},
				style: {
					title: 'Style',
					type: 'radio',
					options: [
						{
							name: 'Fixed',
							value: 'fixed'
						},
						{
							name: 'Static',
							value: 'static'
						}
					]
				},
				position: {
					title: 'Position',
					type: 'radio',
					options: [
						{
							name: 'Above',
							value: 'above'
						},
						{
							name: 'Below',
							value: 'below'
						}
					]
				}
			}
		}
	}
};

/*******************************************************************************************************/
// Exportamos la configuración //
/*******************************************************************************************************/
export default config;
