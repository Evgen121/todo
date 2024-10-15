import { Crud } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { Todo } from 'src/db/entities';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create.dto';
import { UpdateTodoDto } from './dto/update.dto';


@Crud({
    model:{
      type:Todo  
    },
    dto:{
        create: CreateTodoDto,
        update: UpdateTodoDto
    }
})
@Controller('todo')
export class TodoController {
    constructor(public service: TodoService){}
}
