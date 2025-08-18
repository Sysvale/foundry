const maskCpf = (value: string | number) => {
	let cpf = typeof value === 'number' ? value.toString() : value;

	if (!cpf) {
		return '';
	}

	cpf = cpf.replace(/\D/g, '');

	if (cpf.length === 11) {
		return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
	}

	return cpf;
};

const removeCpfMask = (value: string | number) => {
	let cpf = typeof value === 'number' ? value.toString() : value;

	if (!cpf) {
		return '';
	}

	return cpf.replace(/\D/g, '');
};

export { maskCpf, removeCpfMask };
