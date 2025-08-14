import { describe, test, expect } from 'vitest';
import {
	pluralize,
	pluralizeWords,
	pluralizeWithCount,
} from '../src/utils/pluralize';

describe('pluralize()', () => {
	test('retorna a mesma palavra se a quantidade for 1', () => {
		expect(pluralize(1, 'carro')).toBe('carro');
	});

	test('adiciona "s" para palavras regulares terminadas em vogal', () => {
		expect(pluralize(2, 'banana')).toBe('bananas');
	});

	test('usa o plural personalizado se fornecido', () => {
		expect(pluralize(2, 'livro')).not.toBe('livrozinhos');
		expect(pluralize(2, 'livro', 'livrozinhos')).toBe('livrozinhos');
	});

	test('não altera palavras terminadas em s ou x', () => {
		expect(pluralize(3, 'tórax')).toBe('tórax');
		expect(pluralize(3, 'lápis')).toBe('lápis');
	});

	test('converte -ão para -ões', () => {
		expect(pluralize(2, 'avião')).toBe('aviões');
	});

	test('converte alguns irregulares corretamente', () => {
		expect(pluralize(2, 'pão')).toBe('pães');
		expect(pluralize(2, 'alemão')).toBe('alemães');
	});

	test('converte irregulares customizados corretamente', () => {
		expect(pluralize(2, 'órgão')).toBe('órgãos');
		expect(pluralize(2, 'cônsul')).not.toBe('cônsules');
		expect(pluralize(2, 'cônsul', undefined, { cônsul: 'cônsules' })).toBe(
			'cônsules'
		);
		expect(pluralize(2, 'maçã', undefined, { maçã: 'maçãs' })).toBe('maçãs');
	});

	test('converte -m para -ns', () => {
		expect(pluralize(2, 'homem')).toBe('homens');
	});

	test('adiciona "es" para palavras terminadas em r ou z', () => {
		expect(pluralize(2, 'luz')).toBe('luzes');
		expect(pluralize(2, 'motor')).toBe('motores');
	});

	test('converte -ol para -óis', () => {
		expect(pluralize(2, 'sol')).toBe('sóis');
	});

	test('converte -al, -ul para -ais, -uis', () => {
		expect(pluralize(2, 'animal')).toBe('animais');
		expect(pluralize(2, 'azul')).toBe('azuis');
	});

	test('converte -el para -éis', () => {
		expect(pluralize(2, 'papel')).toBe('papéis');
	});

	test('converte -il para -is', () => {
		expect(pluralize(2, 'fuzil')).toBe('fuzis');
	});

	test('usa o plural quando a quantidade é negativa', () => {
		expect(pluralize(-3, 'avião')).toBe('aviões');
	});

	test('não usa o plural quando a quantidade é zero', () => {
		expect(pluralize(0, 'mapa')).toBe('mapa');
	});

	test('usa o padrão de 2 se a quantidade for nula ou indefinida', () => {
		expect(pluralize(null, 'livro')).toBe('livros');
	});

	test('trata o primeiro parâmetro como palavra se a quantidade for uma string', () => {
		expect(pluralize('carro', '')).toBe('carros');
	});
});

describe('pluralizeWithCount()', () => {
	test('inclui a quantidade no resultado', () => {
		expect(pluralizeWithCount(1, 'carro')).toBe('1 carro');
		expect(pluralizeWithCount(2, 'carro')).toBe('2 carros');
	});

	test('funciona com plural personalizado', () => {
		expect(pluralizeWithCount(2, 'livro', 'livrozinhos')).toBe('2 livrozinhos');
	});
});

describe('pluralizeWords()', () => {
	test('funciona com uma palavra', () => {
		expect(pluralizeWords(0, ['papel'])).toBe('papel');
		expect(pluralizeWords(1, ['papel'])).toBe('papel');
		expect(pluralizeWords(2, ['papel'])).toBe('papéis');
	});

	test('funciona com duas palavras', () => {
		expect(pluralizeWords(0, ['avião', 'antigo'])).toBe('avião antigo');
		expect(pluralizeWords(1, ['avião', 'antigo'])).toBe('avião antigo');
		expect(pluralizeWords(2, ['avião', 'antigo'])).toBe('aviões antigos');
	});

	test('funciona com três palavras', () => {
		expect(pluralizeWords(0, ['moto', 'branca', 'escolhida'])).toBe(
			'moto branca escolhida'
		);
		expect(pluralizeWords(1, ['moto', 'branca', 'escolhida'])).toBe(
			'moto branca escolhida'
		);
		expect(pluralizeWords(2, ['moto', 'branca', 'escolhida'])).toBe(
			'motos brancas escolhidas'
		);
	});

	test('funciona com plurais personalizados', () => {
		expect(
			pluralizeWords(
				2,
				['o', 'avião', 'velho'],
				['os', 'aviõezinhos', 'velhos']
			)
		).toBe('os aviõezinhos velhos');
	});
});
