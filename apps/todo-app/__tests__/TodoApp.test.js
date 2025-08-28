import '../src/app.js';

describe('TodoApp', () => {
  let todoApp;

  beforeEach(() => {
    todoApp = document.createElement('todo-app');
    document.body.appendChild(todoApp);
  });

  afterEach(() => {
    document.body.removeChild(todoApp);
  });

  test('should render correctly', () => {
    expect(todoApp).toMatchSnapshot();
  });
});