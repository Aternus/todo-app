import { TodoItem } from './models';

export interface ITodoService {
  add(todo: string): TodoItem;

  add(todo: TodoItem): TodoItem;

  delete(id: number): void;

  toggle(id: number): void;

  getAll(): TodoItem[];

  getById(id: number): TodoItem | null;

  clearCompleted(): void;
}
