import { Module } from '@nestjs/common';
import { TasksModule } from './module/tasks/tasks.module';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    UsersModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
