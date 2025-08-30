
import '../src/components/TodoInput.js';

describe('TodoInput', () => {
  let todoInput;

  beforeEach(async () => {
    document.body.innerHTML = '<todo-input></todo-input>';
    await customElements.whenDefined('todo-input');
    todoInput = document.querySelector('todo-input');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should dispatch add-todo event on form submit', () => {
    const eventSpy = jest.fn();
    todoInput.addEventListener('add-todo', eventSpy);
    const form = todoInput.shadowRoot.querySelector('form');
    const input = todoInput.shadowRoot.querySelector('input');
    input.value = 'New Todo';
    form.dispatchEvent(new Event('submit'));
    expect(eventSpy).toHaveBeenCalledWith(new CustomEvent('add-todo', { detail: 'New Todo' }));
  });

  test('should not dispatch add-todo event if input is empty', () => {
    const eventSpy = jest.fn();
    todoInput.addEventListener('add-todo', eventSpy);
    const form = todoInput.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(eventSpy).not.toHaveBeenCalled();
  });
});
