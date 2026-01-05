import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TodoService } from '../application/todo.service';
import {
    CreateTodoDto,
    UpdateTodoDto,
    ListTodoQueryDto,
    DeleteTodoDto,
    TodoResponseDto,
    ListTodoResponseDto,
    DeleteTodoResponseDto,
} from './dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoResponseDto> {
        const todo = await this.todoService.create(createTodoDto);
        return TodoResponseDto.fromEntity(todo);
    }

    @Get()
    async findAll(@Query() query: ListTodoQueryDto): Promise<ListTodoResponseDto> {
        const result = await this.todoService.findAll({
            page: query.page,
            limit: query.limit,
            search: query.search,
            completed: query.completed,
        });

        return {
            data: TodoResponseDto.fromEntities(result.data),
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<TodoResponseDto> {
        const todo = await this.todoService.findOne(id);
        return TodoResponseDto.fromEntity(todo);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateTodoDto: UpdateTodoDto,
    ): Promise<TodoResponseDto> {
        const todo = await this.todoService.updateTodo(id, updateTodoDto);
        return TodoResponseDto.fromEntity(todo);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<TodoResponseDto> {
        // Get todo before deleting
        const todo = await this.todoService.findOne(id);
        await this.todoService.remove([id]);
        return TodoResponseDto.fromEntity(todo);
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    async removeMany(@Body() deleteTodoDto: DeleteTodoDto): Promise<DeleteTodoResponseDto> {
        const result = await this.todoService.remove(deleteTodoDto.ids);
        return { deletedCount: result.deletedCount };
    }
}
