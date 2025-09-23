# Sanitize Form

Utilitário para sanitizar dados de formulário antes de enviá-los ao backend.

## Instalação e Importação

```typescript
import { sanitizeForm } from '@sysvale/foundry';
```

## Função

### `sanitizeForm()`

Sanitiza dados de formulário

- Extrai IDs de objetos do tipo `{ id: string | number, value: string }`
- Mantém valores primitivos inalterados
- Processa recursivamente campos aninhados
- Aplica transformações em campos específicos por meio de `sanitizers`

#### Sintaxe

```typescript
sanitizeForm(
	values: Record<string, FormValue>,
	sanitizableFields?: SanitizableField[]
): Record<string, FormValue>
```

#### Parâmetros

- **`values`** (`Record<string, FormValue>`): Dados do formulário a serem sanitizados
- **`sanitizableFields`** (`SanitizableField[]`, opcional): Array de campos com sanitizadores personalizados

#### Tipos

```typescript
type FormValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| FormObject
	| FormValue[];

type FormObject = {
	id?: string | number;
	[key: string]: FormValue;
};

interface SanitizableField {
	field: string;
	sanitizer: (value: any) => FormValue;
}
```

#### Retorno

`Record<string, FormValue>` - Dados sanitizados conforme as regras aplicadas

#### Regras de Sanitização

1. **Valores primitivos**: Mantidos inalterados (string, number, boolean, null, undefined)
2. **Arrays de primitivos**: Preservados sem modificação
3. **Objetos com `id`**: Substituídos pelo valor da propriedade `id`
4. **Objetos sem `id`**: Processados recursivamente campo por campo
5. **Arrays com objetos**: Cada item é sanitizado recursivamente
6. **Sanitizadores personalizados**: Aplicados a campos específicos quando configurados
7. **Estruturas aninhadas**: Processamento recursivo em todos os níveis

## Exemplos

**Extração de IDs:**

```typescript
// Objeto com ID é substituído pelo ID
sanitizeForm({
	category: { id: 'cat-123', name: 'Categoria A' },
});
// → { category: 'cat-123' }

// Array de objetos com IDs
sanitizeForm({
	users: [
		{ id: 1, name: 'João' },
		{ id: 2, name: 'Maria' },
		{ id: 3, name: 'Pedro' },
	],
});
// → { users: [1, 2, 3] }
```

<br >

**Processamento recursivo:**

```typescript
// Objetos sem ID são processados recursivamente
sanitizeForm({
	config: {
		theme: 'dark',
		notifications: {
			email: true,
			push: false,
		},
	},
});
// → { config: { theme: 'dark', notifications: { email: true, push: false } } }

// Combinação de extração de ID e processamento recursivo
sanitizeForm({
	user: { id: 1, name: 'João' },
	preferences: {
		theme: 'dark',
		language: { id: 'pt-BR', name: 'Português' },
	},
});
// → { user: 1, preferences: { theme: 'dark', language: 'pt-BR' } }
```

<br >

**Estruturas complexas:**

```typescript
// Arrays aninhados com objetos
sanitizeForm({
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
});
// → { categories: [1, 2] }

// Objetos profundamente aninhados
sanitizeForm({
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
});
// → { company: 100 }
```

<br >

**Sanitizadores personalizados:**

```typescript
// Aplicação de sanitizadores customizados
const sanitizers = [
	{
		field: 'name',
		sanitizer: value => value.toUpperCase(),
	},
	{
		field: 'phone',
		sanitizer: value => value.replace(/\D/g, ''),
	},
];

sanitizeForm(
	{
		name: 'joão',
		phone: '(11) 99999-9999',
		age: 25,
	},
	sanitizers
);
// → { name: 'JOÃO', phone: '11999999999', age: 25 }
```

## Limitações

- A função assume que objetos com propriedade `id` devem ser convertidos para seu ID
- Arrays são sempre processados recursivamente, não há opção para preservar objetos em arrays
- A propriedade `id` sempre tem prioridade sobre processamento recursivo do objeto
