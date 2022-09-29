/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'
import clsx from 'clsx'
import Animate from 'components/core/Animate'
import AnimateGroup from 'components/core/AnimateGroup'
import AdjustIcon from '@material-ui/icons/Adjust'
import bg from 'assets/images/backgrounds/login-rigth.jpg'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(() => ({
  section: {
    background: `url(${bg})`,
    color: '#FFFFFF',
    backgroundRepeat: 'center'
  },
  background: {
    background: `linear-gradient(to right, ${darken('rgb(62,105,161,0.78)', 0.2)} 0%, ${darken(
      'rgb(249,68,37,0.78)',
      0.2
    )} 100%)`
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Bienvenida Container //
/*******************************************************************************************************/
const HomeContainer = () => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Renderizamos el componente
  return (
    <div className="w-full flex flex-col">
      <div className={clsx(styles.section, 'hidden md:flex flex-1')}>
        <div className={clsx(styles.background, 'md:flex flex-1 p-56')}>
          <div className="flex flex-col items-center">
            <Animate animation="transition.slideUpIn" delay={400}>
              <Typography variant="h4" color="inherit" className="font-800 leading-tight">
                Bienvenido a Elecciones Regionales y Municipales
              </Typography>
            </Animate>
            <AnimateGroup delay={500}>
              <Typography variant="subtitle1" color="inherit" className="mt-16">
                Sistema Integrado interno del partido político para monitorear y gestionar el proceso de las elecciones
                regionales y municipales.
              </Typography>
              <div>
                <List dense={true}>
                  <ListItem>
                    <ListItemIcon>
                      <AdjustIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Configura año de elecciones actuales."
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AdjustIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText primary="Gestiona personeros." primaryTypographyProps={{ variant: 'subtitle1' }} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AdjustIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Gestiona mesas y locales de votación, asignando personeros para cada uno."
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AdjustIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Gestiona partidos políticos, candidatos regionales y municipales."
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AdjustIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Monitorea en línea el conteo de votos el día de elecciones. Integrando el ingreso de actas por parte de los personeros, a través de la app móvil."
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AdjustIcon className="text-white" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Genera reportes estadísticos de las elecciones con filtros personalizados."
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                    />
                  </ListItem>
                </List>
              </div>
            </AnimateGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default HomeContainer
