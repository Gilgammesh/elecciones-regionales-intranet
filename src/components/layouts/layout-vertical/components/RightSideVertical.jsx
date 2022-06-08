/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo } from 'react'
// import ChatPanel from 'components/layouts/shared-components/chatPanel/ChatPanel';
// import QuickPanel from 'components/layouts/shared-components/quickPanel/QuickPanel';

/*******************************************************************************************************/
// Definimos el componente del Layout estilo Vertical - Lado Derecho //
/*******************************************************************************************************/
const RightSideVertical = props => {
  return (
    <>
      {/* TODO: Quitar comentario del Diseño Vertical cuando se configure el Panel de Chat y el Panel Rápido */}
      {/* <ChatPanel /> */}
      {/* <QuickPanel /> */}
    </>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(RightSideVertical)
