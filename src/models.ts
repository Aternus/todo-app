export enum TodoItemState {
  Active = 1,
  Completed,
}

export interface TodoItem {
  id: number;
  task: string;
  state: TodoItemState;
}
