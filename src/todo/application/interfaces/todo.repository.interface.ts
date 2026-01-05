import { TodoEntity } from '../../domain/entities/todo.entity';
import { IBaseRepository } from '@core/base/repository.base';

export interface FindManyOptions {
    skip?: number;
    take?: number;
    where?: {
        title?: { contains: string; mode: 'insensitive' };
        completed?: boolean;
    };
    orderBy?: {
        createdAt?: 'asc' | 'desc';
        updatedAt?: 'asc' | 'desc';
    };
}

export interface ITodoRepository extends IBaseRepository<TodoEntity> {
    /**
     * Find todo by ID
     */
    findById(id: string): Promise<TodoEntity | null>;

    /**
     * Find all todos
     */
    findAll(): Promise<TodoEntity[]>;

    /**
     * Find many todos with count (for pagination)
     */
    findManyWithCount(options: FindManyOptions): Promise<[TodoEntity[], number]>;

    /**
     * Update todo by ID
     */
    updateTodo(
        id: string,
        data: {
            title?: string;
            description?: string;
            completed?: boolean;
        },
    ): Promise<TodoEntity>;

    /**
     * Delete todo by ID
     */
    deleteTodo(id: string): Promise<TodoEntity>;

    /**
     * Delete multiple todos by IDs
     */
    deleteMany(ids: string[]): Promise<number>;
}

export const TODO_REPOSITORY = Symbol('TODO_REPOSITORY');
