/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PageCarded from 'components/core/PageCarded'
import HomeHeader from './HomeHeader'
import HomeContainer from './HomeContainer'

/*******************************************************************************************************/
// Definimos la Vista del componente Bienvenida //
/*******************************************************************************************************/
const Home = () => {
  // Renderizamos el componente
  return (
    <PageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={<HomeHeader />}
      content={<HomeContainer />}
      innerScroll
    />
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default Home
