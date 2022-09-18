/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import Scrollbars from 'components/core/Scrollbars'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import ProgressLinear from 'components/core/Progress/ProgressLinear'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Regional Table //
/*******************************************************************************************************/
const MonitoreoActaRegTable = props => {
  // Obtenemos las propiedades del componente
  const {
    loading,
    nulos,
    setNulos,
    blancos,
    setBlancos,
    impugnados,
    setImpugnados,
    organizaciones,
    getTotalGober,
    getTotalConse,
    setVotosGober,
    setVotosConse
  } = props

  // Renderizamos el componente
  return (
    <div className="w-full flex flex-col">
      <Scrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className="h-52">
              <TableCell align="left" padding="normal" className="font-extrabold bg-blue-50">
                Votos
              </TableCell>
              <TableCell align="left" padding="normal" className="bg-blue-50"></TableCell>
              <TableCell align="left" padding="normal" className="bg-blue-50"></TableCell>
              <TableCell align="center" padding="normal" className="font-extrabold bg-blue-50">
                {getTotalGober()}
              </TableCell>
              <TableCell align="center" padding="normal" className="font-extrabold bg-blue-50">
                {getTotalConse()}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow className="h-52">
              <TableCell align="left" padding="normal" className="font-extrabold">
                Organización Política
              </TableCell>
              <TableCell align="left" padding="normal" className="font-extrabold"></TableCell>
              <TableCell align="left" padding="normal" className="font-extrabold"></TableCell>
              <TableCell align="center" padding="normal" className="font-extrabold">
                Gobernador
              </TableCell>
              <TableCell align="center" padding="normal" className="font-extrabold">
                Consejero
              </TableCell>
            </TableRow>
          </TableHead>
          {!loading && organizaciones && (
            <TableBody>
              {organizaciones.map(organizacion => {
                return (
                  <TableRow className="h-32" hover tabIndex={-1} key={organizacion._id}>
                    <TableCell className="py-2" component="th" scope="row">
                      <span>{organizacion.nombre}</span>
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      <img alt="foto" src={organizacion.gobernador.foto} width="40" height="auto" />
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      <img alt="logo" src={organizacion.logo} width="40" height="auto" />
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center">
                      <TextFieldFormsy
                        className="col-span-12"
                        type="number"
                        name="votos_gober"
                        accept="onlyNumber"
                        value={`${organizacion.votos_gober}`}
                        onChange={evt => setVotosGober(evt, organizacion._id)}
                        variant="outlined"
                        disabled={organizacion.gobernador ? false : true}
                        inputProps={{
                          maxLength: 3,
                          min: 0,
                          max: 999
                        }}
                      />
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center">
                      <TextFieldFormsy
                        className="col-span-12"
                        type="number"
                        name="votos_conse"
                        accept="onlyNumber"
                        value={`${organizacion.votos_conse}`}
                        onChange={evt => setVotosConse(evt, organizacion._id)}
                        variant="outlined"
                        disabled={organizacion.consejeros && organizacion.consejeros.length > 0 ? false : true}
                        inputProps={{
                          maxLength: 3,
                          min: 0,
                          max: 999
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow className="h-32" hover tabIndex={-1}>
                <TableCell className="py-2" component="th" scope="row" colSpan={3}>
                  VOTOS NULOS
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_nulos_gober"
                    accept="onlyNumber"
                    value={`${nulos.gober}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setNulos({ ...nulos, gober: 0 })
                      } else {
                        setNulos({ ...nulos, gober: parseInt(evt.target.value, 10) })
                      }
                    }}
                    variant="outlined"
                    inputProps={{
                      maxLength: 3,
                      min: 0,
                      max: 999
                    }}
                  />
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_nulos_conse"
                    accept="onlyNumber"
                    value={`${nulos.conse}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setNulos({ ...nulos, conse: 0 })
                      } else {
                        setNulos({ ...nulos, conse: parseInt(evt.target.value, 10) })
                      }
                    }}
                    variant="outlined"
                    inputProps={{
                      maxLength: 3,
                      min: 0,
                      max: 999
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="h-32" hover tabIndex={-1}>
                <TableCell className="py-2" component="th" scope="row" colSpan={3}>
                  VOTOS EN BLANCO
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_blancos_gober"
                    accept="onlyNumber"
                    value={`${blancos.gober}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setBlancos({ ...blancos, gober: 0 })
                      } else {
                        setBlancos({ ...blancos, gober: parseInt(evt.target.value, 10) })
                      }
                    }}
                    variant="outlined"
                    inputProps={{
                      maxLength: 3,
                      min: 0,
                      max: 999
                    }}
                  />
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_blancos_conse"
                    accept="onlyNumber"
                    value={`${blancos.conse}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setNulos({ ...blancos, conse: 0 })
                      } else {
                        setNulos({ ...blancos, conse: parseInt(evt.target.value, 10) })
                      }
                    }}
                    variant="outlined"
                    inputProps={{
                      maxLength: 3,
                      min: 0,
                      max: 999
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow className="h-32" hover tabIndex={-1}>
                <TableCell className="py-2" component="th" scope="row" colSpan={3}>
                  VOTOS IMPUGNADOS
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_impugnados_gober"
                    accept="onlyNumber"
                    value={`${impugnados.gober}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setImpugnados({ ...impugnados, gober: 0 })
                      } else {
                        setImpugnados({ ...impugnados, gober: parseInt(evt.target.value, 10) })
                      }
                    }}
                    variant="outlined"
                    inputProps={{
                      maxLength: 3,
                      min: 0,
                      max: 999
                    }}
                  />
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_impugnados_conse"
                    accept="onlyNumber"
                    value={`${impugnados.conse}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setNulos({ ...impugnados, conse: 0 })
                      } else {
                        setNulos({ ...impugnados, conse: parseInt(evt.target.value, 10) })
                      }
                    }}
                    variant="outlined"
                    inputProps={{
                      maxLength: 3,
                      min: 0,
                      max: 999
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableHead>
            <TableRow className="h-52">
              <TableCell align="left" padding="normal" className="font-extrabold bg-blue-50">
                Votos
              </TableCell>
              <TableCell align="left" padding="normal" className="bg-blue-50"></TableCell>
              <TableCell align="left" padding="normal" className="bg-blue-50"></TableCell>
              <TableCell align="center" padding="normal" className="font-extrabold bg-blue-50">
                {getTotalGober()}
              </TableCell>
              <TableCell align="center" padding="normal" className="font-extrabold bg-blue-50">
                {getTotalConse()}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {loading && (
          <div className="px-20 py-52">
            <ProgressLinear />
          </div>
        )}
      </Scrollbars>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MonitoreoActaRegTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  nulos: PropTypes.object.isRequired,
  setNulos: PropTypes.func.isRequired,
  blancos: PropTypes.object.isRequired,
  setBlancos: PropTypes.func.isRequired,
  impugnados: PropTypes.object.isRequired,
  setImpugnados: PropTypes.func.isRequired,
  organizaciones: PropTypes.array.isRequired,
  getTotalGober: PropTypes.func.isRequired,
  getTotalConse: PropTypes.func.isRequired,
  setVotosGober: PropTypes.func.isRequired,
  setVotosConse: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaRegTable
