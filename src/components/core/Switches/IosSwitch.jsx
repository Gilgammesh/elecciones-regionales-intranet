/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

/*******************************************************************************************************/
// Definimos el componente Switch Estilo IOS //
/*******************************************************************************************************/
const IosSwitch = withStyles(theme => ({
	root: {
		width: 42,
		height: 26,
		padding: 0,
		margin: theme.spacing(1)
	},
	switchBase: {
		padding: 1,
		'&$checked': {
			transform: 'translateX(16px)',
			color: theme.palette.common.white,
			'& + $track': {
				backgroundColor: '#52d869',
				opacity: 1,
				border: 'none'
			}
		},
		'&$focusVisible $thumb': {
			color: '#52d869',
			border: '6px solid #fff'
		}
	},
	thumb: {
		width: 24,
		height: 24
	},
	track: {
		borderRadius: 26 / 2,
		backgroundColor: '#F44336',
		opacity: 1,
		border: 'none',
		transition: theme.transitions.create(['background-color', 'border'])
	},
	checked: {},
	focusVisible: {}
}))(({ classes, ...props }) => {
	return (
		<Switch
			focusVisibleClassName={classes.focusVisible}
			disableRipple
			classes={{
				root: classes.root,
				switchBase: classes.switchBase,
				thumb: classes.thumb,
				track: classes.track,
				checked: classes.checked
			}}
			{...props}
		/>
	);
});

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default IosSwitch;
