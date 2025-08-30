
import '../src/components/TodoFilter.js';

describe('TodoFilter', () => {
  let todoFilter;

  beforeEach(async () => {
    document.body.innerHTML = '<todo-filter></todo-filter>';
    await customElements.whenDefined('todo-filter');
    todoFilter = document.querySelector('todo-filter');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should dispatch filter-todos event on button click', () => {
    const eventSpy = jest.fn();
    todoFilter.addEventListener('filter-todos', eventSpy);
    const activeButton = todoFilter.shadowRoot.querySelector('#active');
    activeButton.click();
    expect(eventSpy).toHaveBeenCalledWith(new CustomEvent('filter-todos', { detail: 'active' }));
  });
});
