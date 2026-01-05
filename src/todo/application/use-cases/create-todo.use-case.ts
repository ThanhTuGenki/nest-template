import { Inject, Injectable } from '@nestjs/common';
import { TodoEntity } from '../../domain/entities/todo.entity';
import {
    ITodoRepository,
    TODO_REPOSITORY,
} from '../interfaces/todo.repository.interface';

export interface CreateTodoInput {
    title: string;
    description?: string;
    completed?: boolean;
}

@Injectable()
export class CreateTodoUseCase {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,
    ) { }

    async execute(input: CreateTodoInput): Promise<TodoEntity> {
        // Validate input
        if (!input.title || input.title.trim().length === 0) {
            throw new Error('Title is required');
        }

        // Create entity
        const entity = TodoEntity.createNew({
            title: input.title.trim(),
            description: input.description?.trim(),
            completed: input.completed ?? false,
        });

        // Save via repository (base repository's save method)
        return this.todoRepository.save(entity);
    }
}
