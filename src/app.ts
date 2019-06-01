import TodoApp from './TodoApp';

// get the list of todos
const todos: string[] = [];

// get the app container
const todoAppElm = document.querySelector('#todoApp');

if (todoAppElm instanceof HTMLElement) {
  // instantiate the todo app
  new TodoApp(todoAppElm, todos);
}
