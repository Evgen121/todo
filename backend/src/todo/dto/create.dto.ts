
import { IsString,  IsOptional, IsBoolean,  } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  text: string;
  
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}


