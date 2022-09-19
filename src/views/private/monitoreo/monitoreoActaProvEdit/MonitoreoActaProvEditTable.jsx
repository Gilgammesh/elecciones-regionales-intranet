/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import Scrollbars from 'components/core/Scrollbars'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import ProgressLinear from 'components/core/Progress/ProgressLinear'
import { apiBaseUrl } from 'configs/settings'

/*******************************************************************************************************/
// Definimos la Vista del componente Monitoreo Acta Provincial - Editar Table //
/*******************************************************************************************************/
const MonitoreoActaProvEditTable = props => {
  // Obtenemos las propiedades del componente
  const {
    row,
    loading,
    nulos,
    setNulos,
    blancos,
    setBlancos,
    impugnados,
    setImpugnados,
    organizaciones,
    getTotalAlcProv,
    getTotalAlcDist,
    setVotosAlcProv,
    setVotosAlcDist
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
                {getTotalAlcProv()}
              </TableCell>
              {row.distrito.codigo !== '01' && (
                <TableCell align="center" padding="normal" className="font-extrabold bg-blue-50">
                  {getTotalAlcDist()}
                </TableCell>
              )}
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
                Alcalde Provincial
              </TableCell>
              {row.distrito.codigo !== '01' && (
                <TableCell align="center" padding="normal" className="font-extrabold">
                  Alcalde Distrital
                </TableCell>
              )}
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
                      {organizacion.alcaldeProv && organizacion.alcaldeProv.length > 0 ? (
                        <img alt="foto" src={organizacion.alcaldeProv[0].foto} width="40" height="auto" />
                      ) : (
                        <img
                          alt="foto"
                          src={`${apiBaseUrl}/uploads/organizaciones-politicas/alcaldes/no-foto.png`}
                          width="40"
                          height="auto"
                        />
                      )}
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row">
                      <img alt="logo" src={organizacion.logo} width="40" height="auto" />
                    </TableCell>
                    <TableCell className="py-2" component="th" scope="row" align="center">
                      <TextFieldFormsy
                        className="col-span-12"
                        type="number"
                        name="votos_alc_prov"
                        accept="onlyNumber"
                        value={`${organizacion.votos_alc_prov}`}
                        onChange={evt => setVotosAlcProv(evt, organizacion._id)}
                        variant="outlined"
                        disabled={organizacion.alcaldeProv && organizacion.alcaldeProv.length > 0 ? false : true}
                        inputProps={{
                          maxLength: 3,
                          min: 0,
                          max: 999
                        }}
                      />
                    </TableCell>
                    {row.distrito.codigo !== '01' && (
                      <TableCell className="py-2" component="th" scope="row" align="center">
                        <TextFieldFormsy
                          className="col-span-12"
                          type="number"
                          name="votos_alc_dist"
                          accept="onlyNumber"
                          value={`${organizacion.votos_alc_dist}`}
                          onChange={evt => setVotosAlcDist(evt, organizacion._id)}
                          variant="outlined"
                          disabled={organizacion.alcaldeDist && organizacion.alcaldeDist.length > 0 ? false : true}
                          inputProps={{
                            maxLength: 3,
                            min: 0,
                            max: 999
                          }}
                        />
                      </TableCell>
                    )}
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
                    name="votos_nulos_alc_prov"
                    accept="onlyNumber"
                    value={`${nulos.alc_prov}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setNulos({ ...nulos, alc_prov: 0 })
                      } else {
                        setNulos({ ...nulos, alc_prov: parseInt(evt.target.value, 10) })
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
                {row.distrito.codigo !== '01' && (
                  <TableCell className="py-2" component="th" scope="row" align="center">
                    <TextFieldFormsy
                      className="col-span-12"
                      type="number"
                      name="votos_nulos_alc_dist"
                      accept="onlyNumber"
                      value={`${nulos.alc_dist}`}
                      onChange={evt => {
                        if (evt.target.value === null || evt.target.value === '') {
                          setNulos({ ...nulos, alc_dist: 0 })
                        } else {
                          setNulos({ ...nulos, alc_dist: parseInt(evt.target.value, 10) })
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
                )}
              </TableRow>
              <TableRow className="h-32" hover tabIndex={-1}>
                <TableCell className="py-2" component="th" scope="row" colSpan={3}>
                  VOTOS EN BLANCO
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_blancos_alc_prov"
                    accept="onlyNumber"
                    value={`${blancos.alc_prov}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setBlancos({ ...blancos, alc_prov: 0 })
                      } else {
                        setBlancos({ ...blancos, alc_prov: parseInt(evt.target.value, 10) })
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
                {row.distrito.codigo !== '01' && (
                  <TableCell className="py-2" component="th" scope="row" align="center">
                    <TextFieldFormsy
                      className="col-span-12"
                      type="number"
                      name="votos_blancos_alc_dist"
                      accept="onlyNumber"
                      value={`${blancos.alc_dist}`}
                      onChange={evt => {
                        if (evt.target.value === null || evt.target.value === '') {
                          setNulos({ ...blancos, alc_dist: 0 })
                        } else {
                          setNulos({ ...blancos, alc_dist: parseInt(evt.target.value, 10) })
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
                )}
              </TableRow>
              <TableRow className="h-32" hover tabIndex={-1}>
                <TableCell className="py-2" component="th" scope="row" colSpan={3}>
                  VOTOS IMPUGNADOS
                </TableCell>
                <TableCell className="py-2" component="th" scope="row" align="center">
                  <TextFieldFormsy
                    className="col-span-12"
                    type="number"
                    name="votos_impugnados_alc_prov"
                    accept="onlyNumber"
                    value={`${impugnados.alc_prov}`}
                    onChange={evt => {
                      if (evt.target.value === null || evt.target.value === '') {
                        setImpugnados({ ...impugnados, alc_prov: 0 })
                      } else {
                        setImpugnados({ ...impugnados, alc_prov: parseInt(evt.target.value, 10) })
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
                {row.distrito.codigo !== '01' && (
                  <TableCell className="py-2" component="th" scope="row" align="center">
                    <TextFieldFormsy
                      className="col-span-12"
                      type="number"
                      name="votos_impugnados_alc_dist"
                      accept="onlyNumber"
                      value={`${impugnados.alc_dist}`}
                      onChange={evt => {
                        if (evt.target.value === null || evt.target.value === '') {
                          setNulos({ ...impugnados, alc_dist: 0 })
                        } else {
                          setNulos({ ...impugnados, alc_dist: parseInt(evt.target.value, 10) })
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
                )}
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
                {getTotalAlcProv()}
              </TableCell>
              {row.distrito.codigo !== '01' && (
                <TableCell align="center" padding="normal" className="font-extrabold bg-blue-50">
                  {getTotalAlcDist()}
                </TableCell>
              )}
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
MonitoreoActaProvEditTable.propTypes = {
  row: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  nulos: PropTypes.object.isRequired,
  setNulos: PropTypes.func.isRequired,
  blancos: PropTypes.object.isRequired,
  setBlancos: PropTypes.func.isRequired,
  impugnados: PropTypes.object.isRequired,
  setImpugnados: PropTypes.func.isRequired,
  organizaciones: PropTypes.array.isRequired,
  getTotalAlcProv: PropTypes.func.isRequired,
  getTotalAlcDist: PropTypes.func.isRequired,
  setVotosAlcProv: PropTypes.func.isRequired,
  setVotosAlcDist: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MonitoreoActaProvEditTable
