# Commaline

Utilitário para formatar listas de strings com vírgulas e conjunção "e".

## Instalação e Importação

```typescript
import { commaline } from '@sysvale/foundry';
```

## Função

### `commaline()`

Formata uma lista de strings adicionando vírgulas entre os itens e a conjunção "e" antes do último elemento.

#### Sintaxes

```typescript
// Assinatura 1: Usando string com índice e comprimento
commaline(str: string, index: number, length: number): string

// Assinatura 2 (sobrecarga): Usando array de strings
commaline(arr: string[]): string
```

#### Parâmetros

**Assinatura 1:**

- **`str`** (`string`): A string atual sendo processada
- **`index`** (`number`): O índice da string atual na lista
- **`length`** (`number`): O comprimento total da lista

**Assinatura 2 (sobrecarga):**

- **`arr`** (`string[]`): Array de strings a ser formatado

<br />

#### Retorno

`string` - A string formatada com vírgulas e conjunção apropriadas

#### Regras de Formatação

1. **Um item**: Retorna o item sem nenhuma pontuação adicional
2. **Dois itens**: Retorna "item1 e item2"
3. **Três ou mais itens**: Retorna "item1, item2, item3 e item4"
   - Vírgulas separam todos os itens exceto os dois últimos
   - A conjunção "e" precede apenas o último item

<br />

#### Exemplos

**Usando array de strings:**

```typescript
// Um item
commaline(['Abacate']); // → 'Abacate'

// Dois itens
commaline(['manga', 'morango']); // → 'manga e morango'

// Três itens
commaline(['manga', 'morango', 'uva']); // → 'manga, morango e uva'

// Quatro ou mais itens
commaline(['manga', 'morango', 'uva', 'abacate']); // → 'manga, morango, uva e abacate'

// Lista com muitos itens
commaline(['maçã', 'banana', 'laranja', 'pêra', 'kiwi', 'mamão']);
// → 'maçã, banana, laranja, pêra, kiwi e mamão'
```

<br />

**Usando string com índice (uso em v-for):**

```typescript
// Primeiro item de uma lista de 4
commaline('manga', 0, 4); // → 'manga, '

// Segundo item de uma lista de 4
commaline('morango', 1, 4); // → 'morango, '

// Penúltimo item de uma lista de 4
commaline('uva', 2, 4); // → 'uva e '

// Último item de uma lista de 4
commaline('abacate', 3, 4); // → 'abacate'

// Item único
commaline('Abacate', 0, 1); // → 'Abacate'
```

<br />

#### Tratamento de Erros

A função lança um erro quando os parâmetros obrigatórios não são fornecidos:

```typescript
// ❌ Erro: faltam parâmetros obrigatórios
commaline('Abacate');
// → Error: 'Index and length must be provided when passing a string'

// ✅ Correto
commaline(['Abacate']); // → 'Abacate'
```

## Notas

- A função é **type-safe** com sobrecargas TypeScript
- **Imutável**: não modifica o array original
- **Compatível** com arrays vazios (retorna string vazia)

## Limitações

- Não suporta formatação de listas aninhadas
- A conjunção "e" é fixa (não permite personalização para "ou", "nem", etc.)
- Não oferece opções de localização para outros idiomas
