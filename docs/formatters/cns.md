# Utilitários de Formatação de CNS

Este módulo fornece funções para aplicar e remover a máscara de CNS (Cartão Nacional de Saúde), facilitando a manipulação e exibição de números do SUS.

## Instalação e Importação

```typescript
import { maskCns, removeCnsMask } from '@sysvale/foundry';
```

## Funções

### `maskCns()`

Aplica a máscara de CNS no formato `XXX XXXX XXXX XXXX` a uma string ou número contendo 15 dígitos.

#### Sintaxe

```typescript
maskCns(value: string | number, emptyValueIndicator?: string): string
```

#### Parâmetros

- **`value`** (`string | number`): String ou número contendo apenas dígitos numéricos ou um CNS já formatado.
- **`emptyValueIndicator`** (`string`, opcional): Valor a ser retornado quando o CNS estiver vazio. Padrão: `''`.

#### Retorno

`string` – O CNS formatado no padrão `XXX XXXX XXXX XXXX` se a entrada tiver 15 dígitos. Caso contrário, retorna apenas os dígitos informados. Se o valor estiver vazio, retorna o `emptyValueIndicator`.

#### Exemplos

```typescript
maskCns('137971913770009'); // → '137 9719 1377 0009'
maskCns(137971913770009); // → '137 9719 1377 0009'
maskCns(''); // → ''
maskCns('', '--'); // → '--'
maskCns('12345678901234'); // → '12345678901234' (menos de 15 dígitos, retorna sem máscara)
```

#### Casos de Uso

- Exibir CNS formatado em formulários e relatórios.
- Garantir consistência visual de números do Cartão Nacional de Saúde em interfaces de usuário.
- Exibir indicadores personalizados quando o valor estiver vazio (como '--', 'N/A', etc.).

---

### `removeCnsMask()`

Remove qualquer máscara de CNS, retornando apenas os dígitos numéricos.

#### Sintaxe

```typescript
removeCnsMask(value: string): string
```

#### Parâmetros

- **`value`** (`string`): String contendo um CNS formatado ou não.

#### Retorno

`string` – String contendo apenas os números do CNS, sem espaços ou outros caracteres de formatação.

#### Exemplos

```typescript
removeCnsMask('137 9719 1377 0009'); // → '137971913770009'
removeCnsMask(''); // → ''
removeCnsMask('137971913770009'); // → '137971913770009' (não altera se não houver máscara)
```

#### Casos de Uso

- Armazenar CNS em banco de dados sem formatação.
- Validar ou comparar CNS independentemente do formato de entrada.
- Preparar dados para envio a APIs que requerem apenas dígitos.

## Casos de Uso Comuns

### Formatação para exibição

```typescript
const cns = '137971913770009';
const formatted = maskCns(cns); // '137 9719 1377 0009'
```

### Formatação com indicador de valor vazio

```typescript
const cnsPaciente = '';
const formatted = maskCns(cnsPaciente, 'Não informado'); // 'Não informado'
```

### Remoção de máscara para validação

```typescript
const masked = '137 9719 1377 0009';
const digits = removeCnsMask(masked); // '137971913770009'
```
