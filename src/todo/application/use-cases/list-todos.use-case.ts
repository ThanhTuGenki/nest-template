import { Inject, Injectable } from '@nestjs/common';
import { TodoEntity } from '../../domain/entities/todo.entity';
import {
    FindManyOptions,
    ITodoRepository,
    TODO_REPOSITORY,
} from '../interfaces/todo.repository.interface';

export interface ListTodosInput {
    page?: number;
    limit?: number;
    search?: string;
    completed?: boolean;
}

export interface ListTodosOutput {
    data: TodoEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Injectable()
export class ListTodosUseCase {
    constructor(
        @Inject(TODO_REPOSITORY)
        private readonly todoRepository: ITodoRepository,
    ) { }

    async execute(input: ListTodosInput): Promise<ListTodosOutput> {
        const page = input.page ?? 1;
        const limit = input.limit ?? 10;
        const skip = (page - 1) * limit;

        const options: FindManyOptions = {
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        };

        // Add search filter
        if (input.search) {
            options.where = {
                title: { contains: input.search, mode: 'insensitive' },
            };
        }

        // Add completed filter
        if (input.completed !== undefined) {
            options.where = {
                ...options.where,
                completed: input.completed,
            };
        }

        const [data, total] =
            await this.todoRepository.findManyWithCount(options);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}
