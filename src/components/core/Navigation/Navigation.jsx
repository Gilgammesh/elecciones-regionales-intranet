/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import { Divider, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import NavHorizontalCollapse from './horizontal/NavHorizontalCollapse'
import NavHorizontalGroup from './horizontal/NavHorizontalGroup'
import NavHorizontalItem from './horizontal/NavHorizontalItem'
import NavHorizontalLink from './horizontal/NavHorizontalLink'
import NavVerticalCollapse from './vertical/NavVerticalCollapse'
import NavVerticalGroup from './vertical/NavVerticalGroup'
import NavVerticalItem from './vertical/NavVerticalItem'
import NavVerticalLink from './vertical/NavVerticalLink'
import NavItem, { registerComponent } from './NavItem'

/*******************************************************************************************************/
// Registramos los Componentes de Navegación //
/*******************************************************************************************************/
registerComponent('vertical-group', NavVerticalGroup)
registerComponent('vertical-collapse', NavVerticalCollapse)
registerComponent('vertical-item', NavVerticalItem)
registerComponent('vertical-link', NavVerticalLink)
registerComponent('horizontal-group', NavHorizontalGroup)
registerComponent('horizontal-collapse', NavHorizontalCollapse)
registerComponent('horizontal-item', NavHorizontalItem)
registerComponent('horizontal-link', NavHorizontalLink)
registerComponent('vertical-divider', () => <Divider className="my-16" />)
registerComponent('horizontal-divider', () => <Divider className="my-16" />)

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  navigation: {
    '& .list-item': {
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
      },
      '&:focus:not(.active)': {
        backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
      }
    }
  },
  verticalNavigation: {
    '&.active-square-list': {
      '& .list-item, & .active.list-item': {
        width: '100%',
        borderRadius: '0'
      }
    },
    '&.dense': {
      '& .list-item': {
        paddingTop: 0,
        paddingBottom: 0,
        height: 32
      }
    }
  },
  horizontalNavigation: {
    '&.active-square-list': {
      '& .list-item': {
        borderRadius: '0'
      }
    },
    '& .list-item': {
      padding: '8px 12px 8px 12px',
      height: 40,
      minHeight: 40,
      '&.level-0': {
        height: 44,
        minHeight: 44
      },
      '& .list-item-text': {
        padding: '0 0 0 8px'
      }
    }
  },
  '@global': {
    '.popper-navigation-list': {
      '& .list-item': {
        padding: '8px 12px 8px 12px',
        height: 40,
        minHeight: 40,
        '& .list-item-text': {
          padding: '0 0 0 8px'
        }
      },
      '&.dense': {
        '& .list-item': {
          minHeight: 32,
          height: 32,
          '& .list-item-text': {
            padding: '0 0 0 8px'
          }
        }
      }
    }
  }
}))

/*******************************************************************************************************/
// Definimos el componente de Navegación o Menú de la Aplicación //
/*******************************************************************************************************/
const Navigation = props => {
  // Obtenemos la navegación de los módulos del usuario
  const navigation = useSelector(state => state.navigation)

  // Instanciamos los estilos
  const styles = useStyles(props)

  // Obtenemos las propiedades del componente
  const { layout, active, dense, className } = props

  // Componente Vertical
  const verticalNav = (
    <List
      className={clsx(
        'navigation whitespace-no-wrap',
        styles.navigation,
        styles.verticalNavigation,
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      <NavItem key={navigation.id} type={`vertical-${navigation.type}`} item={navigation} nestedLevel={0} />
    </List>
  )

  // Componente Horizontal
  const horizontalNav = (
    <List
      className={clsx(
        'navigation whitespace-no-wrap flex p-0',
        styles.navigation,
        styles.horizontalNavigation,
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      <NavItem
        key={navigation.id}
        type={`horizontal-${navigation.type}`}
        item={navigation}
        nestedLevel={0}
        dense={dense}
      />
    </List>
  )

  // Renderizamos el componente condicionado por el layout
  switch (layout) {
    case 'horizontal': {
      return horizontalNav
    }
    case 'vertical':
      return verticalNav
    default: {
      return verticalNav
    }
  }
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
Navigation.defaultProps = {
  layout: 'vertical'
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Navigation
