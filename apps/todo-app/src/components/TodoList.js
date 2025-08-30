import './TodoItem.js';

class TodoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._todos = [];
    }

    set todos(todos) {
        this._todos = todos;
        this.render();
    }

    get todos() {
        return this._todos;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ul {
                    list-style-type: none;
                    padding: 0;
                }
            </style>
            <ul>
                ${this._todos.map(() => `<todo-item></todo-item>`).join('')}
            </ul>
        `;

        const todoItems = this.shadowRoot.querySelectorAll('todo-item');
        todoItems.forEach((todoItem, index) => {
            todoItem.todo = this._todos[index];
            todoItem.addEventListener('toggle-complete', (e) => {
                this.dispatchEvent(new CustomEvent('toggle-complete', { detail: e.detail }));
            });
            todoItem.addEventListener('delete-todo', (e) => {
                this.dispatchEvent(new CustomEvent('delete-todo', { detail: e.detail }));
            });
            todoItem.addEventListener('edit-todo', (e) => {
                this.dispatchEvent(new CustomEvent('edit-todo', { detail: e.detail }));
            });
        });
    }
}

customElements.define('todo-list', TodoList);