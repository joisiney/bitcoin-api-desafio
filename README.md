<h1 align="center">😇 Olimpo Bitcoin</h1>
<p align="center">Gerencie suas criptomoedas com facilidade. Acesso seguro, saldo atualizado, depósitos, vendas e posição de investimentos. Simplifique sua jornada financeira..<br/><strong>Esta é apenas uma POC de BE utilizando DECORATOR/DRIZZLE.</strong>.</p>

<p align="center">
<img alt="Bitcoin Api" src="https://images.unsplash.com/photo-1627538924152-26631c2da638?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" />
</p>

## Observação Importante
Tenho trabalhado em um projeto de Injeção de Dependência (DI) há algum tempo e realmente gostei da experiência com Decorators e monorepo. Por conta disso, criei outros dois repositórios bastante similares a este aqui há algum tempo.

1. **Motivação Principal para o Uso de DI:** Este repositório [DI + SNS + SQS + DECORATOR](https://github.com/joisiney/sqs-sns-localstak-decorator-clean-code-nodejs) foi a inspiração inicial para este boilerplate.
   
2. **Outro Projeto Relacionado:** Também desenvolvi outro projeto utilizando [DI + KAFKA + SOCKET.IO](https://github.com/joisiney/monorepo-tsx-decorator-kafka-socket-io). A partir desses dois repositórios, criei uma espécie de boilerplate. A ideia era modularizá-lo e disponibilizá-lo via yarn/npm, mas acredito que ainda preciso amadurecer melhor essa ideia.

Para iniciar este projeto, clonei meu monorepo de `DI + KAFKA + SOCKET.IO`, que segue um padrão de projeto que me agrada bastante, pois utiliza todos os princípios SOLID de forma muito agradável. Dentro do monorepo, a pasta `/packages` contém códigos que pretendo reutilizar em novos projetos, enquanto a pasta `/apps` contém os novos projetos. Com o objetivo de criar uma API para Bitcoin, desenvolvi uma API do zero dentro da pasta `/apps/be-apolo`, utilizando minhas próprias bibliotecas pessoais.

## 🥶 Contexto dado, vamos falar sobre o projeto

Dividi este workspace em 1 aplicativos e 6 bibliotecas. Esta é uma arquitetura robusta projetada para escalar tanto na vertical, com poucos projetos, porém muito grandes (monolito), quanto na horizontal, com diversos microprojetos, todos integrados com o máximo de reaproveitamento de código entre cada aplicativo seja frontend ou backend.

## Aplicativos:

1. **app/be-apolo:** Esta API REST é a peça-chave para gerenciar o CRUD de usuários, autenticação, contas, depósitos, saldos, cotações e compras de Bitcoin.. [mais info](apps/be-apolo/readme.md)

## Bibliotecas:

1. **packages/domain-ceos:** É onde fica a camada de `domain` da aplicação. Esta camada será responsável por centralizar a lógica de todos os aplicativos em um único pacote, facilitando a manutenção e escalabilidade. [mais info](docs/ceos.md)
   
2. **packages/lib-hera:** Bibliotecas comuns utilizadas por todos os `apps/*` ou `packages/*`. [mais info](docs/hera.md)
   
3. **packages/lint-zeus:** Este modulo é responsável por definir as configurações padrão globais para o `lint` e `prettier` dentro do `monorepo`. [mais info](docs/zeus.md)
   
4. **packages/test-kairos:** Prepare-se para uma revolução nos testes! Este módulo é o coração pulsante de todos os testes unitários, de integração e end-to-end da nossa aplicação. Chega de perder tempo configurando ambientes de teste em cada projeto! Aqui, reunimos toda a força e energia para garantir que todos os testes da aplicação sejam escritos com paixão e precisão. Este é o lugar onde a magia dos testes acontece! [mais info](docs/kairos.md).

5. **packages/be-di-ilitia** Esta é uma lib responsável pela injeção de dependência, com um código enxuto e direto ao ponto. Veio para fazer apenas uma coisa: injetar dependências. Simples assim! E o melhor de tudo é que funciona tanto para o backend quanto para o frontend! 😄 [mais info](packages/be-di-ilitia/readme.md).
   
6.  **packages/be-router-angelo** Esta biblioteca utiliza o 'packages/be-di-ilitia' para configurar as rotas da sua REST API. Atualmente, conta com um adaptador específico para o Fastify.js, mas não se preocupe, adicionar suporte para outras bibliotecas como o Express.js é tão fácil quanto preparar uma xícara de café pela manhã! ☕️✨ [mais info](packages/be-router-angelo/readme.md).

## 🚀 Tecnologias

Principais tecnologias que utilizei para desenvolver esta aplicação mobile

- [TypeScript](https://www.typescriptlang.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [Drizzle](https://orm.drizzle.team/)
- [Fastify](https://fastify.dev/)
- [Zod](https://zod.dev/)

## Guia de inicialização

Para instalar e configurar uma cópia local, siga estas etapas simples:

### Prerequisitos

Para garantir o funcionamento adequado do nosso aplicativo, verifique:


1. **Docker** Caso não o tenha faça download através deste [link aqui](https://www.docker.com/products/docker-desktop)
2. **node@v20.9.0**
  ```sh
  nvm use v20.9.0
  ```

3. **yarn@1.22.21**
  ```sh
  # Instalação para IOS
  
  # Opção 1
  $ brew install yarn@1.22.21
  
  # Opção 2
  arch -arm64 brew install yarn
  
  # Instale usando npm
  npm install --global yarn@1.22.21
  ```
### Guia de inicialização

Para inicializar o **backend**, basta seguir as instruções abaixo:

1. Clone o repositório:
   ```sh
   git@github.com:joisiney/bitcoin-api-desafio.git
   ```

2. Instale os módulos do YARN:
   ```sh
   yarn install
   ```

3. Inicialize o **postgres** através do Docker Compose:
   ```sh
   yarn apolo:docker-up
   ```
4. Após o docker estár de pé será necessário criar suas tabelas e dependencias.
   ```sh
   yarn apolo:drizzle:migration-run
   ```
5. Após inicialização do banco e criação de tabelas é hora de hidratar o banco.
   ```sh
   yarn apolo:drizzle:seed
   ```
6. Inicialize o aplicativo **apolo**, responsável pela API REST:
   ```sh
   yarn apolo:dev
   ```
   Se tudo ocorrer conforme o esperado, você deverá visualizar o seguinte **log** em seu terminal:
```bash
┌─────────┬─────────────────────────┬─────────────────────┬────────────┬────────────────────────────────────────────┐
│ (index) │        className        │     classMethod     │ httpMethod │                    url                     │
├─────────┼─────────────────────────┼─────────────────────┼────────────┼────────────────────────────────────────────┤
│    0    │    'UserController'     │       'save'        │   'POST'   │              '/olympus/user'               │
│    1    │    'UserController'     │     'findById'      │   'GET'    │            '/olympus/user/:id'             │
│    2    │    'UserController'     │      'findAll'      │   'GET'    │              '/olympus/user'               │
│    3    │    'UserController'     │    'removeById'     │  'DELETE'  │            '/olympus/user/:id'             │
│    4    │    'UserController'     │    'updateById'     │   'PUT'    │            '/olympus/user/:id'             │
│    5    │    'AuthController'     │      'session'      │   'GET'    │          '/olympus/auth/sign-in'           │
│    6    │ 'TransactionController' │       'save'        │   'POST'   │           '/olympus/transaction'           │
│    7    │ 'TransactionController' │ 'balanceByCustomer' │   'GET'    │ '/olympus/transaction/balance-by-customer' │
│    8    │   'BitcoinController'   │     'quotation'     │   'GET'    │        '/olympus/bitcoin/quotation'        │
│    9    │   'BitcoinController'   │        'buy'        │   'POST'   │           '/olympus/bitcoin/buy'           │
└─────────┴─────────────────────────┴─────────────────────┴────────────┴────────────────────────────────────────────┘
Server listening at http://[::1]:3001 🚀🚀
```
   O objetivo deste **log** é apresentar todas as rotas criadas, juntamente com seus respectivos métodos de acesso. Se você utiliza o VSCode e tem o hábito de usar o plugin `REST Client` na pasta `/rest-client-http`, todos os métodos estão cadastrados e atualizados lá 😜.

## Guia de comandos úteis da aplicação:

O principal objetivo dos comandos no arquivo package.json é criar atalhos para os links dos subaplicativos.

| Bash/Script              | Descrição                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `yarn test`              | Executa todos os testes da aplicação com o Vitest                                  |
| `yarn coverage`          | Gera o coverage do monorepo                                                        |
| `yarn lint:fix`          | Formata todos os arquivos `ts` e `tsx`                                             |
| `yarn lint`              | Verifica todos os arquivos `ts` e `tsx`                                            |
| `yarn reset`             | Remove todas as pastas `node_modules`, `dist` e `yarn.lock`                        |
| `yarn build`             | Gera o bundle de todos os projetos                                                 |
| `yarn start`             | Inicia todos os projetos em modo de produção (Depende de ter bundle pré-existente) |
| `yarn dev`               | Inicia todos os projetos em modo de `Hot reload`                                   |
| `yarn apolo:dev`         | Inicia o Apolo em modo de `Hot reload`                                             |
| `yarn clean`             | Remove todas as pastas `dist`                                                      |
| `yarn apolo:docker-up`   | Levanta o banco `Postgres`                                                            |
| `yarn apolo:docker-down` | Derruba o banco `Postgres`                                                            |

## Roadmap

- [x] **Database**
   - [x] Configurar estrutura Docker do PostgreSQL com Drizzle.
- [x] **Contas**
   - [x] Permitir cadastro (nome, email e senha) e login com token JWT.
   - [x] Exigir autenticação para todos os demais endpoints.
- [x] **Depósitos**
   - [x] Permitir depósitos de valores em reais na plataforma a qualquer momento (apenas inserção do valor na conta, sem transferência real de valores).
   - [x] Enviar email de confirmação informando o valor depositado.
- [x] **Saldo**
   - [x] Consultar saldo disponível em reais na conta do cliente.
- [x] **Cotação**
   - [x] Visualizar a cotação atual do Bitcoin para compra e venda.
- [x] **Compra**
   - [x] Realizar compras de bitcoins usando saldo disponível na conta, com conversão do valor em reais pela cotação de venda.
   - [x] Bloquear compra se o cliente não tiver saldo suficiente.
   - [x] Enviar email informando o valor investido em R$ e o valor comprado de BTC.
- [ ] **Teste Unitário**
   - Faltou implementar, considerando a abordagem de DDD.
- [ ] **Cache com Redis**
   - Pendente, mas planejado na pipeline.
- [ ] **Fila de Disparo de Email**
   - Implementar utilizando `SQS` + `SOCKET.IO` para notificar o usuário.
   - Pendente, mas planejado na pipeline.

## Vídeo demonstrando a funcionalidade implementada em pleno funcionamento.
<a href="https://vimeo.com/manage/videos/932613884/36f95a1091?extension_recording=true" target="_blank">Link de apresentação simples</a>