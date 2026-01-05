import { Injectable } from '@nestjs/common';
import {
    CreateTodoUseCase,
    GetTodoUseCase,
    ListTodosUseCase,
    UpdateTodoUseCase,
    DeleteTodosUseCase,
} from './use-cases';
import { TodoEntity } from '../domain/entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        private readonly createTodoUseCase: CreateTodoUseCase,
        private readonly getTodoUseCase: GetTodoUseCase,
        private readonly listTodosUseCase: ListTodosUseCase,
        private readonly updateTodoUseCase: UpdateTodoUseCase,
        private readonly deleteTodosUseCase: DeleteTodosUseCase,
    ) { }

    async create(data: {
        title: string;
        description?: string;
        completed?: boolean;
    }): Promise<TodoEntity> {
        return this.createTodoUseCase.execute(data);
    }

    async findOne(id: string): Promise<TodoEntity> {
        return this.getTodoUseCase.execute(id);
    }

    async findAll(params?: {
        page?: number;
        limit?: number;
        search?: string;
        completed?: boolean;
    }) {
        return this.listTodosUseCase.execute(params ?? {});
    }

    async updateTodo(
        id: string,
        data: {
            title?: string;
            description?: string;
            completed?: boolean;
        },
    ): Promise<TodoEntity> {
        return this.updateTodoUseCase.execute({ id, ...data });
    }

    async remove(ids: string[]) {
        return this.deleteTodosUseCase.execute({ ids });
    }
}
