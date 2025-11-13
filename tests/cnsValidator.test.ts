import { describe, expect, test } from 'vitest';
import { cnsValidator } from '../src/utils/cnsValidator';

describe('cnsValidator()', () => {
	test('retorna true quando string vazia é passada', () => {
		expect(cnsValidator('')).toBe(true);
	});

	test('retorna false quando cns inválido com máscara é passado', () => {
		expect(cnsValidator('111 1111 1111 1111')).toBe(false);
	});

	test('retorna true quando cns válido com máscara é passado', () => {
		expect(cnsValidator('728 1376 2535 3587')).toBe(true);
	});

	test('retorna false quando cns inválido sem máscara é passado', () => {
		expect(cnsValidator('111111111111111')).toBe(false);
	});

	test('retorna true quando cns válido sem máscara é passado', () => {
		expect(cnsValidator('728137625353587')).toBe(true);
	});

	test('retorna false quando cns possui menos que 15 dígitos', () => {
		expect(cnsValidator('11111111111')).toBe(false);
	});

	test('retorna false quando cns possui mais que 15 dígitos', () => {
		expect(cnsValidator('7281376253535879')).toBe(false);
	});

	test('retorna false quando cns possui uma letra', () => {
		expect(cnsValidator('11111111111111a')).toBe(false);
	});

	test('lança erro quando parâmetro é do tipo number', () => {
		expect(() => cnsValidator(12341789324)).toThrowError();
	});
});
