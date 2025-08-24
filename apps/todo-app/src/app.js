import './components/TodoInput.js';
import './components/TodoList.js';
import './components/TodoFilter.js';
import { StorageService } from './services/StorageService.js';

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <h1>To-Do List</h1>
            <todo-input></todo-input>
            <todo-filter></todo-filter>
            <todo-list></todo-list>
            <button id="clear-completed">Clear Completed</button>
        `;

        this._todos = StorageService.loadTodos();
        this._filter = 'all';
        this._todoInput = this.shadowRoot.querySelector('todo-input');
        this._todoList = this.shadowRoot.querySelector('todo-list');
        this._todoFilter = this.shadowRoot.querySelector('todo-filter');
        this._clearCompletedButton = this.shadowRoot.querySelector('#clear-completed');

        this._todoInput.addEventListener('add-todo', (e) => {
            this.addTodo(e.detail);
        });

        this._todoList.addEventListener('toggle-complete', (e) => {
            this.toggleTodo(e.detail);
        });

        this._todoList.addEventListener('delete-todo', (e) => {
            this.deleteTodo(e.detail);
        });

        this._todoList.addEventListener('edit-todo', (e) => {
            this.editTodo(e.detail.oldTodo, e.detail.newText);
        });

        this._todoFilter.addEventListener('filter-todos', (e) => {
            this.filterTodos(e.detail);
        });

        this._clearCompletedButton.addEventListener('click', () => {
            this.clearCompleted();
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

    editTodo(oldTodo, newText) {
        this._todos = this._todos.map(t => t.text === oldTodo.text ? { ...t, text: newText } : t);
        this.saveAndRender();
    }

    filterTodos(filter) {
        this._filter = filter;
        this.renderTodoList();
    }

    clearCompleted() {
        this._todos = this._todos.filter(todo => !todo.completed);
        this.saveAndRender();
    }

    saveAndRender() {
        StorageService.saveTodos(this._todos);
        this.renderTodoList();
    }

    renderTodoList() {
        let filteredTodos = this._todos;
        if (this._filter === 'active') {
            filteredTodos = this._todos.filter(todo => !todo.completed);
        }
        else if (this._filter === 'completed') {
            filteredTodos = this._todos.filter(todo => todo.completed);
        }
        this._todoList.todos = filteredTodos;
    }
}

customElements.define('todo-app', TodoApp);