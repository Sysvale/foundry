# Utilitários de Pluralização

Este módulo fornece funções para pluralizar palavras em português brasileiro seguindo as regras gramaticais da língua.

## Instalação e Importação

```typescript
import {
	pluralize,
	pluralizeWords,
	pluralizeWithCount,
} from '@sysvale/foundry';
```

## Funções

### `pluralize()`

Pluraliza uma palavra em português seguindo as regras gramaticais.

#### Sintaxe

```typescript
pluralize(
  count: number | string | null = null,
  word: string,
  customPlural: string = '',
  customIrregulars: Record<string, string> = {}
): string
```

#### Parâmetros

- **`count`** (`number | string | null`): Quantidade para determinar se deve pluralizar
  - Se for `string`, será tratado como a palavra a ser pluralizada
  - Se for `null` ou `undefined`, padrão é 2
  - Se for 0 ou 1, retorna a palavra no singular
  - Se for negativo, usa o valor absoluto
- **`word`** (`string`): A palavra a ser pluralizada
- **`customPlural`** (`string`, opcional): Plural personalizado para a palavra
- **`customIrregulars`** (`Record<string, string>`, opcional): Dicionário de plurais irregulares customizados

#### Retorno

`string` - A palavra pluralizada ou no singular, conforme a quantidade

#### Regras de Pluralização

1. **Singular**: Quantidades 0 e 1 retornam a palavra original
2. **Plural personalizado**: Se fornecido via `customPlural`, é usado
3. **Irregulares**: Palavras com plurais irregulares predefinidos ou customizados
4. **Invariáveis**: Palavras terminadas em 's' ou 'x' não mudam
5. **Terminadas em -ão**: Convertem para -ões
6. **Terminadas em -m**: Convertem para -ns
7. **Terminadas em -r ou -z**: Adicionam 'es'
8. **Terminadas em -ol**: Convertem para -óis
9. **Terminadas em -al ou -ul**: Convertem para -ais ou -uis
10. **Terminadas em -el**: Convertem para -éis
11. **Terminadas em -il**: Convertem para -is
12. **Terminadas em vogal**: Adicionam 's'

#### Exemplos

```typescript
// Casos básicos
pluralize(1, 'carro'); // → 'carro'
pluralize(2, 'carro'); // → 'carros'
pluralize(0, 'mapa'); // → 'mapa'

// Regras específicas
pluralize(2, 'avião'); // → 'aviões' (-ão → -ões)
pluralize(2, 'homem'); // → 'homens' (-m → -ns)
pluralize(2, 'luz'); // → 'luzes' (-z → +es)
pluralize(2, 'motor'); // → 'motores' (-r → +es)
pluralize(2, 'sol'); // → 'sóis' (-ol → -óis)
pluralize(2, 'animal'); // → 'animais' (-al → -ais)
pluralize(2, 'azul'); // → 'azuis' (-ul → -uis)
pluralize(2, 'papel'); // → 'papéis' (-el → -éis)
pluralize(2, 'fuzil'); // → 'fuzis' (-il → -is)

// Palavras invariáveis
pluralize(3, 'tórax'); // → 'tórax'
pluralize(3, 'lápis'); // → 'lápis'

// Irregulares predefinidos
pluralize(2, 'pão'); // → 'pães'
pluralize(2, 'alemão'); // → 'alemães'
pluralize(2, 'órgão'); // → 'órgãos'

// Plural personalizado
pluralize(2, 'livro', 'livrozinhos'); // → 'livrozinhos'

// Irregulares customizados
pluralize(2, 'cônsul', undefined, { cônsul: 'cônsules' }); // → 'cônsules'

// Contagem como string (word se torna o primeiro parâmetro)
pluralize('carro', ''); // → 'carros'

// Valores negativos
pluralize(-3, 'avião'); // → 'aviões'

// Null/undefined defaulta para 2
pluralize(null, 'livro'); // → 'livros'
```

#### Irregulares Predefinidos

```typescript
{
  pão: 'pães',
  mão: 'mãos',
  irmão: 'irmãos',
  capitão: 'capitães',
  cidadão: 'cidadãos',
  cão: 'cães',
  alemão: 'alemães',
  mal: 'males',
  órgão: 'órgãos',
  nível: 'níveis'
}
```

---

### `pluralizeWithCount()`

Retorna a palavra pluralizada precedida pela quantidade.

#### Sintaxe

```typescript
pluralizeWithCount(...args: Parameters<typeof pluralize>): string
```

#### Parâmetros

Os mesmos parâmetros da função `pluralize()`.

#### Retorno

`string` - A quantidade seguida da palavra pluralizada

#### Exemplos

```typescript
pluralizeWithCount(1, 'carro'); // → '1 carro'
pluralizeWithCount(2, 'carro'); // → '2 carros'
pluralizeWithCount(2, 'livro', 'livrozinhos'); // → '2 livrozinhos'
pluralizeWithCount(3, 'avião'); // → '3 aviões'
```

---

### `pluralizeWords()`

Pluraliza múltiplas palavras simultaneamente, útil para frases com substantivos e adjetivos.

#### Sintaxe

```typescript
pluralizeWords(
  count: number | string | null,
  words: string[],
  customPlural: string[] | string = '',
  customIrregulars: Record<string, string> = {}
): string
```

#### Parâmetros

- **`count`** (`number | string | null`): Quantidade para determinar se deve pluralizar
- **`words`** (`string[]`): Array de palavras a serem pluralizadas
- **`customPlural`** (`string[] | string`, opcional):
  - Se for array: plurais personalizados para cada palavra correspondente
  - Se for string: plural personalizado aplicado a todas as palavras
- **`customIrregulars`** (`Record<string, string>`, opcional): Dicionário de plurais irregulares

#### Retorno

`string` - As palavras pluralizadas unidas por espaços

#### Exemplos

```typescript
// Uma palavra
pluralizeWords(0, ['papel']); // → 'papel'
pluralizeWords(1, ['papel']); // → 'papel'
pluralizeWords(2, ['papel']); // → 'papéis'

// Duas palavras (substantivo + adjetivo)
pluralizeWords(1, ['avião', 'antigo']); // → 'avião antigo'
pluralizeWords(2, ['avião', 'antigo']); // → 'aviões antigos'

// Três palavras
pluralizeWords(1, ['moto', 'branca', 'escolhida']); // → 'moto branca escolhida'
pluralizeWords(2, ['moto', 'branca', 'escolhida']); // → 'motos brancas escolhidas'

// Com plurais personalizados
pluralizeWords(2, ['o', 'avião', 'velho'], ['os', 'aviõezinhos', 'velhos']); // → 'os aviõezinhos velhos'
```

## Casos de Uso Comuns

### Mensagens Dinâmicas

```typescript
const count = getItemCount();
const message = `Você tem ${pluralizeWithCount(count, 'mensagem')} não lida`;
// count = 1: "Você tem 1 mensagem não lida"
// count = 5: "Você tem 5 mensagens não lidas"
```

### Descrições de Produtos

```typescript
const quantity = 3;
const description = pluralizeWords(quantity, ['produto', 'selecionado']);
// → "produtos selecionados"
```

### Textos com Plurais Complexos

```typescript
const items = 2;
const text = pluralizeWords(
	items,
	['animal', 'doméstico'],
	['bichinhos', 'domésticos']
);
// → "bichinhos domésticos"
```

## Limitações

- As regras implementadas cobrem a maioria dos casos do português brasileiro, mas podem não contemplar todas as exceções da língua
- Palavras compostas podem precisar de tratamento especial via `customIrregulars`
- A função assume que todas as palavras em `pluralizeWords()` devem seguir a mesma regra de pluralização (singular para count ≤ 1, plural para count > 1)
