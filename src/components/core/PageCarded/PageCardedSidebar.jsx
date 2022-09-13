/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Drawer, Hidden } from '@material-ui/core'
import clsx from 'clsx'
import PageCardedSidebarContent from './PageCardedSidebarContent'

/*******************************************************************************************************/
// Definimos el componente Página Tarjeta - Barra Lateral //
/*******************************************************************************************************/
const PageCardedSidebar = (props, ref) => {
  // Definimos los estados iniciales
  const [isOpen, setIsOpen] = useState(false)

  // Obtenemos las propiedades
  const { classes } = props

  // Efecto imperativo del valor de instancia de las referencias
  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer
  }))

  // Función que control el evento de mostrar el drawer
  const handleToggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  // Renderizamos el componente
  return (
    <>
      <Hidden lgUp={props.variant === 'permanent'}>
        <Drawer
          variant="temporary"
          anchor={props.position}
          open={isOpen}
          onClose={ev => handleToggleDrawer()}
          classes={{
            root: clsx(classes.sidebarWrapper, props.variant),
            paper: clsx(
              classes.sidebar,
              props.variant,
              props.position === 'left' ? classes.leftSidebar : classes.rightSidebar
            )
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          container={props.rootRef.current}
          BackdropProps={{
            classes: {
              root: classes.backdrop
            }
          }}
          style={{ position: 'absolute' }}
        >
          <PageCardedSidebarContent {...props} />
        </Drawer>
      </Hidden>
      {props.variant === 'permanent' && (
        <Hidden mdDown>
          <Drawer
            variant="permanent"
            className={clsx(classes.sidebarWrapper, props.variant)}
            open={isOpen}
            classes={{
              paper: clsx(
                classes.sidebar,
                props.variant,
                props.position === 'left' ? classes.leftSidebar : classes.rightSidebar
              )
            }}
          >
            <PageCardedSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default forwardRef(PageCardedSidebar)
