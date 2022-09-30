/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PageCarded from 'components/core/PageCarded'
import MesasHeader from './MesasHeader'
import MesasTable from './MesasTable'

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas //
/*******************************************************************************************************/
const Mesas = () => {
  // Estado inicial del contenido de la tabla
  const [data, setData] = useState([])

  // Estado para definir el número de página de la tabla
  const [page, setPage] = useState(0)
  // Estado para definir el número de filas por página
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Función para resetear las páginas de la tablas
  const resetPages = () => {
    setPage(0)
    setRowsPerPage(10)
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
