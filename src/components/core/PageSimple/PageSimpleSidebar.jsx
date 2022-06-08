/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Drawer, Hidden } from '@material-ui/core'
import clsx from 'clsx'
import PageSimpleSidebarContent from './PageSimpleSidebarContent'

/*******************************************************************************************************/
// Definimos el componente Página Simple - Barra Lateral //
/*******************************************************************************************************/
const PageSimpleSidebar = (props, ref) => {
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
          onClose={() => handleToggleDrawer()}
          classes={{
            root: clsx(classes.sidebarWrapper, props.variant),
            paper: clsx(
              classes.sidebar,
              props.variant,
              props.position === 'left'
                ? classes.leftSidebar
                : classes.rightSidebar
            )
          }}
          ModalProps={{
            // Mejor rendimiento al abrir en dispositivos móviles.
            keepMounted: true
          }}
          container={props.rootRef.current}
          BackdropProps={{
            classes: {
              root: classes.backdrop
            }
          }}
          style={{ position: 'absolute' }}
        >
          <PageSimpleSidebarContent {...props} />
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
                props.position === 'left'
                  ? classes.leftSidebar
                  : classes.rightSidebar
              )
            }}
          >
            <PageSimpleSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default forwardRef(PageSimpleSidebar)
