import { convertKeysToCamelCase } from '../src/utils/convertKeysToCamelCase';
import { test, expect } from 'vitest';

const mockDate = new Date();

const mock = [
	{
		a_1: '1',
		__a_2: 2,
		a_3: ['a33', 'a3_4'],
		AA_AA_4: {
			a_5: 5,
			a_6: {
				a_11: 11,
				a_12: [12]
			},
		},
		a5: [1, 2, 3],
		a6: true,
		a7: {},
		'a 9': 'abc',
		'a-10': 10,
		a_13: mockDate,
	},
	{
		a_1: 11,
		__a_2: 12,
		a_3: ['a1313', 'a13_14'],
		AA_AA_4: {
			a_5: 15,
			a_6: {
				a_11: 111,
				a_12: [112]
			},
		},
		a5: [],
		a6: false,
		a7: {},
		'a 9': 'abc',
		'a-10': 10,
		a_13: mockDate,
	},
];

const convertedMock = [
	{
		a1: '1',
		a2: 2,
		a3: ['a33', 'a3_4'],
		aaAa4: {
			a5: 5,
			a6: {
				a11: 11,
				a12: [12]
			},
		},
		a5: [1, 2, 3],
		a6: true,
		a7: {},
		a9: 'abc',
		a10: 10,
		a13: mockDate,
	},
	{
		a1: 11,
		a2: 12,
		a3: ['a1313', 'a13_14'],
		aaAa4: {
			a5: 15,
			a6: {
				a11: 111,
				a12: [112]
			},
		},
		a5: [],
		a6: false,
		a7: {},
		a9: 'abc',
		a10: 10,
		a13: mockDate,
	},
];

test('converts nested snake_case keys to camelCase', () => {
	expect(convertKeysToCamelCase(mock)).toStrictEqual(convertedMock);
});

test('returns primitives and arrays unchanged', () => {
	expect(convertKeysToCamelCase('a')).toStrictEqual('a');
	expect(convertKeysToCamelCase(123)).toStrictEqual(123);
	expect(convertKeysToCamelCase(null)).toStrictEqual(null);
	expect(convertKeysToCamelCase(undefined)).toStrictEqual(undefined);
	expect(convertKeysToCamelCase(['a1313', 'a13_14'])).toStrictEqual(['a1313', 'a13_14']);
});

test('returns empty arrays unchanged', () => {
	expect(convertKeysToCamelCase([])).toStrictEqual([]);
});

test('returns empty objects unchanged', () => {
	expect(convertKeysToCamelCase({})).toStrictEqual({});
});

test('does not modify objects with keys already in camelCase', () => {
	const localMock = {
		a1: 1,
		a2: 2,
		a3: 3,
	};

	expect(convertKeysToCamelCase(localMock)).toStrictEqual(localMock);
});

test('does not convert File instances', () => {
	const file = new File(['content'], 'test.txt');
	const data = { some_key: file };
  
	const result = convertKeysToCamelCase(data);
  
	expect(result.someKey).toBe(file);
	expect(result.someKey instanceof File).toBe(true);
});