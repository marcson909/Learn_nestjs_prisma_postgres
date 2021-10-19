import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }
    
    @Post()
    createTasks(@Body() data: any, @Req() req: any): Promise<any>{
        return this.tasksService.createTasks(data);
    }

    @Get()
    getTasks(@Query() query: any): Promise<any>{
        return this.tasksService.getTasks(query);
    }

    @Delete("/:id")
    deleteTask(@Param('id') id: any): Promise<any>{
        return this.tasksService.deleteTask(parseInt(id));
    }

    @Patch("/:id")
    updateTask(@Body() data: any, @Param("id") id: any): Promise<any>{
        return this.tasksService.updateTask(data, parseInt(id));
    }
}
