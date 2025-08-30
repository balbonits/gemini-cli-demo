
import { StorageService } from '../src/services/StorageService.js';

describe('StorageService', () => {
  const todos = [{ text: 'Test Todo', completed: false }];

  beforeEach(() => {
    localStorage.clear();
  });

  test('should save and load todos', () => {
    StorageService.saveTodos(todos);
    const loadedTodos = StorageService.loadTodos();
    expect(loadedTodos).toEqual(todos);
  });

  test('should return an empty array if no todos are saved', () => {
    const loadedTodos = StorageService.loadTodos();
    expect(loadedTodos).toEqual([]);
  });
});
