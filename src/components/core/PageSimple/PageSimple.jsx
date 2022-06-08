/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react'
import * as PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Scrollbars from '../Scrollbars'
import PageSimpleHeader from './PageSimpleHeader'
import PageSimpleSidebar from './PageSimpleSidebar'

/*******************************************************************************************************/
// Definimos las propiedades del componente //
/*******************************************************************************************************/
const headerHeight = 120
const toolbarHeight = 64
const drawerWidth = 240

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    position: 'relative',
    flex: '1 0 auto',
    height: 'auto',
    backgroundColor: theme.palette.background.default
  },
  innerScroll: {
    flex: '1 1 auto',
    height: '100%'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    zIndex: 2,
    maxWidth: '100%',
    minWidth: 0,
    height: '100%',
    backgroundColor: theme.palette.background.default
  },
  header: {
    height: headerHeight,
    minHeight: headerHeight,
    display: 'flex',
    background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  topBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: headerHeight,
    pointerEvents: 'none'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    zIndex: 9999
  },
  toolbar: {
    height: toolbarHeight,
    minHeight: toolbarHeight,
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flex: '1 0 auto'
  },
  sidebarWrapper: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'absolute',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        position: 'relative'
      }
    }
  },
  sidebar: {
    position: 'absolute',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        position: 'relative'
      }
    },
    width: drawerWidth,
    height: '100%'
  },
  leftSidebar: {
    [theme.breakpoints.up('lg')]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      borderLeft: 0
    }
  },
  rightSidebar: {
    [theme.breakpoints.up('lg')]: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: 0
    }
  },
  sidebarHeader: {
    height: headerHeight,
    minHeight: headerHeight,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },
  sidebarHeaderInnerSidebar: {
    backgroundColor: 'transparent',
    color: 'inherit',
    height: 'auto',
    minHeight: 'auto'
  },
  sidebarContent: {},
  backdrop: {
    position: 'absolute'
  }
}))

/*******************************************************************************************************/
// Definimos el componente de Página Simple //
/*******************************************************************************************************/
const PageSimple = forwardRef((props, ref) => {
  // Definimos las referencias de los objetos
  const leftSidebarRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const rootRef = useRef(null)

  // Instanciamos los estilos
  const styles = useStyles(props)

  // Efecto imperativo del valor de instancia de las referencias
  useImperativeHandle(ref, () => ({
    rootRef,
    toggleLeftSidebar: () => {
      leftSidebarRef.current.toggleSidebar()
    },
    toggleRightSidebar: () => {
      rightSidebarRef.current.toggleSidebar()
    }
  }))

  // Renderizamos el componente
  return (
    <div
      className={clsx(styles.root, props.innerScroll && styles.innerScroll)}
      ref={rootRef}
    >
      <div className={clsx(styles.header, styles.topBg)} />

      <div className="flex flex-auto flex-col container z-10 h-full">
        {props.header && props.sidebarInner && (
          <PageSimpleHeader header={props.header} classes={styles} />
        )}

        <div className={styles.wrapper}>
          {(props.leftSidebarHeader || props.leftSidebarContent) && (
            <PageSimpleSidebar
              position="left"
              header={props.leftSidebarHeader}
              content={props.leftSidebarContent}
              variant={props.leftSidebarVariant || 'permanent'}
              innerScroll={props.innerScroll}
              sidebarInner={props.sidebarInner}
              classes={styles}
              ref={leftSidebarRef}
              rootRef={rootRef}
            />
          )}

          <Scrollbars
            className={styles.contentWrapper}
            enable={props.innerScroll && !props.sidebarInner}
          >
            {props.header && !props.sidebarInner && (
              <PageSimpleHeader header={props.header} classes={styles} />
            )}

            {props.contentToolbar && (
              <div className={styles.toolbar}>{props.contentToolbar}</div>
            )}

            {props.content && (
              <div className={styles.content}>{props.content}</div>
            )}
          </Scrollbars>

          {(props.rightSidebarHeader || props.rightSidebarContent) && (
            <PageSimpleSidebar
              position="right"
              header={props.rightSidebarHeader}
              content={props.rightSidebarContent}
              variant={props.rightSidebarVariant || 'permanent'}
              innerScroll={props.innerScroll}
              sidebarInner={props.sidebarInner}
              classes={styles}
              ref={rightSidebarRef}
              rootRef={rootRef}
            />
          )}
        </div>
      </div>
    </div>
  )
})

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
PageSimple.propTypes = {
  leftSidebarHeader: PropTypes.node,
  leftSidebarContent: PropTypes.node,
  leftSidebarVariant: PropTypes.node,
  rightSidebarHeader: PropTypes.node,
  rightSidebarContent: PropTypes.node,
  rightSidebarVariant: PropTypes.node,
  header: PropTypes.node,
  content: PropTypes.node,
  contentToolbar: PropTypes.node,
  sidebarInner: PropTypes.bool,
  innerScroll: PropTypes.bool
}

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
PageSimple.defaultProps = {}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(PageSimple)
