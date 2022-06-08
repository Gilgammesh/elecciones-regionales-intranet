/*******************************************************************************************************/
// Interface Configuracion Horizontal //
/*******************************************************************************************************/
interface IOptions {
  name: string
  value: string
}
export interface IConfigHorizontal {
  title: string
  defaults: {
    mode: string
    scroll: string
    navbar: {
      display: boolean
    }
    toolbar: {
      display: boolean
      position: string
    }
    footer: {
      display: boolean
      style: string
    }
    leftSidePanel: {
      display: boolean
    }
    rightSidePanel: {
      display: boolean
    }
  }
  form: {
    mode: {
      title: string
      type: string
      options: Array<IOptions>
    }
    navbar: {
      type: string
      title: string
      children: {
        display: {
          title: string
          type: string
        }
      }
    }
    toolbar: {
      type: string
      title: string
      children: {
        display: {
          title: string
          type: string
        }
        position: {
          title: string
          type: string
          options: Array<IOptions>
        }
      }
    }
    footer: {
      type: string
      title: string
      children: {
        display: {
          title: string
          type: string
        }
        style: {
          title: string
          type: string
          options: Array<IOptions>
        }
      }
    }
  }
}

/*******************************************************************************************************/
// Definimos la configuración del Layout Horizontal //
/*******************************************************************************************************/
const config: IConfigHorizontal = {
  title: 'Horizontal',
  defaults: {
    mode: 'fullwidth',
    scroll: 'content',
    navbar: {
      display: true
    },
    toolbar: {
      display: true,
      position: 'below'
    },
    footer: {
      display: true,
      style: 'fixed'
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
        },
        {
          name: 'Container',
          value: 'container'
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
        }
      }
    }
  }
}

/*******************************************************************************************************/
// Exportamos la configuración //
/*******************************************************************************************************/
export default config
