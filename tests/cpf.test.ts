import { describe, test, expect } from 'vitest';
import { maskCpf, removeCpfMask } from '../src/formatters/cpf';

describe('maskCpf', () => {
	test('deve formatar cpf', () => {
		expect(maskCpf('11111111111')).toBe('111.111.111-11');
	});

	test('deve retornar string vazia quando cpf é vazio', () => {
		expect(maskCpf('')).toBe('');
	});

	test('deve retornar valor como está quando cpf é inválido', () => {
		expect(maskCpf('1234567890')).toBe('1234567890');
	});
});

describe('removeCpfMask', () => {
	test('deve remover máscara de cpf', () => {
		expect(removeCpfMask('111.111.111-11')).toBe('11111111111');
	});

	test('deve retornar string vazia quando cpf é vazio', () => {
		expect(removeCpfMask('')).toBe('');
	});

	test('deve retornar valor como está quando cpf é inválido', () => {
		expect(removeCpfMask('1234567890')).toBe('1234567890');
	});
});
