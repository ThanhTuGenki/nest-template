import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTodoSchema = z.object({
    title: z.string().min(1).describe('The title of the todo'),
    description: z.string().optional().describe('The description of the todo'),
    completed: z.boolean().optional().default(false),
});

export class CreateTodoDto extends createZodDto(CreateTodoSchema) { }
