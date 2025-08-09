# API de Transferências

Esta API permite login, registro de usuários, consulta de usuários e transferência de valores, com regras básicas para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```

## Execução

- Para iniciar a API:
  ```powershell
  node server.js
  ```
- Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

- `POST /register`: Registra um novo usuário. Campos obrigatórios: `username`, `password`. Opcional: `favorecido` (boolean).
- `POST /login`: Realiza login. Campos obrigatórios: `username`, `password`.
- `GET /users`: Lista todos os usuários registrados.
- `POST /transfer`: Realiza transferência. Campos obrigatórios: `from`, `to`, `value`.
- `GET /transfers`: Lista todas as transferências realizadas.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige informar usuário e senha válidos.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Testes

Para automação de testes, importe o arquivo `app.js` em seus testes e utilize ferramentas como Supertest.

## Estrutura de Pastas

- `controller/`: Lógica dos endpoints
- `service/`: Regras de negócio
- `model/`: Dados em memória
- `app.js`: Configuração dos endpoints
- `server.js`: Inicialização do servidor
- `swagger.json`: Documentação Swagger

---

API desenvolvida para fins educacionais.
