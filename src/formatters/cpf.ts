const maskCpf = (value: string) => {
	if (!value) {
		return '';
	}

	const cpf = value.replace(/\D/g, '');

	if (cpf.length === 11) {
		return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
	}

	return cpf;
};

const removeCpfMask = (value: string) => {
	if (!value) {
		return '';
	}

	return value.replace(/\D/g, '');
};

export { maskCpf, removeCpfMask };
