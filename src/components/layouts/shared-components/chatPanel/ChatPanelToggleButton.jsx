/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon, IconButton } from '@material-ui/core';
import { startToggleChatPanel } from 'redux/actions/chatPanel';

/*******************************************************************************************************/
// Definimos el componente del Layout - Botón para alternar el Chat Panel //
/*******************************************************************************************************/
const ChatPanelToggleButton = props => {
	// Llamamos al dispatch de redux
	const dispatch = useDispatch();

	// Renderizamos el componente
	return (
		<IconButton className="w-40 h-40" onClick={() => dispatch(startToggleChatPanel())}>
			{props.children}
		</IconButton>
	);
};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
ChatPanelToggleButton.defaultProps = {
	children: <Icon>chat</Icon>
};

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default ChatPanelToggleButton;
