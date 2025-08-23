import './components/TodoInput.js';
import './components/TodoList.js';
import { StorageService } from './services/StorageService.js';

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h1>To-Do List</h1>
            <todo-input></todo-input>
            <todo-list></todo-list>
        `;

        this._todos = StorageService.loadTodos();
        this._todoInput = this.shadowRoot.querySelector('todo-input');
        this._todoList = this.shadowRoot.querySelector('todo-list');

        this._todoInput.addEventListener('add-todo', (e) => {
            this.addTodo(e.detail);
        });

        this._todoList.addEventListener('toggle-complete', (e) => {
            this.toggleTodo(e.detail);
        });

        this._todoList.addEventListener('delete-todo', (e) => {
            this.deleteTodo(e.detail);
        });

        this.renderTodoList();
    }

    addTodo(text) {
        this._todos = [...this._todos, { text, completed: false }];
        this.saveAndRender();
    }

    toggleTodo(todo) {
        this._todos = this._todos.map(t => t.text === todo.text ? { ...t, completed: !t.completed } : t);
        this.saveAndRender();
    }

    deleteTodo(todo) {
        this._todos = this._todos.filter(t => t.text !== todo.text);
        this.saveAndRender();
    }

    saveAndRender() {
        StorageService.saveTodos(this._todos);
        this.renderTodoList();
    }

    renderTodoList() {
        this._todoList.todos = this._todos;
    }
}

customElements.define('todo-app', TodoApp);