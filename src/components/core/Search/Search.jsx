/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { memo, useReducer, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import { makeStyles } from '@material-ui/core/styles';
import {
	ClickAwayListener,
	Icon,
	IconButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Paper,
	Popper,
	TextField,
	Tooltip,
	Typography
} from '@material-ui/core';
import clsx from 'clsx';
import _ from 'lodash';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

/*******************************************************************************************************/
// Definimos el componente que renderiza la caja de texto buscar  //
/*******************************************************************************************************/
const renderInputComponent = inputProps => {
	const { variant, classes, inputRef = () => {}, ref, ...other } = inputProps;
	return (
		<div className="w-full relative">
			{variant === 'basic' ? (
				// Outlined
				<>
					<TextField
						fullWidth
						InputProps={{
							inputRef: node => {
								ref(node);
								inputRef(node);
							},
							classes: {
								input: clsx(classes.input, 'py-0 px-16 h-48 ltr:pr-48 rtl:pl-48'),
								notchedOutline: 'rounded-8'
							}
						}}
						variant="outlined"
						{...other}
					/>
					<Icon
						className="absolute top-0 ltr:right-0 rtl:left-0 h-48 w-48 p-12 pointer-events-none"
						color="action"
					>
						search
					</Icon>
				</>
			) : (
				// Standard
				<TextField
					fullWidth
					InputProps={{
						disableUnderline: true,
						inputRef: node => {
							ref(node);
							inputRef(node);
						},
						classes: {
							input: clsx(classes.input, 'py-0 px-16 h-64')
						}
					}}
					variant="standard"
					{...other}
				/>
			)}
		</div>
	);
};

/*******************************************************************************************************/
// Definimos el componente que renderiza la sugerencia del buscador  //
/*******************************************************************************************************/
const renderSuggestion = (suggestion, { query, isHighlighted }) => {
	const matches = match(suggestion.title, query);
	const parts = parse(suggestion.title, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<ListItemIcon className="min-w-40">
				{suggestion.icon ? (
					<Icon>{suggestion.icon}</Icon>
				) : (
					<span className="text-20 w-24 font-bold uppercase text-center">{suggestion.title[0]}</span>
				)}
			</ListItemIcon>
			<ListItemText
				primary={parts.map((part, index) =>
					part.highlight ? (
						<span key={String(index)} style={{ fontWeight: 600 }}>
							{part.text}
						</span>
					) : (
						<strong key={String(index)} style={{ fontWeight: 300 }}>
							{part.text}
						</strong>
					)
				)}
			/>
		</MenuItem>
	);
};

/*******************************************************************************************************/
// Función que obtiene las sugerencias //
/*******************************************************************************************************/
const getSuggestions = (value, data) => {
	const inputValue = _.deburr(value.trim()).toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	return inputLength === 0
		? []
		: data.filter(suggestion => {
				const keep = count < 10 && match(suggestion.title, inputValue).length > 0;
				if (keep) {
					count += 1;
				}
				return keep;
		  });
};

/*******************************************************************************************************/
// Función que obtiene el valor de una sugerencia //
/*******************************************************************************************************/
const getSuggestionValue = suggestion => {
	return suggestion.title;
};

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
	root: {},
	container: {
		position: 'relative'
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing(),
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	input: {
		transition: theme.transitions.create(['background-color'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.short
		}),
		'&:focus': {
			backgroundColor: theme.palette.background.paper
		}
	}
}));

/*******************************************************************************************************/
// Estado inicial del reducer para Search //
/*******************************************************************************************************/
const initialState = {
	searchText: '',
	search: false,
	navigation: null,
	suggestions: [],
	noSuggestions: false
};

/*******************************************************************************************************/
// Definimos las acciones del reducer de Search //
/*******************************************************************************************************/
const reducer = (state, action) => {
	switch (action.type) {
		case 'open': {
			return {
				...state,
				opened: true
			};
		}
		case 'close': {
			return {
				...state,
				opened: false,
				searchText: ''
			};
		}
		case 'setSearchText': {
			return {
				...state,
				searchText: action.value
			};
		}
		case 'setNavigation': {
			return {
				...state,
				navigation: action.value
			};
		}
		case 'updateSuggestions': {
			const suggestions = getSuggestions(action.value, state.navigation);
			const isInputBlank = action.value.trim() === '';
			const noSuggestions = !isInputBlank && suggestions.length === 0;
			return {
				...state,
				suggestions,
				noSuggestions
			};
		}
		case 'clearSuggestions': {
			return {
				...state,
				suggestions: [],
				noSuggestions: false
			};
		}
		case 'decrement': {
			return { count: state.count - 1 };
		}
		default: {
			throw new Error();
		}
	}
};

/*******************************************************************************************************/
// Definimos el componente Buscador de la Aplicación //
/*******************************************************************************************************/
/* FIXME: Configurar el botón de búsqueda del Toolbar y probar todas sus funcionalidades */
const Search = props => {
	// Hook de reducer para manejar el state y dispatch del componente Search
	const [state, dispatch] = useReducer(reducer, initialState);

	// Instanciamos los estilos
	const styles = useStyles(props);

	// Creamos las referencias para sugerencias y popper
	const suggestionsNode = useRef(null);
	const popperNode = useRef(null);

	// Función para mostrar el input search
	const showSearch = () => {
		dispatch({ type: 'open' });
		document.addEventListener('keydown', escFunction, false);
	};

	// Función para ocultar el input search
	const hideSearch = () => {
		dispatch({ type: 'close' });
		document.removeEventListener('keydown', escFunction, false);
	};

	// Función que oculta el input search al presionar la tecla ESC
	const escFunction = event => {
		if (event.keyCode === 27) {
			hideSearch();
		}
	};

	// Función que obtiene las sugerencias con el texto buscado
	const handleSuggestionsFetchRequested = ({ value }) => {
		dispatch({
			type: 'updateSuggestions',
			value
		});
	};

	// Función para direccionar cuando se selecciona la opción sugerida
	const handleSuggestionSelected = (event, { suggestion }) => {
		event.preventDefault();
		event.stopPropagation();
		if (!suggestion.url) {
			return;
		}
		props.history.push(suggestion.url);
		hideSearch();
	};

	// Función para limpiar las sugerencias encontradas
	const handleSuggestionsClearRequested = () => {
		dispatch({
			type: 'clearSuggestions'
		});
	};

	// Función que guarda en el estado el texto tipeado
	const handleChange = event => {
		dispatch({
			type: 'setSearchText',
			value: event.target.value
		});
	};

	// Función para el evento de clickear dentro de la caja o fuera de ella
	const handleClickAway = event => {
		return (!suggestionsNode.current || !suggestionsNode.current.contains(event.target)) && hideSearch();
	};

	// Propiedades de la autosugerencia
	const autosuggestProps = {
		renderInputComponent,
		highlightFirstSuggestion: true,
		suggestions: state.suggestions,
		onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
		onSuggestionsClearRequested: handleSuggestionsClearRequested,
		onSuggestionSelected: handleSuggestionSelected,
		getSuggestionValue,
		renderSuggestion
	};

	// Renderizamos el componente
	return (
		<div className={clsx(styles.root, 'flex', props.className)}>
			<Tooltip title="Presione para buscar" placement="bottom">
				<div onClick={showSearch} onKeyDown={showSearch} role="button" tabIndex={0}>
					{props.trigger}
				</div>
			</Tooltip>

			{state.opened && (
				<ClickAwayListener onClickAway={handleClickAway}>
					<Paper className="absolute left-0 right-0 top-0 h-full z-9999" square>
						<div className="flex items-center w-full" ref={popperNode}>
							<Autosuggest
								{...autosuggestProps}
								inputProps={{
									classes: styles,
									placeholder: 'Buscar',
									value: state.searchText,
									onChange: handleChange,
									InputLabelProps: {
										shrink: true
									},
									autoFocus: true
								}}
								theme={{
									container: 'flex flex-1 w-full',
									suggestionsList: styles.suggestionsList,
									suggestion: styles.suggestion
								}}
								renderSuggestionsContainer={options => (
									<Popper
										anchorEl={popperNode.current}
										open={Boolean(options.children) || state.noSuggestions}
										popperOptions={{ positionFixed: true }}
										className="z-9999"
									>
										<div ref={suggestionsNode}>
											<Paper
												elevation={1}
												square
												{...options.containerProps}
												style={{
													width: popperNode.current ? popperNode.current.clientWidth : null
												}}
											>
												{options.children}
												{state.noSuggestions && (
													<Typography className="px-16 py-12">No results..</Typography>
												)}
											</Paper>
										</div>
									</Popper>
								)}
							/>
							<IconButton onClick={hideSearch} className="mx-8">
								<Icon>close</Icon>
							</IconButton>
						</div>
					</Paper>
				</ClickAwayListener>
			)}
		</div>
	);
};

/*******************************************************************************************************/
// Declaramos los tipos de propiedades del componente //
/*******************************************************************************************************/
Search.propTypes = {};

/*******************************************************************************************************/
// Declaramos las propiedades por defecto del componente //
/*******************************************************************************************************/
Search.defaultProps = {
	trigger: (
		<IconButton className="w-40 h-40">
			<Icon>search</Icon>
		</IconButton>
	),
	variant: 'full' // basic, full
};

/*******************************************************************************************************/
// Exportamos el componente memorizado y con rutas //
/*******************************************************************************************************/
export default withRouter(memo(Search));
