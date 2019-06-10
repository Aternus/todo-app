import { ITodoService, TodoItem, TodoItemState } from './interfaces';

/**
 * Todo Service
 */
class TodoService implements ITodoService {
  private todos: TodoItem[] = [];

  private static _lastId: number = 0;

  private static generateNextId(): number {
    return TodoService._lastId++;
  }

  private static clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }

  constructor(todos: string[]) {
    if (todos) {
      todos.forEach((todo) => this.add(todo));
    }
  }

  add(input: string): TodoItem;
  add(input: TodoItem): TodoItem;
  add(input: string | TodoItem): TodoItem {
    const todo: TodoItem = {
      id: TodoService.generateNextId(),
      task: '',
      state: TodoItemState.Active,
    };

    if (typeof input === 'string') {
      todo.task = input;
    } else if (input.task) {
      todo.task = input.task;
    } else {
      throw 'Invalid Todo Task';
    }

    this.todos.push(todo);

    return todo;
  }

  delete(id: number): void {
    const todo = this.findById(id);
    if (todo) {
      const idx = this.todos.indexOf(todo);
      if (idx !== -1) {
        this.todos.splice(idx, 1);
      }
    }
  }

  toggle(id: number): void {
    const todo = this.findById(id);
    if (todo) {
      switch (todo.state) {
        case TodoItemState.Active:
          todo.state = TodoItemState.Completed;
          break;

        case TodoItemState.Completed:
          todo.state = TodoItemState.Active;
          break;
      }
    }
  }

  getAll(): TodoItem[] {
    return TodoService.clone(this.todos);
  }

  getById(id: number): TodoItem | null {
    const todo = this.findById(id);
    return todo ? TodoService.clone(todo) : null;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo: TodoItem) => todo.state !== TodoItemState.Completed);
  }

  private findById(id: number): TodoItem | null {
    let idx = null;
    for (let k = 0, v; k < this.todos.length; k++) {
      v = this.todos[k];
      if (v && v.id === id) {
        idx = k;
        break;
      }
    }
    return idx !== null ? this.todos[idx] : null;
  }
}

export default TodoService;
