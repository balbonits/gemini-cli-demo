import './components/TodoInput.js';
import './components/TodoList.js';
import './components/TodoFilter.js';
import { StorageService } from './services/StorageService.js';

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                }
                #reset-app {
                    display: block;
                    margin: 1rem auto 0;
                    padding: 0.5rem 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: none;
                    cursor: pointer;
                }
                @media (max-width: 400px) {
                    #reset-app {
                        width: 100%;
                    }
                }
                
                .help-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .help-modal-content {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 5px;
                    max-width: 500px;
                    position: relative;
                }
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .fullscreen-button {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <h1>To-Do List</h1>
            <todo-input></todo-input>
            <todo-filter></todo-filter>
            <todo-list></todo-list>
            <button id="reset-app">Reset</button>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <button class="fullscreen-button">&#x26F6;</button>
                    <h2>To-Do List Help</h2>
                    <p>This is a simple to-do list application.</p>
                    <ul>
                        <li>Type a task in the input field and press Enter or click "Add" to add a new task.</li>
                        <li>Click the checkbox to mark a task as complete or incomplete.</li>
                        <li>Click the "Delete" button to remove a task.</li>
                        <li>Click the "Edit" button to edit a task.</li>
                        <li>Use the filter buttons to show all, active, or completed tasks.</li>
                        <li>Click "Clear Completed" to remove all completed tasks.</li>
                    </ul>
                </div>
            </div>
            <button class="help-button">?</button>
        `;

        this._todos = StorageService.loadTodos();
        this.FILTER_ALL = 'all';
        this._filter = this.FILTER_ALL;
        this._todoInput = this.shadowRoot.querySelector('todo-input');
        this._todoList = this.shadowRoot.querySelector('todo-list');
        this._todoFilter = this.shadowRoot.querySelector('todo-filter');
        this._resetButton = this.shadowRoot.querySelector('#reset-app');
        this.helpButton = this.shadowRoot.querySelector('.help-button');
        this.helpModal = this.shadowRoot.querySelector('.help-modal');
        this.closeButton = this.shadowRoot.querySelector('.close-button');

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

        this._resetButton.addEventListener('click', () => {
            this.resetApp();
        });

        this.helpButton.addEventListener('click', this.openHelpModal.bind(this));

        this.closeButton.addEventListener('click', this.closeHelpModal.bind(this));

        this.fullscreenButton = this.shadowRoot.querySelector('.fullscreen-button');
        this.fullscreenButton.addEventListener('click', () => {
            const iframe = window.frameElement;
            if (iframe) {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.mozRequestFullScreen) { /* Firefox */
                    iframe.mozRequestFullScreen();
                } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) { /* IE/Edge */
                    iframe.msRequestFullscreen();
                }
            }
        });

        this.renderTodoList();
    }

    openHelpModal() {
        this.helpModal.style.display = 'flex';
    }

    closeHelpModal() {
        this.helpModal.style.display = 'none';
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

    resetApp() {
        this._todos = [];
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