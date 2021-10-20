import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from 'src/dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTasks(@Body() data: CreateTaskDto, @Req() req: any): Promise<any> {
    return this.tasksService.createTasks(data);
  }

  @Get()
  getTasks(@Query() query: any): Promise<any> {
    return this.tasksService.getTasks(query);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(
    @Body() data: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.tasksService.updateTask(data, id);
  }
}
