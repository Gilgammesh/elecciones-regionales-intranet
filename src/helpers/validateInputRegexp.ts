/*******************************************************************************************************/
// Función que valida el valor del texto con el tipo de input, si pasa el test devuelve true //
/*******************************************************************************************************/
const validateInputRegexp = (type: string, value: string): boolean => {
  // Tipo de regexp para validación de texto
  const onlyNumber: RegExp = /^[0-9\b]+$/ // Sólo números
  const onlyLetter: RegExp = /^[A-ZÁ-Úa-zá-ú\b]+$/ // Sólo letras
  const onlyLetterAndGuion: RegExp = /^[A-ZÁ-Úa-zá-ú-\b]+$/ // Sólo letras y guiones
  const onlyNumberAndSpace: RegExp = /^[0-9\s]+$/ // Sólo números con espacios
  const onlyLetterAndSpace: RegExp = /^[A-ZÁ-Úa-zá-ú\s]+$/ // Sólo letras con espacios

  // Condicional de tipos de inputs
  switch (type) {
    case 'onlyNumber':
      if (value === '' || onlyNumber.test(value)) {
        return true
      }
      return false
    case 'onlyLetter':
      if (value === '' || onlyLetter.test(value)) {
        return true
      }
      return false
    case 'onlyLetterAndGuion':
      if (value === '' || onlyLetterAndGuion.test(value)) {
        return true
      }
      return false
    case 'onlyNumberAndSpace':
      if (value === '' || onlyNumberAndSpace.test(value)) {
        return true
      }
      return false
    case 'onlyLetterAndSpace':
      if (value === '' || onlyLetterAndSpace.test(value)) {
        return true
      }
      return false
    default:
      return true
  }
}

/*******************************************************************************************************/
// Exportamos la función //
/*******************************************************************************************************/
export default validateInputRegexp
