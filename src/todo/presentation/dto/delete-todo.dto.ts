import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const DeleteTodoSchema = z.object({
    ids: z.array(z.string().cuid()).min(1).describe('Array of todo IDs to delete'),
});

export class DeleteTodoDto extends createZodDto(DeleteTodoSchema) { }
