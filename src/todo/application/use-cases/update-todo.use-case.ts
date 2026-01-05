import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoEntity } from '../../domain/entities/todo.entity';
import {
    ITodoRepository,
    TODO_REPOSITORY,
} from '../interfaces/todo.repository.interface';

export interface UpdateTodoInput {
    id: string;
    title?: string;
    description?: string;
    completed?: boolean;
}

@Injectable()
export class UpdateTodoUseCase {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,
    ) { }

    async execute(input: UpdateTodoInput): Promise<TodoEntity> {
        // Check if todo exists
        const existingTodo = await this.todoRepository.findById(input.id);
        if (!existingTodo) {
            throw new NotFoundException(`Todo with ID ${input.id} not found`);
        }

        // Validate title if provided
        if (input.title !== undefined && input.title.trim().length === 0) {
            throw new Error('Title cannot be empty');
        }

        // Update todo
        return this.todoRepository.updateTodo(input.id, {
            title: input.title?.trim(),
            description: input.description?.trim(),
            completed: input.completed,
        });
    }
}
