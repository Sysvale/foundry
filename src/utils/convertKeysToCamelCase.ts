import { isPlainObject, camelCase } from 'lodash-es';
import type { CamelCasedPropertiesDeep } from 'type-fest';

export function convertKeysToCamelCase<T>(data: T): CamelCasedPropertiesDeep<T> {
	if (isArray(data)) {
		return convertArray(data) as CamelCasedPropertiesDeep<T>;
	}
	
	if (isPlainObject(data)) {
		return convertObject(data as Record<string, unknown>) as CamelCasedPropertiesDeep<T>;
	}

	return data as CamelCasedPropertiesDeep<T>;
};

function convertArray<T>(data: T[]): CamelCasedPropertiesDeep<T>[] {
	return data.map((element) => {
		if (shouldRecurse(element)) {
			return convertKeysToCamelCase(element);
		}

		return element;
	}) as CamelCasedPropertiesDeep<T[]>;
}

function convertObject(data: Record<string, unknown>): Record<string, unknown> {
	const newData: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(data)) {
		if (shouldRecurse(value)) {
			newData[camelCase(key)] = convertKeysToCamelCase(value);
		} else {
			newData[camelCase(key)] = value;
		}
	}

	return newData;
}

function isArray(arg: unknown): arg is unknown[] {
	return Array.isArray(arg);
}

function shouldRecurse(value: unknown) {
	return Array.isArray(value) || isPlainObject(value);
}
