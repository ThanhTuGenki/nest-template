import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoEntity } from '../../domain/entities/todo.entity';
import {
    ITodoRepository,
    TODO_REPOSITORY,
} from '../interfaces/todo.repository.interface';

@Injectable()
export class GetTodoUseCase {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,
    ) { }

    async execute(id: string): Promise<TodoEntity> {
        const todo = await this.todoRepository.findById(id);

        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        return todo;
    }
}
