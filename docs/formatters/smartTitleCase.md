# Utilitários de Formatação do SmartTitleCase

Este módulo fornece funções para normalizar e formatar textos, aplicando regras de capitalização inteligente em títulos, nomes próprios e frases, respeitando preposições, conjunções e exceções definidas.

## Instalação e Importação

```typescript
import { smartTitleCase } from '@sysvale/foundry';
```

## Funções

### `smartTitleCase()`

Formata uma string colocando a primeira letra de cada palavra em maiúsculo e o restante em minúsculo, exceto
preposições e palavras listadas como exceção.

### Sintaxe

```typescript
smartTitleCase(value: string, exceptions?: string[]): string
```

### Parâmetros

- **`value`** (`string`): String que será formatada.

- **`exceptions`** (`string[], opcional`): Lista de palavras que não serão formatadas, mesmo que estejam no início da string (ex.: ['da', 'de', 'UNIVASF']).

### Retorno

`string` - A string formatada no estilo “Title Case”, respeitando a lista de exceções, caso seja fornecida.

### Exemplos

<!-- prettier-ignore -->
```typescript
smartTitleCase('ash ketchum da silva');             // → 'Ash Ketchum da Silva'
smartTitleCase('ASH KETCHUM DA SILVA');             // → 'Ash Ketchum da Silva'
smartTitleCase('ash ketchum dA Silva');             // → 'Ash Ketchum da Silva'
smartTitleCase('ESTUDANTE DA UNIVASF', ['UNIVASF']); // → 'Estudante da UNIVASF'
smartTitleCase('');                                 // → ''
```

### Casos de Uso

- Exibir nomes próprios corretamente capitalizados em formulários e relatórios.
- Normalizar títulos, subtítulos e textos para interfaces de usuário.
- Evitar capitalização incorreta de preposições, conjunções e siglas.
