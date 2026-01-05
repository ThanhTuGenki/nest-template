import { Module } from '@nestjs/common';
import { PrismaModule } from '@core/prisma/prisma.module';

// Presentation Layer
import { TodoController } from './presentation/todo.controller';

// Application Layer
import { TodoService } from './application/todo.service';
import {
    CreateTodoUseCase,
    GetTodoUseCase,
    ListTodosUseCase,
    UpdateTodoUseCase,
    DeleteTodosUseCase,
} from './application/use-cases';

// Infrastructure Layer
import { PrismaTodoRepository } from './infrastructure/prisma-todo.repository';
import { TODO_REPOSITORY } from './application/interfaces/todo.repository.interface';

@Module({
    imports: [PrismaModule],
    controllers: [TodoController],
    providers: [
        // Service
        TodoService,

        // Use Cases
        CreateTodoUseCase,
        GetTodoUseCase,
        ListTodosUseCase,
        UpdateTodoUseCase,
        DeleteTodosUseCase,

        // Repository
        {
            provide: TODO_REPOSITORY,
            useClass: PrismaTodoRepository,
        },
    ],
    exports: [TodoService],
})
export class TodoModule { }
