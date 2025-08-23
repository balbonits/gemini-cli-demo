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
                button {
                    margin-left: auto;
                    background: none;
                    border: none;
                    color: red;
                    cursor: pointer;
                }
            </style>
            <li class="${this._todo.completed ? 'completed' : ''}">
                <input type="checkbox" ${this._todo.completed ? 'checked' : ''}>
                <span>${this._todo.text}</span>
                <button>Delete</button>
            </li>
        `;

        this.shadowRoot.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            this.dispatchEvent(new CustomEvent('toggle-complete', { detail: this._todo }));
        });

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('delete-todo', { detail: this._todo }));
        });
    }
}

customElements.define('todo-item', TodoItem);