type FormValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| FormObject
	| FormValue[];

type FormObject = {
	id?: string | number;
	[key: string]: FormValue;
};

type SanitizerFunction<T = FormValue, R = FormValue> = (value: T) => R;

export interface SanitizableField {
	field: string;
	sanitizer: SanitizerFunction;
}

/**
 * Sanitiza dados de formulário removendo campos desnecessários e aplicando transformações.
 *
 * @param { Object } values
 * @param { Object[{ field: 'name', sanitizer: () => {} }] } sanitizableFields
 * @returns { Object }
 */
export function sanitizeForm(
	values: Record<string, FormValue>,
	sanitizableFields?: SanitizableField[]
): Record<string, FormValue> {
	const sanitizers = new Map<string, SanitizerFunction>(
		(sanitizableFields ?? []).map(({ field, sanitizer }) => [field, sanitizer])
	);

	const sanitizeValue = (value: FormValue, key?: string): FormValue => {
		if (value == null) return value;

		if (Array.isArray(value)) {
			return value.map(item => sanitizeValue(item));
		}

		if (typeof value === 'object' && value !== null) {
			const obj = value as FormObject;
			if (obj.id !== undefined) return obj.id;

			return Object.fromEntries(
				Object.entries(obj).map(([k, v]) => [k, sanitizeValue(v, k)])
			);
		}

		if (key && sanitizers.has(key)) {
			return sanitizers.get(key)!(value);
		}

		return value;
	};

	return Object.fromEntries(
		Object.entries(values).map(([key, value]) => [
			key,
			sanitizeValue(value, key),
		])
	);
}
