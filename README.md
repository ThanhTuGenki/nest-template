<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <br />
  <h1 align="center">NestJS Clean Architecture Template</h1>
</p>

This is a production-ready **NestJS Template** built with **Clean Architecture** principles. It comes pre-configured with essential tools and best practices for building scalable and maintainable applications.

## 🌟 Key Features

- **Clean Architecture**: Clear separation of concerns with 4 layers (Domain, Application, Infrastructure, Presentation).
- **Prisma ORM**: Type-safe database access with PostgreSQL.
- **Base Repository Pattern**: Generic repository implementation with **Transaction Support** (`PrismaTransactionClient`).
- **Domain Entities**: Rich domain model with **Dirty Checking** and state tracking.
- **DTO Validation**: Robust input validation using `nestjs-zod` and `zod`.
- **Module Generator**: Quick scaffolding script to create new modules in seconds.
- **Swagger Documentation**: Auto-generated API documentation.

## 🏗️ Architecture

```
src/module-name/
├── domain/           # Enterprise logic & business rules
│   └── entities/     # Rich domain entities
├── application/      # Application business rules
│   ├── use-cases/    # Application specific use cases
│   ├── interfaces/   # Repository interfaces (Ports)
│   └── services/     # Application services
├── infrastructure/   # Frameworks & Drivers
│   └── repositories/ # Repository implementations (Adapters)
└── presentation/     # Interface Adapters
    ├── controllers/  # API Controllers
    └── dto/          # Data Transfer Objects
```

## 🚀 Getting Started

### 1. Installation

```bash
$ npm install
```

### 2. Database Setup

```bash
# Start Docker containers (Postgres)
$ docker-compose up -d

# Run Prisma migrations
$ npm run prisma:migrate
```

### 3. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 4. Create a new module

Generate a new module with full Clean Architecture structure in seconds:

```bash
$ npm run generate:module
```

See [QUICKSTART.md](./scripts/QUICKSTART.md) for more details.

## 📚 API Documentation

Once the app is running, visit: http://localhost:3001/api/docs

## 💡 Best Practices Implemented

- **Repository Pattern**: Abstract data access behind interfaces.
- **Transaction Handling**: Smart transaction support transparently handling atomic operations using `PrismaTransactionClient`.
- **Entity State Management**: BaseEntity handles dirty checking to optimize database updates.
- **UseCase Pattern**: Each business action is encapsulated in a separate Create/Read/Update/Delete UseCase.
- **Strict Typing**: Full TypeScript support from Database to API with Zod validation.

## 🧪 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## 📝 License

Nest is [MIT licensed](LICENSE).
