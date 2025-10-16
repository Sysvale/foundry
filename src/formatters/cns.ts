function maskCns(value: string | number, emptyValueIndicator = '') {
	let cns = typeof value === 'number' ? value.toString() : value;

	if (!cns) {
		return emptyValueIndicator;
	}

	cns = cns.replace(/[^0-9]+/g, '');

	if (cns.length === 15) {
		return `${cns.substring(0, 3)} ${cns.substring(3, 7)} ${cns.substring(7, 11)} ${cns.substring(11, 15)}`;
	}

	return cns;
}

function removeCnsMask(value: string) {
	if (!value || !(typeof value === 'string') || value.length === 0) {
		return '';
	}

	return value.replace(/\s/g, '');
}

export { maskCns, removeCnsMask };
