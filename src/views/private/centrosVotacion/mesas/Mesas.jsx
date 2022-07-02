/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PageCarded from 'components/core/PageCarded'
import MesasHeader from './MesasHeader'
import MesasToolBar from './MesasToolBar'
import MesasTable from './MesasTable'
import { pageIni, rowsPerPageIni } from 'constants/mesas'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas //
/*******************************************************************************************************/
const Mesas = () => {
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
      header={<MesasHeader />}
      contentToolbar={<MesasToolBar resetPages={resetPages} />}
      content={
        <MesasTable
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
export default Mesas
