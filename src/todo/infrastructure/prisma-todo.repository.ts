import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { PrismaBaseRepository } from '@core/base/repository.base';
import { PrismaTransactionClient } from '@core/prisma/prisma.types';
import { Todo as PrismaTodo, Prisma } from '@prisma/client';
import {
    FindManyOptions,
    ITodoRepository,
} from '../application/interfaces/todo.repository.interface';
import { TodoEntity } from '../domain/entities/todo.entity';

@Injectable()
export class PrismaTodoRepository
    extends PrismaBaseRepository<
        TodoEntity,
        PrismaTodo,
        Prisma.TodoCreateInput,
        Prisma.TodoDelegate
    >
    implements ITodoRepository {
    constructor(protected readonly prisma: PrismaService) {
        super(prisma, 'todo');
    }

    /**
     * Convert Prisma model to Domain Entity
     */
    protected fromData(data: PrismaTodo): TodoEntity {
        return TodoEntity.fromData({
            id: data.id,
            title: data.title,
            description: data.description,
            completed: data.completed,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }

    /**
     * Map Domain Entity to Prisma create input
     */
    protected mapEntityToCreateInput(
        entity: TodoEntity,
    ): Prisma.TodoCreateInput {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = entity.toObject();
        return data;
    }

    /**
     * Find all todos
     */
    async findAll(tx?: PrismaTransactionClient): Promise<TodoEntity[]> {
        const client = this.getClient(tx);
        const todos = await client.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return todos.map((todo) => this.fromData(todo));
    }

    /**
     * Find many todos with count (for pagination)
     */
    async findManyWithCount(
        options: FindManyOptions,
        tx?: PrismaTransactionClient,
    ): Promise<[TodoEntity[], number]> {
        const client = this.getClient(tx);

        // If we're already in a transaction, run queries sequentially
        // Otherwise, use $transaction for atomicity
        let todos: PrismaTodo[];
        let count: number;

        if (tx) {
            // Already in transaction, run queries sequentially
            [todos, count] = await Promise.all([
                client.findMany({
                    skip: options.skip,
                    take: options.take,
                    where: options.where,
                    orderBy: options.orderBy,
                }),
                client.count({
                    where: options.where,
                }),
            ]);
        } else {
            // Not in transaction, use $transaction for atomicity
            [todos, count] = await this.prisma.$transaction([
                client.findMany({
                    skip: options.skip,
                    take: options.take,
                    where: options.where,
                    orderBy: options.orderBy,
                }),
                client.count({
                    where: options.where,
                }),
            ]);
        }

        const entities = todos.map((todo) => this.fromData(todo));
        return [entities, count];
    }

    /**
     * Update todo by ID
     */
    async updateTodo(
        id: string,
        data: {
            title?: string;
            description?: string;
            completed?: boolean;
        },
        tx?: PrismaTransactionClient,
    ): Promise<TodoEntity> {
        const client = this.getClient(tx);

        const updated = await client.update({
            where: { id },
            data,
        });

        return this.fromData(updated);
    }

    /**
     * Delete todo by ID
     */
    async deleteTodo(id: string, tx?: PrismaTransactionClient): Promise<TodoEntity> {
        const client = this.getClient(tx);

        const deleted = await client.delete({
            where: { id },
        });

        return this.fromData(deleted);
    }

    /**
     * Delete multiple todos by IDs
     */
    async deleteMany(ids: string[], tx?: PrismaTransactionClient): Promise<number> {
        return this.deleteByIds(ids, tx);
    }
}


