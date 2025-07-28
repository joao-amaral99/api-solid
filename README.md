# 🏋️ GymCheck API

Uma API RESTful para sistema de check-in em academias, inspirada no GymPass. Permite que usuários realizem check-ins em academias próximas, com validação de distância e controle de acesso baseado em roles.

## 📋 Funcionalidades

### ✅ Implementadas
- **Autenticação e Autorização**
  - Cadastro de usuários com senha criptografada
  - Login com JWT (JSON Web Token)
  - Refresh token para renovação de sessão
  - Controle de acesso baseado em roles (ADMIN/MEMBER)

- **Gestão de Usuários**
  - Cadastro e autenticação
  - Perfil do usuário logado
  - Métricas de check-ins realizados
  - Histórico de check-ins com paginação

- **Gestão de Academias**
  - Cadastro de academias (apenas administradores)
  - Busca de academias por nome
  - Busca de academias próximas por coordenadas
  - Validação de distância (máximo 100m)

- **Sistema de Check-in**
  - Realização de check-ins em academias
  - Validação de check-ins (apenas administradores)
  - Limite de um check-in por dia por usuário
  - Validação de check-ins até 20 minutos após criação

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js
- **Framework**: Fastify
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Autenticação**: JWT (JSON Web Token)
- **Validação**: Zod
- **Testes**: Vitest
- **Criptografia**: bcryptjs
- **Utilitários**: dayjs, dotenv

## 🏗️ Arquitetura

A aplicação segue os princípios SOLID e utiliza uma arquitetura em camadas:

- **Controllers**: Responsáveis pelas requisições HTTP
- **Services**: Lógica de negócio
- **Repositories**: Acesso a dados (Prisma + In-Memory para testes)
- **Middlewares**: Autenticação e autorização
- **Utils**: Funções utilitárias

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd api-solid
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/api-solid?schema=public"
JWT_SECRET="sua-chave-secreta-aqui"
```

### 4. Inicie o banco de dados
```bash
docker-compose up -d
```

### 5. Execute as migrações
```bash
npx prisma migrate dev
```

### 6. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Executar testes E2E
```bash
npm run test:e2e
```

### Verificar cobertura de testes
```bash
npm run test:coverage
```

### Interface visual de testes
```bash
npm run test:ui
```

## 🏭 Scripts Disponíveis

- `npm run dev`: Servidor de desenvolvimento
- `npm run build`: Build para produção
- `npm run start`: Servidor de produção
- `npm test`: Executa testes unitários
- `npm run test:e2e`: Executa testes E2E
- `npm run test:coverage`: Verifica cobertura de testes

## 📝 Regras de Negócio

- ✅ Usuários não podem se cadastrar com email duplicado
- ✅ Usuários não podem fazer dois check-ins no mesmo dia
- ✅ Check-ins só são permitidos a até 100m da academia
- ✅ Check-ins só podem ser validados até 20 minutos após criação
- ✅ Check-ins só podem ser validados por administradores
- ✅ Academias só podem ser cadastradas por administradores
- ✅ Senhas são criptografadas com bcrypt
- ✅ Listas são paginadas com 20 itens por página
- ✅ Autenticação via JWT
