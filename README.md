<h1 align="center">
  <img alt="Bitcoin Api" src="https://images.unsplash.com/photo-1627538924152-26631c2da638?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" />
</h1>

<h3 align="center">
  Bitcoin Api - Controle de conta
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/sitiodigital/bitcoin-api?color=171000">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/sitiodigital/bitcoin-api?color=171000">

  <a href="https://github.com/sitiodigital/bitcoin-api/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/sitiodigital/bitcoin-api?color=171000">
  </a>

  <a href="https://github.com/sitiodigital/bitcoin-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/sitiodigital/bitcoin-api?color=171000">
  </a>

  <a href="https://github.com/sitiodigital/bitcoin-api/blob/main/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/sitiodigital/bitcoin-api?color=171000">
  </a>
</p>

## 📆 Sobre o projeto

Api para controle de transações bitcoin, com cadastro de conta, depósitos, saldo, cotação, compra, posição de investimentos, venda, extrato, volume e histórico.

## 🚀 Tecnologias

Tecnologias e ferramentas utilizadas no desenvolvimento do projeto:

- [Bun](https://bun.sh/)
- [Drizzle](https://orm.drizzle.team/)
- [Elysiajs](https://elysiajs.com/)
- [Zod](https://zod.dev/)
- [React Email](https://react.email/)
- [Eslint](https://eslint.org/)

## 💻 Começando

### Requisitos

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/sitiodigital/bitcoin-api.git && cd bitcoin-api
```

**Siga os passos abaixo**

```bash
# Instale as dependências
$ bun i

# Criando container docker
$ docker compose up -d

# Criando váriaveis de ambiente
$ cp .env.local.example .env.local

# Criando a estrutura do banco de dados
bun migrate

# Criando dados iniciais para o banco de dados
bun seed

# Aplicação no ar
bun dev
```

## 🤔 Como contribuir

**Faça um fork deste repositório**

```bash
# Fork usando a linha de comando oficial do GitHub
# Se você não tiver a CLI do GitHub, use o site para fazer isso.

$ gh repo fork sitiodigital/bitcoin-api
```

**Siga os passos abaixo**

```bash
# Clone your fork
$ git clone your-fork-url && cd bitcoin-api

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'Feature: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

Depois que sua solicitação pull for mesclada, você poderá excluir sua ramificação

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o [LICENSE](LICENSE) arquivo para mais detalhes.

---

Feito com 💚 por Joisiney Leandro 👋 [See my linkedin](https://www.linkedin.com/in/joisiney/)
