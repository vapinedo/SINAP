/**
 * Comparar fechas.
 */
export function compareDate(date1: Date, date2: Date): number {
	// With Date object we can compare dates them using the >, <, <= or >=.
	// The ==, !=, ===, and !== operators require to use date.getTime(),
	// so we need to create a new instance of Date with 'new Date()'
	const d1 = new Date(date1);
	const d2 = new Date(date2);

	// Check if the dates are equal
	const same = d1.getTime() === d2.getTime();
	if (same) return 0;

	// Check if the first is greater than second
	if (d1 > d2) return 1;

	// Check if the first is less than second
	if (d1 < d2) return -1;
}

/**
 * Obtener dias de acuerdo al periodo.
 */
export function getDias(periodos: string): number {
	let dias = 0;
	switch (periodos) {
		case 'TMPPRESC01': // Anual
			dias = 365;
			break;
		case 'TMPPRESC02': // Mes
			dias = 30;
			break;
		case 'TMPPRESC03': // Año fiscal -- Validar 1 enero - 31 dic
			dias = 30;
			break;
		case 'TMPPRESC04': // Semestre
			dias = 182;
			break;
		case 'TMPPRESC05': // Trimestre
			dias = 90;
			break;
		case 'TMPPRESC06': // Trimestre
			dias = 60;
			break;
		case 'TMPPRESC07': // Semana
			dias = 8;
			break;
	}
	return dias;
}

export function getFechaFinPeriodo(
	fechaInicial: Date,
	cantidad: number,
	periodos: string
): Date {
	let fechaFinal: Date;
	switch (periodos) {
		case 'TMPPRESC01': // Anual
			fechaFinal = new Date(
				fechaInicial.setMonth(fechaInicial.getMonth() + 12 * cantidad)
			);
			break;
		case 'TMPPRESC02': // Mes
			fechaFinal = new Date(
				fechaInicial.setMonth(fechaInicial.getMonth() + cantidad)
			);
			break;
		case 'TMPPRESC03': // Año fiscal -- Validar 1 enero - 31 dic
		fechaFinal = new Date(fechaInicial.getFullYear() + '-12-31T00:00:00');

			break;
		case 'TMPPRESC04': // Semestre
			fechaFinal = new Date(
				fechaInicial.setMonth(fechaInicial.getMonth() + 6 * cantidad)
			);
			break;
		case 'TMPPRESC05': // Trimestre
			fechaFinal = new Date(
				fechaInicial.setMonth(fechaInicial.getMonth() + 3 * cantidad)
			);
			break;
		case 'TMPPRESC06': // Bimestre
			fechaFinal = new Date(
				fechaInicial.setMonth(fechaInicial.getMonth() + 2 * cantidad)
			);
			break;
		case 'TMPPRESC07': // Semana
			fechaFinal = new Date(
				fechaInicial.setDate(fechaInicial.getDate() + 8 * cantidad)
			);
			break;
	}

	return fechaFinal;
}
