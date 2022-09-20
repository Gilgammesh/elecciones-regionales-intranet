/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Typography, Paper, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ColorExtractor } from 'react-color-extractor'
import clsx from 'clsx'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  paper: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#F5F5F5'
    }
  },
  avatar: {
    width: 70,
    height: 70,
    borderWidth: 2,
    boxSizing: 'content-box',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut
    }),
    '& > img': {
      borderRadius: '50%'
    },
    '& img': {
      width: 52,
      height: 66
    }
  },
  bar: {
    height: 30,
    borderBottomLeftRadius: 8
  },
  logo: {
    maxWidth: 90,
    height: 70,
    opacity: 0.3
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Reportes Candidato //
/*******************************************************************************************************/
const ReportesCandidato = props => {
  // Obtenemos las propiedades del componente
  const { row, totalVotos, maxVoto, organizacion, setOrganizacion } = props

  // Creamos la referencia
  const ref = useRef(row._id)

  // Instanciamos los estilos
  const styles = useStyles()

  // Valor del color predominante
  const [color, setColor] = useState('')

  // Calculamos los porcentajes de votos y voto máximop
  const decVotos = totalVotos > 0 ? row.votos / totalVotos : 0
  const decMaxVotos = totalVotos > 0 ? maxVoto / totalVotos : 0

  // Ancho base
  const widthBase = 82
  const width = `${(decVotos / decMaxVotos) * widthBase}%`

  // Efecto para captura el evento click
  useEffect(() => {
    // Función cuando se clickea fuera del componente
    const handleClickOutside = evt => {
      if (ref.current && !ref.current.contains(evt.target)) {
        setOrganizacion('')
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setOrganizacion])

  // Renderizamos el componente
  return (
    <Paper
      className={clsx('w-full rounded-8 shadow-1', styles.paper, organizacion === row._id ? 'bg-gray-100' : '')}
      onClick={() => setOrganizacion(row._id)}
      ref={ref}
    >
      <ColorExtractor src={row.logo} getColors={colors => setColor(colors[0])} />
      <div className="flex flex-row justify-between items-center pt-10 pb-2 px-10">
        <div className="flex flex-row items-center">
          <Avatar
            className={clsx(styles.avatar, 'avatar')}
            alt="foto"
            src={row.candidato.foto}
            style={{ borderColor: color }}
          />
          <div className="flex flex-col justify-center p-10">
            <Typography className="text-16 font-bold">
              {`${row.candidato.nombres} ${row.candidato.apellidos}`.toLocaleUpperCase()}
            </Typography>
            <Typography className="text-12">{`${row.nombre}`.toLocaleUpperCase()}</Typography>
            <Typography className="text-16 font-bold" style={{ color }}>
              {row.votos} votos
            </Typography>
          </div>
        </div>
        <img alt="logo" src={row.logo} className={styles.logo} />
      </div>
      <div className="flex flex-row items-center">
        <div className={styles.bar} style={{ width, backgroundColor: color }} />
        <Typography className="text-20 font-bold pl-6" style={{ color }}>
          {(decVotos * 100).toFixed(2)} %
        </Typography>
      </div>
    </Paper>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
ReportesCandidato.propTypes = {
  row: PropTypes.object.isRequired,
  totalVotos: PropTypes.number.isRequired,
  maxVoto: PropTypes.number.isRequired,
  organizacion: PropTypes.string.isRequired,
  setOrganizacion: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ReportesCandidato
