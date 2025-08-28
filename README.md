# API Banking

Esta aplicação é uma **API REST para simulação de operações bancárias**
como depósito, saque, transferência e consulta de saldo. Ela foi
desenvolvida utilizando **Fastify**, **Zod** para validação de dados e
inclui documentação automática via **Swagger UI**.

## Tecnologias Utilizadas

-   **Node.js** (Fastify)
-   **TypeScript**
-   **Zod** (validação de esquemas)
-   **@fastify/swagger** e **@fastify/swagger-ui** (documentação)
-   **In-memory database** (simulada via `AccountRepository`)

## Funcionalidades

-   Criar contas automaticamente no primeiro depósito
-   Consultar saldo
-   Realizar depósito
-   Realizar saque
-   Realizar transferência entre contas
-   Resetar base de dados para estado inicial
-   Documentação acessível via Swagger

## Instalação e Execução

### Pré-requisitos

-   Node.js 18+\
-   npm ou yarn

### Passos

``` bash
# Instalar dependências
npm install

# Rodar aplicação
npm run dev
```

A API ficará disponível em:

    http://localhost:3000

A documentação Swagger ficará disponível em:

    http://localhost:3000/docs

## Endpoints

### **POST /reset**

Reseta a base de dados.

**Resposta:** - `200 OK` -- Base resetada.

------------------------------------------------------------------------

### **GET /balance?id={id}**

Consulta o saldo de uma conta.

**Query Params:** - `id` (string) -- ID da conta.

**Resposta:** - `200` -- Retorna saldo da conta. - `404` -- Retorna `0`
caso a conta não exista.

------------------------------------------------------------------------

### **POST /event**

Executa operações bancárias (depósito, saque e transferência).

**Body:**

``` json
{
  "type": "deposit" | "withdraw" | "transfer",
  "origin": "string (opcional para depósito)",
  "destination": "string (opcional para saque)",
  "amount": number
}
```

**Resposta:** - `201` -- Retorna informações da transação. - `404` --
Conta inexistente. - `500` -- Falha na operação.

------------------------------------------------------------------------

## Estrutura do Projeto

    .
    ├── main.ts              # Inicialização do servidor Fastify
    ├── routes.ts            # Definição de rotas e schemas
    ├── repositories/
    │   └── accountRepository.ts  # Simulação de banco de dados em memória
    └── useCases/            # Lógica de negócio (restDB, getBalance, event)

## Fluxo de Operações

1.  **Depósito** cria automaticamente uma conta se ela não existir.
2.  **Saque** só é permitido se houver saldo suficiente.
3.  **Transferência** executa saque da conta de origem e depósito na
    conta de destino.
4.  **Reset** limpa toda a base de dados.

## Documentação

A documentação interativa pode ser acessada via Swagger em:

    http://localhost:3000/docs
