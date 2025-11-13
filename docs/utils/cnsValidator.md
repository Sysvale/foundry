# CnsValidator

Utilitário para validar CNS com e sem máscara.

## Instalação e Importação

```typescript
import { cnsValidator } from '@sysvale/foundry';
```

## Função

### `cnsValidator()`

Valida CNS com e sem máscara, indicando se os mesmos são válidos.

#### Sintaxes

```typescript
cnsValidator(value: string): boolean
```

#### Parâmetros

**Assinatura 1:**

- **`value`** (`string`): CNS (com ou sem máscara) a ser validado

<br />

#### Retorno

`boolean` - Resultado da validação, `true` para CNS válido e `false` para inválido

<br />

#### Exemplos

**Usando CNS com máscara:**

```typescript
cnsValidator('728 1376 2535 3587'); // → true

cnsValidator('111 1111 1111 1111'); // → false
```

<br />

**Usando CNS sem máscara:**

```typescript
cnsValidator('728137625353587'); // → true

cnsValidator('111111111111111'); // → false
```

<br />

#### Tratamento de Erros

A função lança um erro quando os parâmetros obrigatórios não são fornecidos:

```typescript
// ❌ Erro: tipagem do parâmetro é inválida
cnsValidator(728137625353587);
// → Error: O tipo do parâmetro passado é inválido.

// ✅ Correto
cnsValidator('728137625353587');
```

## Notas

- A função é **type-safe**
