class TodoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set todo(todo) {
        this._todo = todo;
        this.render();
    }

    get todo() {
        return this._todo;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                li {
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #ccc;
                }
                .completed {
                    text-decoration: line-through;
                    color: #aaa;
                }
                input[type="checkbox"] {
                    margin-right: 0.5rem;
                }
                .edit-input {
                    flex: 1;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    margin-left: 0.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .delete-btn {
                    color: red;
                }
                .edit-btn {
                    color: #007bff;
                }
                .save-btn {
                    color: green;
                }
                @media (max-width: 400px) {
                    button {
                        padding: 0.5rem;
                        margin-left: 0.5rem;
                    }
                }
            </style>
            <li class="${this._todo.completed ? 'completed' : ''}">
                <input type="checkbox" ${this._todo.completed ? 'checked' : ''}>
                <span class="todo-text">${this._todo.text}</span>
                <input type="text" class="edit-input" style="display: none;" />
                <button class="edit-btn">Edit</button>
                <button class="save-btn" style="display: none;">Save</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;

        this.shadowRoot.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            this.dispatchEvent(new CustomEvent('toggle-complete', { detail: this._todo }));
        });

        this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete-todo', { detail: this._todo }));
        });

        this.shadowRoot.querySelector('.edit-btn').addEventListener('click', () => {
            this.enterEditMode();
        });

        this.shadowRoot.querySelector('.save-btn').addEventListener('click', () => {
            this.saveTodo();
        });
    }

    enterEditMode() {
        const span = this.shadowRoot.querySelector('.todo-text');
        const input = this.shadowRoot.querySelector('.edit-input');
        const editBtn = this.shadowRoot.querySelector('.edit-btn');
        const saveBtn = this.shadowRoot.querySelector('.save-btn');

        span.style.display = 'none';
        input.style.display = 'block';
        input.value = this._todo.text;
        editBtn.style.display = 'none';
        saveBtn.style.display = 'block';
        input.focus();
    }

    saveTodo() {
        const input = this.shadowRoot.querySelector('.edit-input');
        const newText = input.value.trim();
        if (newText && newText !== this._todo.text) {
            this.dispatchEvent(new CustomEvent('edit-todo', { detail: { oldTodo: this._todo, newText } }));
        }
        this.exitEditMode();
    }

    exitEditMode() {
        const span = this.shadowRoot.querySelector('.todo-text');
        const input = this.shadowRoot.querySelector('.edit-input');
        const editBtn = this.shadowRoot.querySelector('.edit-btn');
        const saveBtn = this.shadowRoot.querySelector('.save-btn');

        span.style.display = 'block';
        input.style.display = 'none';
        editBtn.style.display = 'block';
        saveBtn.style.display = 'none';
    }
}

customElements.define('todo-item', TodoItem);