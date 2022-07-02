/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TextField, MenuItem, InputAdornment, IconButton, Tooltip } from '@material-ui/core'
import TextFieldFormsy from 'components/core/Formsy/TextFieldFormsy'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import CancelIcon from '@material-ui/icons/Cancel'
import { fetchData } from 'services/fetch'
import clsx from 'clsx'
import ProgressCircle from 'components/core/Progress/ProgressCircle'
import DialogPersoneros from './DialogPersoneros'

/*******************************************************************************************************/
// Tipos del Componente //
/*******************************************************************************************************/
const TiposPers = {
  MESA: 'mesa',
  LOCAL: 'local'
}

/*******************************************************************************************************/
// Definimos la Vista del componente Centros de Votación - Mesas - Editar Formulario //
/*******************************************************************************************************/
const MesasEditForm = props => {
  // Obtenemos el id de la mesa de votacin de los parámetros de la ruta
  const { id } = useParams()

  // Obtenemos los datos del usuario logueado
  const usuario = useSelector(state => state.auth.usuario)

  // Obtenemos las propiedades del componente
  const { formValues, handleInputChange, setForm } = props
  const { mesa, local, departamento, provincia, distrito, ubigeo, votantes, personero_mesa, personero_local } =
    formValues

  // Estado inicial de los departamentos
  const [departamentos, setDepartamentos] = useState([])
  // Estado inicial de las provincias
  const [provincias, setProvincias] = useState([])
  // Estado inicial de los distritos
  const [distritos, setDistritos] = useState([])

  // Estado de los datos de la mesa de votación
  const [dataMesa, setDataMesa] = useState({})

  // Detalle del personero de mesa seleccionado
  const [persMesaDet, setPersMesaDet] = useState('')
  // Detalle del personero de local seleccionado
  const [persLocalDet, setPersLocalDet] = useState('')
  // Valor del tipo de personero seleccionado
  const [tipoPers, setTipoPers] = useState('')

  // Estado del Modal de Personeros disponibles
  const [openPers, setOpenPers] = useState(false)

  // Estado de carga de los datos de la mesa
  const [loading, setLoading] = useState(true)

  // Efecto para obtener los datos de la mesa con el id
  useEffect(() => {
    // Estado inicial de montaje
    let mounted = true
    // Función para obtener los datos de una mesa
    const getMesa = async () => {
      // Obtenemos los datos de una mesa con fetch
      const result = await fetchData(`centros-votacion/mesas/${id}`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Obtenemos la mesa
        const mesaR = result.data.mesa
        // Guardamos los datos del formulario
        setForm({
          mesa: mesaR.mesa,
          local: mesaR.local,
          departamento: mesaR.departamento.codigo,
          provincia: mesaR.provincia.codigo,
          distrito: mesaR.distrito.codigo,
          ubigeo: mesaR.ubigeo,
          votantes: mesaR.votantes ? mesaR.votantes : 1,
          personero_mesa: mesaR.personero_mesa ? mesaR.personero_mesa._id : null,
          personero_local: mesaR.personero_local ? mesaR.personero_local._id : null
        })
        setDataMesa(mesaR)
        if (mesaR.personero_mesa) {
          setPersMesaDet(`${mesaR.personero_mesa.nombres} ${mesaR.personero_mesa.apellidos}`)
        }
        if (mesaR.personero_local) {
          setPersLocalDet(`${mesaR.personero_local.nombres} ${mesaR.personero_local.apellidos}`)
        }
        // Finalizamos el estado de carga de los datos del personero
        setLoading(false)
      }
    }
    // Si existe un id
    if (id) {
      // Obtenemos los datos de la mesa
      getMesa()
    }
    return () => {
      mounted = false
    }
  }, [id, setForm])

  // Efecto para obtener los departamentos
  useEffect(() => {
    // Inicializamos el montaje
    let mounted = true
    // Función para obtener la lista de departamentos
    const getDepartamentos = async () => {
      // Obtenemos los roles con fetch
      const result = await fetchData('ubigeo/departamentos?page=1&pageSize=50', { isTokenReq: true })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Recorremos la lista de departamentos
        const promises = result.data.list.map(ele => {
          return (
            <MenuItem key={ele._id} value={ele.codigo}>
              {ele.nombre}
            </MenuItem>
          )
        })
        const listDepartamentos = await Promise.all(promises)
        // Establecemos los departamentos
        setDepartamentos(listDepartamentos)
      }
    }
    // Función para obtener las provincias
    const getProvincias = async dpto => {
      // Obtenemos las provincias con fetch
      const result = await fetchData(`ubigeo/provincias?departamento=${dpto}&page=1&pageSize=100`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Recorremos la lista de provincias
        const promises = result.data.list.map(ele => {
          return (
            <MenuItem key={ele._id} value={ele.codigo}>
              {ele.nombre}
            </MenuItem>
          )
        })
        const listProvincias = await Promise.all(promises)
        // Establecemos las provincias
        setProvincias(listProvincias)
      }
    }
    // Función para obtener los distritos
    const getDistritos = async (dpto, prov) => {
      // Obtenemos los distritos con fetch
      const result = await fetchData(`ubigeo/distritos?departamento=${dpto}&provincia=${prov}&page=1&pageSize=100`, {
        isTokenReq: true
      })
      // Si existe un resultado y el status es positivo
      if (result && mounted && result.data.status) {
        // Recorremos la lista de distritos
        const promises = result.data.list.map(ele => {
          return (
            <MenuItem key={ele._id} value={ele.codigo}>
              {ele.nombre}
            </MenuItem>
          )
        })
        const listDistritos = await Promise.all(promises)
        // Establecemos los distritos
        setDistritos(listDistritos)
      }
    }
    if (departamento && departamento !== '') {
      if (usuario.rol.super) {
        // Obtenemos la lista de departamentos
        getDepartamentos()
      }
      if (provincia && provincia !== '') {
        // Obtenemos la lista de provincias con el departamento
        getProvincias(departamento)
        if (distrito && distrito !== '') {
          // Obtenemos la lista de distritos con el departamento y la provincia
          getDistritos(departamento, provincia)
        }
      }
    }
    return () => {
      // Limpiamos el montaje
      mounted = false
    }
  }, [usuario, departamento, provincia, distrito])

  // Función para mostrar el valor del departamento, provincia, distrito y ubigeo
  const handleInputChangeCustom = evt => {
    const { name, value } = evt.target
    if (name === 'departamento') {
      setForm({
        ...formValues,
        departamento: value,
        provincia: '',
        distrito: '',
        ubigeo: value
      })
    }
    if (name === 'provincia') {
      setForm({
        ...formValues,
        provincia: value,
        distrito: '',
        ubigeo: usuario.rol.super ? `${departamento}${value}` : `${usuario.departamento.codigo}${value}`
      })
    }
    if (name === 'distrito') {
      setForm({
        ...formValues,
        distrito: value,
        ubigeo: usuario.rol.super
          ? `${departamento}${provincia}${value}`
          : `${usuario.departamento.codigo}${provincia}${value}`
      })
    }
  }

  // Función para abrir el Modal de Personeros
  const handleOpenPers = tipo => {
    setTipoPers(tipo)
    setOpenPers(true)
  }

  // Función para prevenir el mouse para abajo
  const handleMouseDown = evt => {
    evt.preventDefault()
  }

  // Función para quitar la asignación del personero
  const handleQuitAssignPerson = tipo => {
    setForm({
      ...formValues,
      ...(tipo === TiposPers.MESA && { personero_mesa: null }),
      ...(tipo === TiposPers.LOCAL && { personero_local: null })
    })
    if (tipo === TiposPers.MESA) setPersMesaDet('')
    if (tipo === TiposPers.LOCAL) setPersLocalDet('')
  }

  // Si los datos de la mesa están cargando
  if (loading) {
    // Renderizamos el componente
    return (
      <div className="flex justify-center align-center w-full">
        <div className="px-20 py-60">
          <ProgressCircle />
        </div>
      </div>
    )
  }

  // Renderizamos el componente
  return (
    <div className="flex flex-col justify-center w-full p-16 sm:p-24">
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <TextFieldFormsy
          className="col-span-12 sm:col-span-2"
          type="text"
          name="mesa"
          label="Mesa"
          accept="onlyNumber"
          value={mesa}
          onChange={handleInputChange}
          variant="outlined"
          validations={{
            minLength: 6,
            maxLength: 6
          }}
          validationErrors={{
            minLength: 'La mesa debe tener 06 dígitos',
            maxLength: 'La mesa debe tener 06 dígitos'
          }}
          inputProps={{
            maxLength: 6
          }}
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-6"
          type="text"
          name="local"
          label="Local de votación"
          value={local}
          onChange={handleInputChange}
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="col-span-12 sm:col-span-1"
          type="number"
          name="votantes"
          label="Votantes"
          accept="onlyNumber"
          value={votantes}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            min: 1
          }}
        />
      </div>
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        <TextField
          label="Personero de Mesa"
          className="col-span-12 sm:col-span-4"
          value={personero_mesa ? persMesaDet : ''}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={personero_mesa ? 'Cambiar' : 'Asignar'} placement="bottom-start" enterDelay={100}>
                  <IconButton
                    color="default"
                    style={{ padding: '6px' }}
                    aria-label="add change personero"
                    onClick={() => handleOpenPers(TiposPers.MESA)}
                    onMouseDown={handleMouseDown}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
                {personero_mesa && (
                  <Tooltip title="Quitar" placement="bottom-start" enterDelay={100}>
                    <IconButton
                      style={{ padding: '6px', color: '#F44343' }}
                      aria-label="quit personero"
                      onClick={() => handleQuitAssignPerson(TiposPers.MESA)}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </InputAdornment>
            )
          }}
          inputProps={{
            readOnly: true
          }}
        />
        <TextField
          label="Personero de Local"
          className="col-span-12 sm:col-span-4"
          value={personero_local ? persLocalDet : ''}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={personero_local ? 'Cambiar' : 'Asignar'} placement="bottom-start" enterDelay={100}>
                  <IconButton
                    color="default"
                    style={{ padding: '6px' }}
                    aria-label="add change personero"
                    onClick={() => handleOpenPers(TiposPers.LOCAL)}
                    onMouseDown={handleMouseDown}
                  >
                    <PersonAddIcon />
                  </IconButton>
                </Tooltip>
                {personero_local && (
                  <Tooltip title="Quitar" placement="bottom-start" enterDelay={100}>
                    <IconButton
                      style={{ padding: '6px', color: '#F44343' }}
                      aria-label="quit personero"
                      onClick={() => handleQuitAssignPerson(TiposPers.LOCAL)}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </InputAdornment>
            )
          }}
          inputProps={{
            readOnly: true
          }}
        />
        <DialogPersoneros
          open={openPers}
          setOpen={setOpenPers}
          formValues={formValues}
          setForm={setForm}
          mesa={dataMesa}
          tipo={tipoPers}
          setPersMesaDet={setPersMesaDet}
          setPersLocalDet={setPersLocalDet}
        />
      </div>
      <div className="grid grid-cols-12 gap-24 mt-16 mb-16">
        {usuario.rol.super &&
          departamento &&
          departamento !== '' &&
          departamentos &&
          departamentos.length >
            0(
              <TextField
                select
                className="col-span-12 sm:col-span-2"
                name="departamento"
                label="Departamento"
                value={departamento}
                onChange={handleInputChangeCustom}
                variant="outlined"
                required
              >
                {departamentos}
              </TextField>
            )}
        {provincia && provincia !== '' && provincias && provincias.length > 0 && (
          <TextField
            select
            className={clsx('col-span-12', usuario.rol.super ? 'sm:col-span-4' : 'sm:col-span-4')}
            name="provincia"
            label="Provincia"
            value={provincia}
            onChange={handleInputChangeCustom}
            variant="outlined"
            required
          >
            {provincias}
          </TextField>
        )}
        {distrito && distrito !== '' && distritos && distritos.length > 0 && (
          <TextField
            select
            className={clsx('col-span-12', usuario.rol.super ? 'sm:col-span-4' : 'sm:col-span-4')}
            name="distrito"
            label="Distrito"
            value={distrito}
            onChange={handleInputChangeCustom}
            variant="outlined"
            required
          >
            {distritos}
          </TextField>
        )}
        <TextFieldFormsy
          className="col-span-12 sm:col-span-2"
          type="text"
          name="ubigeo"
          label="Ubigeo"
          accept="onlyNumber"
          value={ubigeo}
          variant="outlined"
          validations={{
            minLength: 6,
            maxLength: 6
          }}
          validationErrors={{
            minLength: 'El ubigeo debe tener 06 dígitos',
            maxLength: 'El ubigeo debe tener 06 dígitos'
          }}
          inputProps={{
            maxLength: 6,
            readOnly: true
          }}
          required
        />
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
MesasEditForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default MesasEditForm
