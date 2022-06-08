/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PageCarded from 'components/core/PageCarded'
import UsuariosHeader from './UsuariosHeader'
import UsuariosToolBar from './UsuariosToolBar'
import UsuariosTable from './UsuariosTable'

/*******************************************************************************************************/
// Definimos la Vista del componente Usuarios //
/*******************************************************************************************************/
const Usuarios = () => {
  // Estado inicial del contenido de la tabla
  const [list, setList] = useState([])
  const [data, setData] = useState([])

  // Renderizamos el componente
  return (
    <PageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={<UsuariosHeader list={list} setData={setData} />}
      contentToolbar={<UsuariosToolBar />}
      content={
        <UsuariosTable setList={setList} data={data} setData={setData} />
      }
      innerScroll
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Usuarios
