import { describe, test, expect } from 'vitest';
import { maskCns, removeCnsMask } from '../src/formatters/cns';

describe('maskCns', () => {
	test('deve formatar cns', () => {
		expect(maskCns('137971913770009')).toBe('137 9719 1377 0009');
		expect(maskCns(137971913770009)).toBe('137 9719 1377 0009');
	});

	test('deve retornar string vazia quando cns é vazio e o emptyValueIndicator não é especificado', () => {
		expect(maskCns('')).toBe('');
	});

	test('deve retornar o emptyValueIndicator quando cns é vazio e o emptyValueIndicator é especificado', () => {
		expect(maskCns('', '--')).toBe('--');
	});
});

describe('removeCnsMask', () => {
	test('deve remover máscara de cns', () => {
		expect(removeCnsMask('137 9719 1377 0009')).toBe('137971913770009');
	});

	test('deve retornar string vazia quando cns é vazio', () => {
		expect(removeCnsMask('')).toBe('');
	});
});
