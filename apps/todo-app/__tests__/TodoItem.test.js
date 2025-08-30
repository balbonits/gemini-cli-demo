
import '../src/components/TodoItem.js';

describe('TodoItem', () => {
  let todoItem;
  const todo = { text: 'Test Todo', completed: false };

  beforeEach(async () => {
    document.body.innerHTML = '<todo-item></todo-item>';
    await customElements.whenDefined('todo-item');
    todoItem = document.querySelector('todo-item');
    todoItem.todo = todo;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(todoItem).toMatchSnapshot();
  });

  test('should dispatch toggle-complete event on checkbox change', () => {
    const eventSpy = jest.fn();
    todoItem.addEventListener('toggle-complete', eventSpy);
    todoItem.shadowRoot.querySelector('input[type="checkbox"]').click();
    expect(eventSpy).toHaveBeenCalled();
  });

  test('should dispatch delete-todo event on delete button click', () => {
    const eventSpy = jest.fn();
    todoItem.addEventListener('delete-todo', eventSpy);
    todoItem.shadowRoot.querySelector('.delete-btn').click();
    expect(eventSpy).toHaveBeenCalled();
  });

  test('should enter edit mode on edit button click', () => {
    todoItem.shadowRoot.querySelector('.edit-btn').click();
    expect(todoItem.shadowRoot.querySelector('.edit-input').style.display).toBe('block');
    expect(todoItem.shadowRoot.querySelector('.save-btn').style.display).toBe('block');
  });

  test('should dispatch edit-todo event on save button click', () => {
    const eventSpy = jest.fn();
    todoItem.addEventListener('edit-todo', eventSpy);
    todoItem.shadowRoot.querySelector('.edit-btn').click();
    const editInput = todoItem.shadowRoot.querySelector('.edit-input');
    editInput.value = 'Updated Todo';
    todoItem.shadowRoot.querySelector('.save-btn').click();
    expect(eventSpy).toHaveBeenCalledWith(new CustomEvent('edit-todo', { detail: { oldTodo: todo, newText: 'Updated Todo' } }));
  });
});
