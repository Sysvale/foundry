const maskPhone = (value: string | null | number | undefined) => {
	let phone = typeof value === 'number' ? value.toString() : value;

	if (!phone || phone.length === 0) {
		return '';
	}

	phone = phone.replace(/[^0-9]+/g, '');

	if (phone.length === 11) {
		return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`;
	}

	if (phone.length === 10) {
		return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6, 10)}`;
	}
	return phone;
};

const removePhoneMask = (value: string | null | number | undefined) => {
	let phone = typeof value === 'number' ? value.toString() : value;

	if (!phone || phone.length === 0) {
		return '';
	}

	return phone.replace(/\(|\)|-|\s/g, '');
};

export { maskPhone, removePhoneMask };
