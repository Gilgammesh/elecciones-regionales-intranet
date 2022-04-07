/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import { useEffect, useRef, EffectCallback } from 'react';
import isEqual from 'lodash/isEqual';

/*******************************************************************************************************/
// Revisar la documentación:   https://github.com/kentcdodds/use-deep-compare-effect //
/*******************************************************************************************************/
// Función que chequea las dependencias si existen o son valores primitivos
const checkDeps = (deps: any) => {
	if (!deps || !deps.length) {
		throw new Error('useDeepCompareEffect no se debe utilizar sin dependencias. Utilice useEffect en su lugar.');
	}
	if (deps.every(isPrimitive)) {
		throw new Error(
			'useDeepCompareEffect no debe usarse con dependencias que sean todos valores primitivos. Utilice useEffect en su lugar.'
		);
	}
};

// Función que valida si el valor es primitivo
const isPrimitive = (val: any) => {
	return val == null || /^[sbn]/.test(typeof val);
};

// Función que compara la dependencia con la referencia
const useDeepCompareMemorize = (value: any) => {
	const ref = useRef();
	if (!isEqual(value, ref.current)) {
		ref.current = value;
	}
	return ref.current;
};

// Función que ejecuta useEffect, con el callback y las dependecias y chequea las dependencias
const useDeepCompareEffect = (callback: EffectCallback, dependencies: any) => {
	checkDeps(dependencies);
	useEffect(callback, useDeepCompareMemorize(dependencies));
};

// Función que ejecuta useEffect, con el callback y las dependecias sin chequear las dependencias
export const useDeepCompareEffectNoCheck = (callback: EffectCallback, dependencies: any) => {
	useEffect(callback, useDeepCompareMemorize(dependencies));
};

/*******************************************************************************************************/
// Exportamos el hook //
/*******************************************************************************************************/
export default useDeepCompareEffect;
