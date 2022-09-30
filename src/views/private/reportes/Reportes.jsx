/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PageCarded from 'components/core/PageCarded'
import ReportesHeader from './ReportesHeader'
import ReportesContainer from './ReportesContainer'

/*******************************************************************************************************/
// Definimos la Vista del componente Reportes //
/*******************************************************************************************************/
const Reportes = () => {
  // Renderizamos el componente
  return (
    <PageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={<ReportesHeader />}
      content={<ReportesContainer />}
      innerScroll
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Reportes
