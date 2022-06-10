/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PageCarded from 'components/core/PageCarded'
import PersonerosHeader from './PersonerosHeader'
import PersonerosToolBar from './PersonerosToolBar'
import PersonerosTable from './PersonerosTable'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros //
/*******************************************************************************************************/
const Personeros = () => {
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
      header={<PersonerosHeader />}
      contentToolbar={<PersonerosToolBar />}
      content={<PersonerosTable data={data} setData={setData} />}
      innerScroll
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Personeros
