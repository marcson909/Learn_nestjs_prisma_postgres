import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  description: string;

  ownerId: number;
}

export class DeleteTaskDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
