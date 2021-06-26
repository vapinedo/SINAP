/**
	* Validar si solo tiene espacios.
	*/
export const NON_WHITE_SPACE_REG_EXP = new RegExp("\\S");
/**
	* Validar solo números.
	*/
export const SOLO_NUMEROS = /^[0-9]+$/
export const SOLO_NUMEROS_MONTO = /^(?:[0-9]{1,10})(?:(,|\.)([0-9]{1,2}))?$/
export const CURRENCY_REG_EXP = /(^[0-9]+)(\,?)([0-9]{1,2})/
/**
	* Validar solo caracteres alfanumericos.
	*/
export const NON_CHAR_SPECIAL_REG_EXP =new RegExp(/^(?=[a-zA-Z0-9~áéíóúñÁÉÍÓÚÑ,. ]*$)/);
/**
	*
	*/
export const DATE_FORMAT_SEARCH = new RegExp(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/);


