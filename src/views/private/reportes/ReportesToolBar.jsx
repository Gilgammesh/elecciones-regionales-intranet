/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useSelector } from 'react-redux'
import ReportesToolBarTipos from './ReportesToolBarTipos'
import ReportesToolBarDptos from './ReportesToolBarDptos'
import ReportesToolBarProvs from './ReportesToolBarProvs'
import ReportesToolBarDists from './ReportesToolBarDists'
import { EReportesTipo } from 'redux/reducers/reportesReducer'

/*******************************************************************************************************/
// Definimos la Vista del componente Reportes ToolBar //
/*******************************************************************************************************/
const ReportesToolBar = () => {
  // Obtenemos el Rol de Usuario
  const { rol } = useSelector(state => state.auth.usuario)

  // Obtenemos los datos por defecto de reportes
  const { tipo, provincia } = useSelector(state => state.reportes)

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full px-16 sm:px-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <ReportesToolBarTipos />
        {rol.super && <ReportesToolBarDptos />}
        {tipo === EReportesTipo.ALCALDES && <ReportesToolBarProvs />}
        {tipo === EReportesTipo.ALCALDES && provincia !== 'todos' && <ReportesToolBarDists />}
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ReportesToolBar
