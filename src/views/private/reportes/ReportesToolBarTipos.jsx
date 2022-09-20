/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { startSetReportesTipo } from 'redux/actions/reportes'
import _ from 'lodash'
import { EReportesTipo } from 'redux/reducers/reportesReducer'

/*******************************************************************************************************/
// Definimos la Vista del componente Reportes ToolBar - Tipos //
/*******************************************************************************************************/
const ReportesToolBarTipos = () => {
  // Llamamos al dispatch de redux
  const dispatch = useDispatch()

  // Obtenemos los estados por defecto de reportes
  const { tipo } = useSelector(state => state.reportes)

  // Función para actualizar el valor del tipo de reporte
  const handleChange = evt => {
    const { value } = evt.target
    dispatch(startSetReportesTipo(value))
  }

  // Renderizamos el componente
  return (
    <FormControl className="col-span-12 sm:col-span-2">
      <InputLabel shrink id="select-reportes-tipo">
        Tipo de Reporte
      </InputLabel>
      <Select labelId="select-reportes-tipo" className="col-span-12" value={tipo} onChange={handleChange} displayEmpty>
        <MenuItem value="todos">--Todos--</MenuItem>
        <MenuItem value={EReportesTipo.GOBERNADORES}>{_.capitalize(EReportesTipo.GOBERNADORES)}</MenuItem>
        <MenuItem value={EReportesTipo.ALCALDES}>{_.capitalize(EReportesTipo.ALCALDES)}</MenuItem>
      </Select>
    </FormControl>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ReportesToolBarTipos
