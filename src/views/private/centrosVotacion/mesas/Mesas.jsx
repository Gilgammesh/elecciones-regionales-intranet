/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PageCarded from 'components/core/PageCarded'
import MesasHeader from './MesasHeader'
import MesasToolBar from './MesasToolBar'
import MesasTable from './MesasTable'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas //
/*******************************************************************************************************/
const Mesas = () => {
  // Estado inicial del contenido de la tabla
  const [data, setData] = useState([])

  // Renderizamos el componente
  return (
    <PageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={<MesasHeader />}
      contentToolbar={<MesasToolBar />}
      content={<MesasTable data={data} setData={setData} />}
      innerScroll
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Mesas
