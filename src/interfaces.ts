export enum TodoItemState {
  Active = 1,
  Completed,
}

export interface TodoItem {
  id: number;
  task: string;
  state: TodoItemState
}

export interface ITodoService {
  add(todo: string): TodoItem;

  add(todo: TodoItem): TodoItem;

  delete(id: number): void;

  toggle(id: number): void;

  getAll(): TodoItem[];

  getById(id: number): TodoItem | null;

  clearCompleted(): void;
}
