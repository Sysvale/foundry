# CpfValidator

Utilitário para validar CPFs com e sem máscara.

## Instalação e Importação

```typescript
import { cpfValidator } from '@sysvale/foundry';
```

## Função

### `cpfValidator()`

Valida CPFs com e sem máscara, indicando se os mesmos são válidos.

#### Sintaxes

```typescript
cpfValidator(value: string): boolean
```

#### Parâmetros

**Assinatura 1:**

- **`value`** (`string`): CPF (com ou sem máscara) a ser validado

<br />

#### Retorno

`boolean` - Resultado da validação, `true` para CPF válido e `false` para inválido

<br />

#### Exemplos

**Usando CPF com máscara:**

```typescript
cpfValidator('252.512.510-09'); // → true

cpfValidator('000.000.000-00'); // → false
```

<br />

**Usando CPF sem máscara:**

```typescript
cpfValidator('25251251009'); // → true

cpfValidator('00000000000'); // → false
```

<br />

#### Tratamento de Erros

A função lança um erro quando os parâmetros obrigatórios não são fornecidos:

```typescript
// ❌ Erro: tipagem do parâmetro é inválida
cpfValidator(71234567823);
// → Error: O tipo do parâmetro passado é inválido.

// ✅ Correto
cpfValidator('71234567823'); // → false
```

## Notas

- A função é **type-safe**
