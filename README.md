<h1 align="center">😇 Olimpo Bitcoin</h1>
<p align="center">Gerencie suas criptomoedas com facilidade. Acesso seguro, saldo atualizado, depósitos, vendas e posição de investimentos. Simplifique sua jornada financeira..<br/><strong>Esta é apenas uma POC de BE utilizando DECORATOR/DRIZZLE.</strong>.</p>

<p align="center">
<img alt="Bitcoin Api" src="https://images.unsplash.com/photo-1627538924152-26631c2da638?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" />
</p>

## 🥶 Sobre o projeto

Dividi este workspace em 1 aplicativos e 6 bibliotecas. Esta é uma arquitetura robusta projetada para escalar tanto na vertical, com poucos projetos, porém muito grandes (monolito), quanto na horizontal, com diversos microprojetos, todos integrados com o Apache Kafka e com o máximo de reaproveitamento de código entre cada aplicativo.

## Aplicativos:

1. **app/be-apolo:** Esta API REST é responsável pela consumir e envio de notícias para a fila do Apache Kafka. Além disso, este servidor também é responsável pelo gerenciamento do CRUD de usuários. [mais info](apps/be-apolo/readme.md)

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
   git clone XYZ
   ```

2. Instale os módulos do YARN:
   ```sh
   yarn install
   ```

3. Inicialize o **mysql** através do Docker Compose:
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
┌─────────┬──────────────────┬──────────┬─────────────────────┐
│ (index) │    CONTROLLER    │  METHOD  │        LINK         │
├─────────┼──────────────────┼──────────┼─────────────────────┤
│    0    │ 'UserController' │  'POST'  │   '/olympus/user'   │
│    1    │ 'UserController' │  'GET'   │ '/olympus/user/:id' │
│    2    │ 'UserController' │  'GET'   │   '/olympus/user'   │
│    3    │ 'UserController' │ 'DELETE' │ '/olympus/user/:id' │
│    4    │ 'UserController' │  'PUT'   │ '/olympus/user/:id' │
└─────────┴──────────────────┴──────────┴─────────────────────┘
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
| `yarn apolo:docker-up`   | Levanta o banco `MySQL`                                                            |
| `yarn apolo:docker-down` | Derruba o banco `MySQL`                                                            |



## Usage

?

## Roadmap

- [x] Criar CRUD de usuário
  - [ ] Teste unitário

<p align="center">
<img alt="Olympus News" src="https://res.cloudinary.com/dmoi0mmuj/image/upload/v1707882909/github/Captura_de_Tela_2024-02-14_a%CC%80s_00.54.55_ppj0fd.png" />
</p>

## Vídeo demonstrando a funcionalidade implementada em pleno funcionamento.
<a href="https://vimeo.com/manage/videos/915146731/3d16dbfe16?extension_recording=true" target="_blank">Link de apresentação simples</a>