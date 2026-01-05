import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GetTodoSchema = z.object({
    id: z.string().cuid().describe('The ID of the todo'),
});

export class GetTodoDto extends createZodDto(GetTodoSchema) { }
