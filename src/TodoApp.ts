import { TodoItem, TodoItemState } from './interfaces';

import TodoService from './TodoService';

/**
 * Todo App
 */
class TodoApp {
  private todoService: TodoService;

  private readonly formElm: HTMLFormElement;
  private readonly listElm: HTMLElement;
  private readonly itemTpl: HTMLTemplateElement;

  private noItemsElm: HTMLElement | null = null;

  /**
   * Constructor
   *
   * @param {HTMLElement} appElm
   * @param {string[]} todos
   */
  constructor(private readonly appElm: HTMLElement, todos: string[] = []) {
    // create the todo service
    this.todoService = new TodoService(todos);

    // form elm
    this.formElm = this.appElm.querySelector('#addTodoForm') as HTMLFormElement;

    // list elm
    this.listElm = this.appElm.querySelector('#todoList') as HTMLElement;

    // item template
    this.itemTpl = this.appElm.querySelector('#todoItemTpl') as HTMLTemplateElement;

    // sanity check
    if (!this.formElm || !this.listElm || !this.itemTpl) {
      throw new Error(`You're doing it wrong.`);
    }

    // bind events
    this.bindEvents();

    // render
    this.render();
  }

  /**
   * Bind Events
   */
  private bindEvents() {
    // form submit
    this.formElm.addEventListener('submit', this.onClickAddItem.bind(this));

    // clear completed
    const clearElm = this.appElm.querySelector('#clearCompletedTodos') as HTMLButtonElement;
    clearElm.addEventListener('click', this.onClickClearCompletedItems.bind(this));

    // complete, delete
    this.listElm.addEventListener('click', this.onClickItem.bind(this));
  }

  /**
   * On Click Item
   *
   * @param {Event} ev
   */
  private onClickItem(ev: Event) {
    ev.stopPropagation();

    if (ev.target instanceof HTMLElement) {
      // get the elements
      const targetElm = ev.target;
      const itemElm = targetElm.closest('.todoItem') as HTMLElement;

      // get the id
      const id = Number(itemElm.dataset.todoId);

      switch (true) {
        // handle complete
        case targetElm.classList.contains('taskComplete'):
          // toggle
          this.todoService.toggle(id);
          this.render();
          break;

        // handle delete
        case targetElm.classList.contains('taskDelete'):
          // delete
          this.todoService.delete(id);
          this.render();
          break;
      }
    }
  }

  /**
   * On Click Add Item
   *
   * @param {Event} ev
   */
  private onClickAddItem(ev: Event) {
    ev.preventDefault();

    // get the input value
    const taskElm = this.formElm.querySelector('#addTodoTask') as HTMLInputElement;

    // get the complete value
    const completeElm = this.formElm.querySelector('#addTodoComplete') as HTMLInputElement;

    // validate
    if (taskElm.value.length < 3) {
      throw new Error(`Todo must include a task with a min-length of 3.`);
    }

    // add a new item
    const newItem = this.todoService.add(taskElm.value);

    // toggle complete state
    if (completeElm.checked) {
      this.todoService.toggle(newItem.id);
    }

    // revert the elements to the original state
    taskElm.value = '';
    completeElm.checked = false;

    // render
    this.render();
  }

  /**
   * On Click Clear Completed Items
   */
  private onClickClearCompletedItems() {
    this.todoService.clearCompleted();
    this.render();
  }

  /**
   * Create Item Fragment
   *
   * @param {TodoItem} todo
   *
   * @return {DocumentFragment}
   */
  private createItemFragment(todo: TodoItem): DocumentFragment {
    // create a todo item using the template
    const itemElm = document.importNode(this.itemTpl.content, true);

    // get elements
    const containerElm = itemElm.firstElementChild as HTMLElement;
    const inputElm = itemElm.querySelector('.taskName') as HTMLInputElement;
    const completeElm = itemElm.querySelector('.taskComplete') as HTMLInputElement;
    const completeLabelElm = itemElm.querySelector('.taskCompleteLabel') as HTMLLabelElement;

    // set todo item attributes
    containerElm.dataset.todoId = String(todo.id);
    inputElm.innerText = todo.task;
    completeElm.id = `todoItem-${todo.id}`;
    completeLabelElm.htmlFor = `todoItem-${todo.id}`;

    // complete state
    if (todo.state === TodoItemState.Completed) {
      containerElm.classList.add('complete');
      completeElm.checked = true;
    }

    return itemElm;
  }

  /**
   * Get No Items Element
   *
   * @return {HTMLElement}
   */
  private getNoItemsElement(): HTMLElement {
    if (!this.noItemsElm) {
      this.noItemsElm = document.createElement('p');
      this.noItemsElm.textContent = `Great! You're all done. Ready for some more?`;
    }

    return this.noItemsElm;
  }

  /**
   * Render
   */
  private render() {
    // clear the list
    this.listElm.innerHTML = '';

    // get all todos
    const todos = this.todoService.getAll();

    // create a container fragment
    const containerFragment = document.createDocumentFragment();

    // for each todo in the todos array
    todos.forEach((todo: TodoItem) => {
      // create item
      const itemFragment = this.createItemFragment(todo);

      // attach the item to the container
      containerFragment.appendChild(itemFragment);
    });

    // no todos
    if (!containerFragment.children.length) {
      containerFragment.appendChild(this.getNoItemsElement());
    }

    // change DOM
    this.listElm.appendChild(containerFragment);
  }
}

export default TodoApp;
