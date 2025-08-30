
import '../src/app.js';
import { StorageService } from '../src/services/StorageService.js';

jest.mock('../src/services/StorageService.js');

describe('TodoApp', () => {
  let todoApp;

  beforeEach(async () => {
    StorageService.loadTodos.mockReturnValue([]);
    document.body.innerHTML = '<todo-app></todo-app>';
    await customElements.whenDefined('todo-app');
    todoApp = document.querySelector('todo-app');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(todoApp).toMatchSnapshot();
  });

  test('should add a todo', () => {
    const todoInput = todoApp.shadowRoot.querySelector('todo-input');
    const todoList = todoApp.shadowRoot.querySelector('todo-list');

    todoInput.dispatchEvent(new CustomEvent('add-todo', { detail: 'New Todo' }));

    expect(todoList.todos).toEqual([{ text: 'New Todo', completed: false }]);
    expect(StorageService.saveTodos).toHaveBeenCalledWith([{ text: 'New Todo', completed: false }]);
  });

  test('should toggle a todo', () => {
    const todoList = todoApp.shadowRoot.querySelector('todo-list');
    todoApp.addTodo('Test Todo');

    todoList.dispatchEvent(new CustomEvent('toggle-complete', { detail: { text: 'Test Todo', completed: false } }));

    expect(todoList.todos).toEqual([{ text: 'Test Todo', completed: true }]);
    expect(StorageService.saveTodos).toHaveBeenCalledWith([{ text: 'Test Todo', completed: true }]);
  });

  test('should delete a todo', () => {
    const todoList = todoApp.shadowRoot.querySelector('todo-list');
    todoApp.addTodo('Test Todo');

    todoList.dispatchEvent(new CustomEvent('delete-todo', { detail: { text: 'Test Todo' } }));

    expect(todoList.todos).toEqual([]);
    expect(StorageService.saveTodos).toHaveBeenCalledWith([]);
  });

  test('should edit a todo', () => {
    const todoList = todoApp.shadowRoot.querySelector('todo-list');
    todoApp.addTodo('Test Todo');

    todoList.dispatchEvent(new CustomEvent('edit-todo', { detail: { oldTodo: { text: 'Test Todo' }, newText: 'Updated Todo' } }));

    expect(todoList.todos).toEqual([{ text: 'Updated Todo', completed: false }]);
    expect(StorageService.saveTodos).toHaveBeenCalledWith([{ text: 'Updated Todo', completed: false }]);
  });

  test('should filter todos', () => {
    const todoFilter = todoApp.shadowRoot.querySelector('todo-filter');
    const todoList = todoApp.shadowRoot.querySelector('todo-list');
    todoApp.addTodo('Active Todo');
    todoApp.addTodo('Completed Todo');
    todoApp.toggleTodo({ text: 'Completed Todo', completed: false });


    todoFilter.dispatchEvent(new CustomEvent('filter-todos', { detail: 'active' }));
    expect(todoList.todos.length).toBe(1);

    todoFilter.dispatchEvent(new CustomEvent('filter-todos', { detail: 'completed' }));
    expect(todoList.todos.length).toBe(1);

    todoFilter.dispatchEvent(new CustomEvent('filter-todos', { detail: 'all' }));
    expect(todoList.todos.length).toBe(2);
  });

  test('should reset the app', () => {
    const resetButton = todoApp.shadowRoot.querySelector('#reset-app');
    todoApp.addTodo('Test Todo');

    resetButton.click();

    expect(todoApp._todos).toEqual([]);
    expect(StorageService.saveTodos).toHaveBeenCalledWith([]);
  });

  test('should show and hide the help modal', () => {
    const helpButton = todoApp.shadowRoot.querySelector('.help-button');
    const closeButton = todoApp.shadowRoot.querySelector('.close-button');
    const helpModal = todoApp.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });
});
