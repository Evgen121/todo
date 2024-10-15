import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;

  @Column({ default: false })
  completed: boolean;
}
