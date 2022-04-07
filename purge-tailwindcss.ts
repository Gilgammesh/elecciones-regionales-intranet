/*******************************************************************************************************/
// Requerimos las dependencias //
/*******************************************************************************************************/
const Purgecss = require('purgecss');
const fs = require('fs');
const path = require('path');

/*******************************************************************************************************/
// Extractor de PurgeCSS Personalizado para Tailwin que habilita caracteres especiales en las clases //
/*******************************************************************************************************/
class TailwindExtractor {
	static extract(content) {
		// eslint-disable-next-line no-useless-escape
		return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
	}
}

/*******************************************************************************************************/
// Propiedades del PurgeCSS //
/*******************************************************************************************************/
const purgecss = new Purgecss({
	content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
	css: ['./src/styles/tailwind.css'],
	whitelist: ['pl-24', 'pl-40', 'pl-56', 'pl-72', 'pl-80'],
	extractors: [
		{
			extractor: TailwindExtractor,
			extensions: ['html', 'js', 'jsx', 'ts', 'tsx']
		}
	]
});

/*******************************************************************************************************/
// Ejecutamos la purga //
/*******************************************************************************************************/
const result = purgecss.purge();

/*******************************************************************************************************/
// Guardamos por cada recorrido //
/*******************************************************************************************************/
result.forEach(out => {
	fs.writeFileSync(path.resolve(__dirname, out.file), out.css, 'utf-8');
});

/*******************************************************************************************************/
// Imprimimos en consola //
/*******************************************************************************************************/
console.log('src/styles/tailwind.css purgado exitosamente');
