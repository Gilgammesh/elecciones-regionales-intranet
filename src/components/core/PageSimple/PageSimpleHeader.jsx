/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';
import { selectContrastMainTheme } from 'configs/themes';

/*******************************************************************************************************/
// Definimos el componente de Página Simple - Cabecera //
/*******************************************************************************************************/
const PageSimpleHeader = props => {
	// Obtenemos el tema de la app
	const theme = useTheme();

	// Obtenemos el tema de contraste
	const contrastTheme = selectContrastMainTheme(theme);

	// Renderizamos el componente
	return (
		<div className={props.classes.header}>
			{props.header && <ThemeProvider theme={contrastTheme}>{props.header}</ThemeProvider>}
		</div>
	);
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default PageSimpleHeader;
