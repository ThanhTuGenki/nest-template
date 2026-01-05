import { Inject, Injectable } from '@nestjs/common';
import {
    ITodoRepository,
    TODO_REPOSITORY,
} from '../interfaces/todo.repository.interface';

export interface DeleteTodosInput {
    ids: string[];
}

export interface DeleteTodosOutput {
    deletedCount: number;
}

@Injectable()
export class DeleteTodosUseCase {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,
    ) { }

    async execute(input: DeleteTodosInput): Promise<DeleteTodosOutput> {
        if (!input.ids || input.ids.length === 0) {
            throw new Error('At least one ID is required');
        }

        const deletedCount = await this.todoRepository.deleteMany(input.ids);

        return { deletedCount };
    }
}
