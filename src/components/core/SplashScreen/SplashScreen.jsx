/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { Suspense, memo } from 'react'
import logo from 'assets/images/logos/logo_.png'

/*******************************************************************************************************/
// Definimos el componente Pantalla de Carga  //
/*******************************************************************************************************/
const SplashScreen = () => {
  // Renderizamos el componente
  return (
    <Suspense>
      <div id="app-splash-screen">
        <div className="center">
          <div className="logo">
            <img width={140} src={logo} alt="logo" />
          </div>
          <div className="spinner-wrapper">
            <div className="spinner">
              <div className="inner">
                <div className="gap" />
                <div className="left">
                  <div className="half-circle" />
                </div>
                <div className="right">
                  <div className="half-circle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
export default memo(SplashScreen)
