import { IValidatable, IValidationResult } from './validators';

export enum TodoItemState {
  Active = 1,
  Completed,
}

export interface TodoItem {
  id: number;
  task: string;
  state: TodoItemState;
}

export class ValidatableTodo implements TodoItem, IValidatable {
  id = 0;
  task = '';
  state = TodoItemState.Active;

  validate(): IValidationResult[] {
    const errors = [];

    // validate
    if (this.task.length < 3) {
      errors.push({
        isValid: false,
        message: 'Todo must include a task with a min-length of 3.',
        property: 'task',
      });
    }

    return errors;
  }
}
