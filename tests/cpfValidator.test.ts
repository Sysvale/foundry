import { describe, expect, test } from 'vitest';
import { cpfValidator } from '../src/utils/cpfValidator';

describe('cpfValidator()', () => {
	test('retorna true quando string vazia é passada', () => {
		expect(cpfValidator('')).toBe(true);
	});

	test('retorna false quando cpf inválido com máscara é passado', () => {
		expect(cpfValidator('111.111.111-11')).toBe(false);
	});

	test('retorna true quando cpf válido com máscara é passado', () => {
		expect(cpfValidator('252.512.510-09')).toBe(true);
	});

	test('retorna false quando cpf inválido sem máscara é passado', () => {
		expect(cpfValidator('11111111111')).toBe(false);
	});

	test('retorna true quando cpf válido sem máscara é passado', () => {
		expect(cpfValidator('25251251009')).toBe(true);
	});

	test('retorna false quando cpf possui menos que 11 dígitos', () => {
		expect(cpfValidator('2525125100')).toBe(false);
	});

	test('retorna false quando cpf possui uma letra', () => {
		expect(cpfValidator('25251251a09')).toBe(false);
	});

	test('lança erro quando parâmetro é do tipo number', () => {
		expect(() => cpfValidator(12341789324)).toThrowError();
	});
});
