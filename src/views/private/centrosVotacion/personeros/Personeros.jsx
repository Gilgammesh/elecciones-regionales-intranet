/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PageCarded from 'components/core/PageCarded'
import PersonerosHeader from './PersonerosHeader'
import PersonerosToolBar from './PersonerosToolBar'
import PersonerosTable from './PersonerosTable'
import { pageIni, rowsPerPageIni } from 'constants/personeros'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros //
/*******************************************************************************************************/
const Personeros = () => {
  // Estado inicial del contenido de la tabla
  const [data, setData] = useState([])

  // Estado para definir el número de página de la tabla
  const [page, setPage] = useState(pageIni)
  // Estado para definir el número de filas por página
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageIni)

  // Función para resetear las páginas de la tablas
  const resetPages = () => {
    setPage(pageIni)
    setRowsPerPage(rowsPerPageIni)
  }

  // Renderizamos el componente
  return (
    <PageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={<PersonerosHeader />}
      contentToolbar={<PersonerosToolBar resetPages={resetPages} />}
      content={
        <PersonerosTable
          data={data}
          setData={setData}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          resetPages={resetPages}
        />
      }
      innerScroll
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Personeros
