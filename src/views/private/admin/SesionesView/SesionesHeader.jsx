/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Paper, Typography, useTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Animate from 'components/core/Animate';
import { selectContrastMainTheme } from 'configs/themes';
import { normalizar } from 'helpers/texts';

/*******************************************************************************************************/
// Definimos la Vista del componente Monitor - Sesiones Header //
/*******************************************************************************************************/
const SesionesHeader = props => {
	// Obtenemos las propiedades del componente
	const { list, setData } = props;

	// Obtenemos el tema de la app
	const theme = useTheme();

	// Obtenemos el tema de contraste
	const contrastTheme = selectContrastMainTheme(theme);

	// Estado inicial de la caja de búsqueda
	const [searchText, setSearchText] = useState('');

	// Si hay un cambio en la lista de tabla
	useEffect(() => {
		// Limpiamos la caja de búsqueda
		setSearchText('');
	}, [list]);

	// Función para cambiar el valor de la caja de búsqueda
	const handleInputSearch = async evt => {
		// Obtenemos el valor
		const { value } = evt.target;
		// Establecemos el valor de la caja
		setSearchText(value);
		// Normalizamos el valor
		const value_ = await normalizar(value);
		// Recorremos la lista para filtrar los datos buscados
		const promises = list
			.map(ele => ele)
			.filter(ele => {
				// Construimos la cadena de usuario
				const usuario = `${ele.usuario.apellido_paterno} ${ele.usuario.apellido_materno} ${ele.usuario.nombres}`;
				return normalizar(ele.ultimo_ingreso).includes(value_) || normalizar(usuario).includes(value_);
			});
		const filter = await Promise.all(promises);
		// Guardamos la data filtrada
		setData(filter);
	};

	// Renderizamos el componente
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Animate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">important_devices</Icon>
				</Animate>
				<Animate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Sesiones
					</Typography>
				</Animate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={contrastTheme}>
					<Animate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>
							<Input
								placeholder="Buscar"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Buscar'
								}}
								onChange={handleInputSearch}
							/>
						</Paper>
					</Animate>
				</ThemeProvider>
			</div>
		</div>
	);
};

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
SesionesHeader.propTypes = {
	list: PropTypes.array.isRequired,
	setData: PropTypes.func.isRequired
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default SesionesHeader;
