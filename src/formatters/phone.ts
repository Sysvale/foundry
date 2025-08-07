const maskPhone = (value: string | null | undefined) => {
	if (!value || value.length === 0) {
		return '';
	}

	const phone = value.replace(/[^0-9]+/g, '');

	if (phone.length === 11) {
		return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`;
	}

	if (phone.length === 10) {
		return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6, 10)}`;
	}
	return phone;
};

const removePhoneMask = (value: string | null | undefined) => {
	if (!value || value.length === 0) {
		return '';
	}

	return value.replace(/\(|\)|-|\s/g, '');
};

export { maskPhone, removePhoneMask };
