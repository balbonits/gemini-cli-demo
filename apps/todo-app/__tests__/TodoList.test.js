
import '../src/components/TodoList.js';

describe('TodoList', () => {
  let todoList;
  const todos = [
    { text: 'Test Todo 1', completed: false },
    { text: 'Test Todo 2', completed: true },
  ];

  beforeEach(async () => {
    document.body.innerHTML = '<todo-list></todo-list>';
    await customElements.whenDefined('todo-list');
    todoList = document.querySelector('todo-list');
    todoList.todos = todos;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render a list of todos', () => {
    const todoItems = todoList.shadowRoot.querySelectorAll('todo-item');
    expect(todoItems.length).toBe(2);
    expect(todoItems[0].todo).toEqual(todos[0]);
    expect(todoItems[1].todo).toEqual(todos[1]);
  });

  test('should dispatch events from todo-items', () => {
    const eventSpy = jest.fn();
    todoList.addEventListener('toggle-complete', eventSpy);
    const todoItem = todoList.shadowRoot.querySelector('todo-item');
    todoItem.dispatchEvent(new CustomEvent('toggle-complete', { detail: todos[0] }));
    expect(eventSpy).toHaveBeenCalled();
  });
});
