/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  bar: {
    height: 28,
    borderBottomLeftRadius: 8
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Reportes Voto por Provincia //
/*******************************************************************************************************/
const ReportesVotoProvincia = props => {
  // Obtenemos las propiedades del componente
  const { row, totalVotos, maxVoto } = props

  // Instanciamos los estilos
  const styles = useStyles()

  // Calculamos los porcentajes de votos y voto máximop
  const decVotos = totalVotos > 0 ? row.votos / totalVotos : 0
  const decMaxVotos = totalVotos > 0 ? maxVoto / totalVotos : 0

  // Ancho base
  const widthBase = 76
  const width = `${(decVotos / decMaxVotos) * widthBase}%`

  // Color base
  const color = '#04A3B6'

  // Renderizamos el componente
  return (
    <Paper className="w-full rounded-8 shadow-1">
      <div className="flex flex-row items-center pt-10 pb-4 px-10">
        <Typography className="text-16 font-bold">{`${row.nombre}`.toLocaleUpperCase()}</Typography>
        <Typography className="text-16 font-bold px-8" style={{ color }}>
          {row.votos} votos
        </Typography>
      </div>
      <div className="flex flex-row items-center">
        <div className={styles.bar} style={{ width, backgroundColor: color }} />
        <Typography className="text-18 font-bold pl-6" style={{ color }}>
          {(decVotos * 100).toFixed(2)} %
        </Typography>
      </div>
    </Paper>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ReportesVotoProvincia.propTypes = {
  row: PropTypes.object.isRequired,
  totalVotos: PropTypes.number.isRequired,
  maxVoto: PropTypes.number.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ReportesVotoProvincia
