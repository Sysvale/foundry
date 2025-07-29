# Pluralização em Português

Um conjunto de funções para pluralizar palavras em português, incluindo tratamento de irregularidades e casos especiais.

## Funções

### `pluralize(count, word, customPlural, customIrregulars)`

Pluraliza uma palavra em português com base em regras gramaticais e irregularidades.

#### Parâmetros

- `count` (number | string | null, opcional): 
  - Se número: determina se o plural deve ser aplicado (valores absolutos < 2 mantêm o singular)
  - Se string: será usado como `word` e o count será considerado null
  - Padrão: `null` (assume plural)
- `word` (string): A palavra no singular a ser pluralizada
- `customPlural` (string, opcional): Forma plural personalizada que substitui todas as regras
- `customIrregulars` (Record<string, string>, opcional): Objeto com irregularidades adicionais

#### Retorno

- (string): A palavra pluralizada

#### Regras Aplicadas (em ordem)

1. Se `count` absoluto < 2: mantém singular
2. Se `customPlural` fornecido: usa esta forma
3. Se palavra está nas irregularidades (padrão ou customizadas): usa plural irregular
4. Palavras terminadas em `s` ou `x`: invariáveis
5. Terminações em `ão`: geralmente vira `ões`
6. Terminações em `m`: vira `ns`
7. Terminações em `r` ou `z`: adiciona `es`
8. Terminações em `ol`: vira `óis`
9. Terminações em `al` ou `ul`: vira `ais`/`uis`
10. Terminações em `el`: vira `éis`
11. Terminações em `il`: vira `is`
12. Terminações em vogal: adiciona `s`
13. Fallback: mantém palavra original

#### Exemplos

```typescript
pluralize(1, 'pão')       // 'pão'
pluralize(2, 'pão')        // 'pães' (irregular)
pluralize(5, 'animal')     // 'animais'
pluralize(3, 'funil')      // 'funis'
pluralize(10, 'carro')     // 'carros'