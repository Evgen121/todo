import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/db/entities';

@Injectable()
export class TodoService  extends TypeOrmCrudService<Todo> {
    constructor(@InjectRepository(Todo)repo){
        super(repo);
    }
}
