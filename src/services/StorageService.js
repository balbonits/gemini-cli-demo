export class StorageService {
    static saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static loadTodos() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }
}