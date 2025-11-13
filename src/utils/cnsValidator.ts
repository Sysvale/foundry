function checkCnsValue(value: string) {
	let pis;
	let rest;
	let sum;

	pis = value.substring(0, 15);

	if (pis === '') {
		return false;
	}

	if (
		value.substring(0, 1) !== '7' &&
		value.substring(0, 1) !== '8' &&
		value.substring(0, 1) !== '9'
	) {
		return false;
	}

	sum =
		parseInt(pis.substring(0, 1), 10) * 15 +
		parseInt(pis.substring(1, 2), 10) * 14 +
		parseInt(pis.substring(2, 3), 10) * 13 +
		parseInt(pis.substring(3, 4), 10) * 12 +
		parseInt(pis.substring(4, 5), 10) * 11 +
		parseInt(pis.substring(5, 6), 10) * 10 +
		parseInt(pis.substring(6, 7), 10) * 9 +
		parseInt(pis.substring(7, 8), 10) * 8 +
		parseInt(pis.substring(8, 9), 10) * 7 +
		parseInt(pis.substring(9, 10), 10) * 6 +
		parseInt(pis.substring(10, 11), 10) * 5 +
		parseInt(pis.substring(11, 12), 10) * 4 +
		parseInt(pis.substring(12, 13), 10) * 3 +
		parseInt(pis.substring(13, 14), 10) * 2 +
		parseInt(pis.substring(14, 15), 10) * 1;

	rest = sum % 11;

	if (!rest) {
		return true;
	}

	return false;
}

function checkCnsFirstElevenDigits(value: string) {
	let sum = 0;
	let rest = 0;
	let validatorDigit = 0;
	let pis = '';
	let result = '';
	const cnsSize = value.length;

	if (cnsSize !== 15) {
		return false;
	}

	pis = value.substring(0, 11);
	sum =
		Number(pis.substring(0, 1)) * 15 +
		Number(pis.substring(1, 2)) * 14 +
		Number(pis.substring(2, 3)) * 13 +
		Number(pis.substring(3, 4)) * 12 +
		Number(pis.substring(4, 5)) * 11 +
		Number(pis.substring(5, 6)) * 10 +
		Number(pis.substring(6, 7)) * 9 +
		Number(pis.substring(7, 8)) * 8 +
		Number(pis.substring(8, 9)) * 7 +
		Number(pis.substring(9, 10)) * 6 +
		Number(pis.substring(10, 11)) * 5;
	rest = sum % 11;
	validatorDigit = 11 - rest;

	if (validatorDigit === 11) {
		validatorDigit = 0;
	}

	if (validatorDigit === 10) {
		sum =
			Number(pis.substring(0, 1)) * 15 +
			Number(pis.substring(1, 2)) * 14 +
			Number(pis.substring(2, 3)) * 13 +
			Number(pis.substring(3, 4)) * 12 +
			Number(pis.substring(4, 5)) * 11 +
			Number(pis.substring(5, 6)) * 10 +
			Number(pis.substring(6, 7)) * 9 +
			Number(pis.substring(7, 8)) * 8 +
			Number(pis.substring(8, 9)) * 7 +
			Number(pis.substring(9, 10)) * 6 +
			Number(pis.substring(10, 11)) * 5 +
			2;
		rest = sum % 11;
		validatorDigit = 11 - rest;
		result = `${pis}001${String(validatorDigit)}`;
	} else {
		result = `${pis}000${String(validatorDigit)}`;
	}

	if (value !== result) {
		return false;
	}

	return true;
}

/**
 * Valida CNS com e sem máscara.
 *
 * @param { string } value
 * @returns { boolean }
 */
export function cnsValidator(value: string) {
	if (typeof value !== 'string') {
		throw new Error('O tipo do parâmetro passado é inválido.');
	}

	const unmaskedValue = value.replace(/\D/g, '');

	if (unmaskedValue.length !== 15) {
		return false;
	}

	if ([1, 2].indexOf(parseInt(unmaskedValue.substring(0, 1))) != -1) {
		return checkCnsFirstElevenDigits(unmaskedValue);
	}

	return checkCnsValue(unmaskedValue);
}
