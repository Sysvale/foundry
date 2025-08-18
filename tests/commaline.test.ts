import { test, describe, expect } from 'vitest';
import { commaline } from '../src/utils/commaline';

describe('commaline com strings', () => {
	test('se as vírgulas não são colocadas quando há apenas um item na lista', () => {
		expect(commaline('Abacate', 0, 1)).toBe('Abacate');
	});

	test('se a conjunção "e" é utilizada quando há 2 ou mais items na lista', () => {
		const list = ['manga', 'morango', 'uva', 'abacate'];

		const listWithCommas = list.reduce((acc, cur, index, arr) => {
			return (acc += commaline(cur, index, arr.length));
		}, '');

		expect(listWithCommas).toBe('manga, morango, uva e abacate');
	});

	test('se um erro é emitido quando os parâmetros index e lengh não são enviados', () => {
		expect(() => commaline('Abacate')).toThrow(
			'Index and length must be provided when passing a string'
		);
	});

	test('se é retornado string vazia quando uma string vazia é enviada', () => {
		expect(commaline('', 0, 1)).toBe('');
	});
});

describe('commaline com array de strings', () => {
	test('se as vírgulas não são colocadas quando há apenas um item na lista', () => {
		expect(commaline(['Abacate'])).toBe('Abacate');
	});

	test('se a conjunção "e" é utilizada quando há 2 ou mais items na lista', () => {
		expect(commaline(['manga', 'morango', 'uva', 'abacate'])).toBe(
			'manga, morango, uva e abacate'
		);
	});

	test('se é retornado string vazia quando uma string vazia é enviada', () => {
		expect(commaline([''])).toBe('');
	});
});
