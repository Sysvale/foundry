# Utilitários de Formatação de Telefone

Este módulo fornece funções para aplicar e remover a máscara de números de telefone brasileiros, facilitando a manipulação e exibição de telefones fixos e celulares no padrão nacional.

## Instalação e Importação

```typescript
import { maskPhone, removePhoneMask } from '@sysvale/foundry';
```

## Funções

### `maskPhone()`

Aplica a máscara de telefone brasileiro no formato `(XX) XXXXX-XXXX` para celulares (11 dígitos) ou `(XX) XXXX-XXXX` para fixos (10 dígitos).

#### Sintaxe

```typescript
maskPhone(value: string): string
```

#### Parâmetros

- **`value`** (`string`): String contendo apenas números, telefone já formatado ou com caracteres especiais.

#### Retorno

`string` – O telefone formatado no padrão nacional, conforme a quantidade de dígitos. Se a entrada não tiver 10 ou 11 dígitos, retorna apenas os dígitos informados.

#### Exemplos

```typescript
maskPhone('11987654321');      // → '(11) 98765-4321'
maskPhone('1187654321');       // → '(11) 8765-4321'
maskPhone('');                 // → ''
maskPhone('123456789');        // → '123456789' (menos de 10 dígitos, retorna sem máscara)
maskPhone('(11) 98765-4321');  // → '(11) 98765-4321' (já formatado)
maskPhone('11.98765.4321');    // → '(11) 98765-4321'
maskPhone('11abc98765def4321');// → '(11) 98765-4321'
maskPhone('1');                // → '1'
```

#### Casos de Uso

- Exibir telefones formatados em formulários e relatórios.
- Garantir consistência visual de números de telefone em interfaces de usuário.
- Aceitar entradas com ou sem máscara, letras ou caracteres especiais.

---

### `removePhoneMask()`

Remove qualquer máscara de telefone, retornando apenas os dígitos numéricos.

#### Sintaxe

```typescript
removePhoneMask(value: string): string
```

#### Parâmetros

- **`value`** (`string`): String contendo um telefone formatado ou não.

#### Retorno

`string` – String contendo apenas os números do telefone.

#### Exemplos

```typescript
removePhoneMask('(11) 98765-4321');      // → '11987654321'
removePhoneMask('(11) 8765-4321');       // → '1187654321'
removePhoneMask('');                     // → ''
removePhoneMask('11987654321');          // → '11987654321' (sem máscara, retorna igual)
removePhoneMask('11 98765 4321');        // → '11987654321'
removePhoneMask('11.98765.4321');        // → '11.98765.4321' (pontos não são removidos)
removePhoneMask('11#98765#4321');        // → '11#98765#4321' (outros caracteres não são removidos)
removePhoneMask('(11) 98765-4321 ext.123'); // → '11987654321ext.123'
```

#### Casos de Uso

- Armazenar telefones em banco de dados sem formatação.
- Validar ou comparar telefones independentemente do formato de entrada.
- Remover apenas os caracteres de máscara padrão: parênteses, hífens e espaços.

## Casos de Uso Comuns

### Formatação para exibição

```typescript
const phone = '11987654321';
const formatted = maskPhone(phone); // '(11) 98765-4321'
```

### Remoção de máscara para validação

```typescript
const masked = '(11) 98765-4321';
const digits = removePhoneMask(masked); // '11987654321'
```

## Limitações

- As funções não validam se o número de telefone é válido, apenas formatam ou removem a máscara.
- Se a string de entrada não tiver 10 ou 11 dígitos, `maskPhone` retorna apenas os dígitos sem aplicar a máscara.
- `removePhoneMask` remove apenas parênteses, hífens e espaços; outros caracteres especiais permanecem.
