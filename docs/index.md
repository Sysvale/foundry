---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Foundry'
  text: 'Composables, helpers e utilitários para projetos front-end na Sysvale.'

features:
  - title: Utils
    details: Métodos utilitários em TypeScript para facilitar tarefas comuns no front-end.
    link: /utils/pluralize
  - title: Formatadores
    details: Métodos em TypeScript para formatar diversos tipos de dados.
    link: /formatters/index
  - title: Composables
    details: Composables Vue 3 reutilizáveis para lógica comum no front-end.
    link: /composables/
  - title: Constantes e Tipos
    details: Definições comuns, como constantes, enums e tipos TypeScript.
    link: /contants-and-types/
---

## Bem vindo ao Foundry!

Foundry é uma biblioteca de utilitários Javascript desenvolvida pela Sysvale, com:

- **Utils**: Funções auxiliares reutilizáveis para formatação, validação e outras tarefas comuns.
- **Composables**: Lógicas reutilizáveis em Vue 3.
- **Constantes e Tipos**: Definições comuns, como enums, listas e tipos TypeScript.

### Instalação

- O Foundry pode ser instalado com o npm:

```bash
npm i @sysvale/foundry
```

## Uso

- Para usar o Foundry, importe a biblioteca junto do recurso que deseja utilizar:

```js
import { pluralize } from '@sysvale/foundry';
```

- E utilize-o diretamente como em:

```js
pluralize(value, 'dia');
```

## Desenvolvendo

### Configuração do projeto

- Clone o repositório:

```bash
git clone https://github.com/Sysvale/foundry
```

- Instale as dependências:

```bash
npm i
```

A aplicação estará disponível na porta `5173`, em [http://localhost:5173/](http://localhost:5173/).

### Testando-o

```bash
npm run test
```

- Para utilizar o ui do vitest:

```bash
npm run test:ui
```
