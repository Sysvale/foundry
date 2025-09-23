import { describe, test, expect } from 'vitest';
import { sanitizeForm } from '../src/utils/sanitizeForm';

describe('sanitizeForm() - casos básicos', () => {
	test('retorna objeto vazio quando recebe objeto vazio', () => {
		expect(sanitizeForm({})).toEqual({});
	});

	test('mantém valores primitivos inalterados', () => {
		const data = {
			name: 'João',
			age: 25,
			active: true,
			description: null,
			optional: undefined,
		};

		expect(sanitizeForm(data)).toEqual(data);
	});

	test('mantém arrays de valores primitivos', () => {
		const data = {
			tags: ['javascript', 'typescript'],
			numbers: [1, 2, 3],
			flags: [true, false],
		};

		expect(sanitizeForm(data)).toEqual(data);
	});
});

describe('sanitizeForm() - extração de IDs', () => {
	test('extrai ID de objeto simples', () => {
		const data = {
			user: { id: 123, name: 'João', email: 'joao@email.com' },
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			user: 123,
		});
	});

	test('extrai IDs de objetos em arrays', () => {
		const data = {
			users: [
				{ id: 1, name: 'João' },
				{ id: 2, name: 'Maria' },
				{ id: 3, name: 'Pedro' },
			],
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			users: [1, 2, 3],
		});
	});

	test('processa objetos sem ID recursivamente', () => {
		const data = {
			config: {
				theme: 'dark',
				notifications: {
					email: true,
					push: false,
				},
			},
		};

		expect(sanitizeForm(data)).toEqual(data);
	});

	test('combina extração de ID com processamento recursivo', () => {
		const data = {
			user: { id: 1, name: 'João' },
			preferences: {
				theme: 'dark',
				language: { id: 'pt-BR', name: 'Português' },
			},
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			user: 1,
			preferences: {
				theme: 'dark',
				language: 'pt-BR',
			},
		});
	});
});

describe('sanitizeForm() - estruturas aninhadas complexas', () => {
	test('processa arrays aninhados com objetos', () => {
		const data = {
			categories: [
				{
					id: 1,
					items: [
						{ id: 10, name: 'Item A' },
						{ id: 11, name: 'Item B' },
					],
				},
				{
					id: 2,
					items: [{ id: 20, name: 'Item C' }],
				},
			],
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			categories: [1, 2],
		});
	});

	test('processa objetos profundamente aninhados', () => {
		const data = {
			company: {
				id: 100,
				departments: [
					{
						id: 200,
						employees: [
							{ id: 300, name: 'João' },
							{ id: 301, name: 'Maria' },
						],
					},
				],
			},
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			company: 100,
		});
	});
});

describe('sanitizeForm() - sanitizadores customizados', () => {
	test('aplica sanitizador customizado em campo específico', () => {
		const data = {
			name: 'joão',
			phone: '(11) 99999-9999',
		};

		const sanitizers = [
			{
				field: 'name',
				sanitizer: (value: string) => value.toUpperCase(),
			},
			{
				field: 'phone',
				sanitizer: (value: string) => value.replace(/\D/g, ''),
			},
		];

		const result = sanitizeForm(data, sanitizers);
		expect(result).toEqual({
			name: 'JOÃO',
			phone: '11999999999',
		});
	});

	test('aplica sanitizador apenas no campo correto', () => {
		const data = {
			title: 'produto',
			description: 'descrição do produto',
		};

		const sanitizers = [
			{
				field: 'title',
				sanitizer: (value: string) => value.toUpperCase(),
			},
		];

		const result = sanitizeForm(data, sanitizers);
		expect(result).toEqual({
			title: 'PRODUTO',
			description: 'descrição do produto',
		});
	});

	test('combina sanitizador com extração de ID', () => {
		const data = {
			name: 'joão',
			category: { id: 1, name: 'Categoria A' },
		};

		const sanitizers = [
			{
				field: 'name',
				sanitizer: (value: string) => value.toUpperCase(),
			},
		];

		const result = sanitizeForm(data, sanitizers);
		expect(result).toEqual({
			name: 'JOÃO',
			category: 1,
		});
	});
});

describe('sanitizeForm() - casos edge', () => {
	test('preserva valores null e undefined', () => {
		const data = {
			nullable: null,
			optional: undefined,
			user: { id: 1, name: null },
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			nullable: null,
			optional: undefined,
			user: 1,
		});
	});

	test('lida com arrays vazios', () => {
		const data = {
			emptyArray: [],
			items: [{ id: 1, name: 'Item' }],
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			emptyArray: [],
			items: [1],
		});
	});

	test('funciona sem sanitizadores customizados', () => {
		const data = {
			name: 'João',
			user: { id: 1, name: 'Admin' },
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			name: 'João',
			user: 1,
		});
	});

	test('lida com array vazio de sanitizadores', () => {
		const data = { name: 'João' };
		const result = sanitizeForm(data, []);
		expect(result).toEqual(data);
	});

	test('processa ID como string', () => {
		const data = {
			user: { id: 'user-123', name: 'João' },
		};

		const result = sanitizeForm(data);
		expect(result).toEqual({
			user: 'user-123',
		});
	});
});