import { Module } from '@nestjs/common';
import { AuthModule } from 'src/module/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
