import { describe, test, expect } from 'vitest';
import { maskPhone, removePhoneMask } from '../src/formatters/phone';

describe('maskPhone', () => {
	test('deve formatar número de telefone com 11 dígitos (com 9)', () => {
		expect(maskPhone('11987654321')).toBe('(11) 98765-4321');
	});

	test('deve formatar número de telefone com 10 dígitos (sem 9)', () => {
		expect(maskPhone('1187654321')).toBe('(11) 8765-4321');
	});

	test('deve retornar string vazia quando o telefone é vazio', () => {
		expect(maskPhone('')).toBe('');
	});

	test('deve retornar string vazia quando o telefone é nulo/undefined', () => {
		// prettier-ignore
		expect(maskPhone(null)).toBe('');
		expect(maskPhone(undefined)).toBe('');
	});

	test('deve retornar apenas dígitos quando o telefone tem comprimento inválido', () => {
		expect(maskPhone('123456789')).toBe('123456789');
		expect(maskPhone('123456789012')).toBe('123456789012');
	});

	test('deve remover caracteres não numéricos antes de formatar', () => {
		expect(maskPhone('(11) 98765-4321')).toBe('(11) 98765-4321');
		expect(maskPhone('11.98765.4321')).toBe('(11) 98765-4321');
		expect(maskPhone('11 98765 4321')).toBe('(11) 98765-4321');
	});

	test('deve lidar com telefone com letras e caracteres especiais', () => {
		expect(maskPhone('11abc98765def4321')).toBe('(11) 98765-4321');
		expect(maskPhone('11@98765#4321')).toBe('(11) 98765-4321');
	});

	test('deve lidar com casos de números curtos', () => {
		expect(maskPhone('1')).toBe('1');
		expect(maskPhone('11')).toBe('11');
		expect(maskPhone('119')).toBe('119');
	});
});

describe('removePhoneMask', () => {
	test('deve remover máscara de número de telefone com 11 dígitos', () => {
		expect(removePhoneMask('(11) 98765-4321')).toBe('11987654321');
	});

	test('deve remover máscara de número de telefone com 10 dígitos', () => {
		expect(removePhoneMask('(11) 8765-4321')).toBe('1187654321');
	});

	test('deve retornar string vazia quando o telefone é vazio', () => {
		expect(removePhoneMask('')).toBe('');
	});

	test('deve retornar string vazia quando o telefone é nulo/undefined', () => {
		expect(removePhoneMask(null)).toBe('');
		expect(removePhoneMask(undefined)).toBe('');
	});

	test('deve retornar valor como está quando o telefone não tem máscara', () => {
		expect(removePhoneMask('11987654321')).toBe('11987654321');
		expect(removePhoneMask('1187654321')).toBe('1187654321');
	});

	test('deve remover apenas caracteres de máscara específicos', () => {
		expect(removePhoneMask('(11) 98765-4321')).toBe('11987654321');
		expect(removePhoneMask('11 98765 4321')).toBe('11987654321');
		expect(removePhoneMask('(11)98765-4321')).toBe('11987654321');
	});

	test('deve preservar caracteres que não são de máscara', () => {
		expect(removePhoneMask('11.98765.4321')).toBe('11.98765.4321');
		expect(removePhoneMask('11#98765#4321')).toBe('11#98765#4321');
	});

	test('deve lidar com caracteres de máscara e não-máscara misturados', () => {
		expect(removePhoneMask('(11) 98765-4321 ext.123')).toBe(
			'11987654321ext.123'
		);
	});
});
