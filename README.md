# Arquivos API

## 1. Ambiente de desenvolvimento

- [NVM](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com)

## 2. Setup

### 2.1. Adicione suas configurações locais

Configure seu ambiente local no arquivo `.env`.

Se você não tem um arquivo `.env` no diretório raiz, por favor copie o arquivo `.env.example`, renomeie a cópia para `.env` e preencha os valores das propriedades com os detalhes do seu ambiente.

### 2.2. Certifique-se de que possui a versão correta do `Node.js` instalada:

```
nvm use && nvm install
```

### 2.3. Instale as dependências

```
yarn
```

## 3. Desenvolvimento

Para iniciar o servior de desenvolvimento:

```
yarn dev
```

Para executar os testes:

```
yarn test
```

Os endpoints da API estarão disponíveis para teste pelo contexto `/arquivos-docs`.

## 4. Build

Para efetuar a _build_ do projeto para o diretório `dist`:

```
yarn build
```
