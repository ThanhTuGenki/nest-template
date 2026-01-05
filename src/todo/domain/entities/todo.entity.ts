import { BaseEntity } from '@core/base/entity.base';

interface TodoProps {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class TodoEntity extends BaseEntity<TodoProps> {
    public readonly id: string;
    public title: string;
    public description: string | null;
    public completed: boolean;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    private constructor(props: TodoProps) {
        super();
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.completed = props.completed;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;

        // Capture initial state after all properties are set
        this.setInitialState();
    }

    /**
     * Get current state for dirty checking (excluding id)
     */
    protected getCurrentState(): Omit<TodoProps, 'id'> {
        return {
            title: this.title,
            description: this.description,
            completed: this.completed,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    /**
     * Convert entity to plain object
     */
    public toObject(): TodoProps {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            completed: this.completed,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    /**
     * Mark todo as completed
     */
    markAsCompleted(): void {
        this.completed = true;
    }

    /**
     * Mark todo as incomplete
     */
    markAsIncomplete(): void {
        this.completed = false;
    }

    /**
     * Update todo title
     */
    updateTitle(title: string): void {
        if (!title || title.trim().length === 0) {
            throw new Error('Title cannot be empty');
        }
        this.title = title;
    }

    /**
     * Update todo description
     */
    updateDescription(description: string | null): void {
        this.description = description;
    }

    /**
     * Toggle completion status
     */
    toggleCompletion(): void {
        this.completed = !this.completed;
    }

    /**
     * Check if todo is completed
     */
    isCompleted(): boolean {
        return this.completed;
    }

    /**
     * Create a new todo entity (for new records, id = '0')
     */
    static createNew(data: {
        title: string;
        description?: string | null;
        completed?: boolean;
    }): TodoEntity {
        return new TodoEntity({
            id: '0', // Temporary ID for new entities
            title: data.title,
            description: data.description ?? null,
            completed: data.completed ?? false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    /**
     * Hydrate existing todo entity from database
     */
    static fromData(data: {
        id: string;
        title: string;
        description: string | null;
        completed: boolean;
        createdAt: Date;
        updatedAt: Date;
    }): TodoEntity {
        return new TodoEntity({
            id: data.id,
            title: data.title,
            description: data.description,
            completed: data.completed,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }
}

