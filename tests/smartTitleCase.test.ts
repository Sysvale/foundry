import { describe, test, expect } from 'vitest';
import { smartTitleCase } from '../src/formatters/smartTitleCase';

describe('smartTitleCase', () => {
	test('deve formatar strings', () => {
		expect(smartTitleCase('ash ketchum da silva')).toBe('Ash Ketchum da Silva');
		expect(smartTitleCase('Ash Ketchum da Silva')).toBe('Ash Ketchum da Silva');
		expect(smartTitleCase('ASH KETCHUM DA SILVA')).toBe('Ash Ketchum da Silva');
		expect(smartTitleCase('ash ketchum dA Silva')).toBe('Ash Ketchum da Silva');
		expect(smartTitleCase('')).toBe('');

		expect(smartTitleCase('ESTUDANTE DAS USP', ['USP', 'UNIVASF'])).toBe('Estudante das USP');
	});
});
