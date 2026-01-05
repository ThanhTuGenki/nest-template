import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ListTodoQuerySchema = z.object({
    page: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 1))
        .describe('Page number for pagination'),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 10))
        .describe('Number of items per page'),
    search: z.string().optional().describe('Search term for filtering by title'),
    completed: z
        .string()
        .optional()
        .transform((val) => (val === 'true' ? true : val === 'false' ? false : undefined))
        .describe('Filter by completion status'),
});

export class ListTodoQueryDto extends createZodDto(ListTodoQuerySchema) { }
