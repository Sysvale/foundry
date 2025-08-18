# Utilitários de Formatação de CPF

Este módulo fornece funções para aplicar e remover a máscara de CPF (Cadastro de Pessoas Físicas) em strings, facilitando a manipulação e exibição de documentos no padrão brasileiro.

## Instalação e Importação

```typescript
import { maskCpf, removeCpfMask } from '@sysvale/foundry';
```

## Funções

### `maskCpf()`

Aplica a máscara de CPF no formato `XXX.XXX.XXX-XX` a uma string contendo apenas números.

#### Sintaxe

```typescript
maskCpf(value: string): string
```

#### Parâmetros

- **`value`** (`string`): String contendo apenas números ou um CPF já formatado.

#### Retorno

`string` – O CPF formatado no padrão `XXX.XXX.XXX-XX` se a entrada tiver 11 dígitos. Caso contrário, retorna apenas os dígitos informados.

#### Exemplos

```typescript
maskCpf('11111111111'); // → '111.111.111-11'
maskCpf(''); // → ''
maskCpf('1234567890'); // → '1234567890' (menos de 11 dígitos, retorna sem máscara)
```

#### Casos de Uso

- Exibir CPF formatado em formulários e relatórios.
- Garantir consistência visual de documentos em interfaces de usuário.

---

### `removeCpfMask()`

Remove qualquer máscara de CPF, retornando apenas os dígitos numéricos.

#### Sintaxe

```typescript
removeCpfMask(value: string): string
```

#### Parâmetros

- **`value`** (`string`): String contendo um CPF formatado ou não.

#### Retorno

`string` – String contendo apenas os números do CPF.

#### Exemplos

```typescript
removeCpfMask('111.111.111-11'); // → '11111111111'
removeCpfMask(''); // → ''
removeCpfMask('1234567890'); // → '1234567890' (não altera se não houver máscara)
```

#### Casos de Uso

- Armazenar CPFs em banco de dados sem formatação.
- Validar ou comparar CPFs independentemente do formato de entrada.

## Casos de Uso Comuns

### Formatação para exibição

```typescript
const cpf = '12345678901';
const formatted = maskCpf(cpf); // '123.456.789-01'
```

### Remoção de máscara para validação

```typescript
const masked = '123.456.789-01';
const digits = removeCpfMask(masked); // '12345678901'
```

## Limitações

- As funções não validam se o CPF é válido, apenas formatam ou removem a máscara.
- Se a string de entrada não tiver 11 dígitos, `maskCpf` retorna apenas os dígitos sem aplicar a máscara.
- Caracteres não numéricos são removidos por `removeCpfMask`.
