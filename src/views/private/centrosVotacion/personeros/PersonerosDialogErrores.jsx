/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Icon,
  Dialog,
  DialogContent,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core'
import { red, orange } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  panel: {
    margin: 0
  },
  expanded: {},
  summary: {
    padding: 0
  },
  red: {
    color: red[300]
  },
  orange: {
    color: orange[400]
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Personeros - Errores al importal excel //
/*******************************************************************************************************/
const PersonerosDialogErrores = props => {
  // Obtenemos las propiedades del componente
  const { open, setOpen, errors } = props

  // Instanciamos los estilos
  const styles = useStyles()

  // Estado de expansión del acordión
  const [expanded, setExpanded] = useState(false)

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false)
  }

  const toggleAccordion = (event, _expanded) => {
    setExpanded(_expanded)
  }

  // Renderizamos el componente
  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose} keepMounted aria-labelledby="errors">
      <DialogContent>
        <div className="grid grid-cols-12 gap-16 mt-16 mb-16">
          <div className="flex flex-col col-span-12 justify-center mb-20">
            <div className="flex flex-row justify-center items-center">
              <Icon fontSize="large" className={styles.orange}>
                warning
              </Icon>
              <Typography variant="h6" className="ml-10">
                Advertencia
              </Typography>
            </div>
            <Accordion
              classes={{
                root: styles.panel,
                expanded: styles.expanded
              }}
              expanded={expanded}
              onChange={toggleAccordion}
              elevation={0}
            >
              <AccordionSummary className={styles.summary} expandIcon={<Icon>expand_more</Icon>}>
                <Typography variant="subtitle1" className="px-8">
                  Hubo errores al importar los personeros, vea el detalle y corrija:
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="flex flex-col">
                {errors.map(error => {
                  return (
                    <Typography key={error.index} className={clsx('mb-4', styles.red)}>
                      {error.msg}
                    </Typography>
                  )
                })}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
PersonerosDialogErrores.propTypes = {
  open: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PersonerosDialogErrores
