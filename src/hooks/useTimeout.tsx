/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import { useEffect, useRef, EffectCallback } from 'react';

/*******************************************************************************************************/
// Función personalizada para timeout con delay //
/*******************************************************************************************************/
const useTimeout = (callback: EffectCallback, delay: number) => {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (delay && callback && typeof callback === 'function') {
			timer = setTimeout(callbackRef.current, delay || 0);
		}

		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	}, [callback, delay]);
};

/*******************************************************************************************************/
// Exportamos la función //
/*******************************************************************************************************/
export default useTimeout;
