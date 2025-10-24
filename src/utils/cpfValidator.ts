function calcChecker1(firstNineDigits: string) {
	let sum = 0;

	for (let j = 0; j < 9; ++j) {
		sum += Number(firstNineDigits.charAt(j)) * (10 - j);
	}

	const lastSumChecker1 = sum % 11;
	const checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;

	return checker1;
}

function calcChecker2(cpfWithChecker1: string) {
	let sum = 0;

	for (let k = 0; k < 10; ++k) {
		sum += Number(cpfWithChecker1.charAt(k)) * (11 - k);
	}
	const lastSumChecker2 = sum % 11;
	const checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;

	return checker2;
}

function cleaner(value: string) {
	return value.replace(/[^\d]/g, '');
}

/**
 * Valida CPFs com e sem máscara.
 *
 * @param { string } value
 * @returns { boolean }
 */
export function cpfValidator(value: string): boolean {
	if (typeof value !== 'string') {
		throw new Error('O tipo do parâmetro passado é inválido.');
	}

	if (!value) {
		return true;
	}

	const cleanCPF = cleaner(value);
	const firstNineDigits = cleanCPF.substring(0, 9);
	const checker = cleanCPF.substring(9, 11);
	let result = false;

	for (let i = 0; i < 10; i++) {
		if (firstNineDigits + checker === Array(12).join(i.toString())) {
			return false;
		}
	}

	const checker1 = calcChecker1(firstNineDigits);
	const checker2 = calcChecker2(`${firstNineDigits}${checker1}`);

	if (checker.toString() === checker1.toString() + checker2.toString()) {
		result = true;
	} else {
		result = false;
	}
	return result;
}
