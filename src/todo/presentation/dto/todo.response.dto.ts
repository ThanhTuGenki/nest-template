import { TodoEntity } from '../../domain/entities/todo.entity';

export class TodoResponseDto {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;

    static fromEntity(entity: TodoEntity): TodoResponseDto {
        const dto = new TodoResponseDto();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.description = entity.description;
        dto.completed = entity.completed;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }

    static fromEntities(entities: TodoEntity[]): TodoResponseDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }
}

export class ListTodoResponseDto {
    data: TodoResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export class DeleteTodoResponseDto {
    deletedCount: number;
}
