class TodoInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    margin-bottom: 1rem;
                }
                input {
                    flex: 1;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    padding: 0.5rem 1rem;
                    border: none;
                    background-color: #007bff;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                }
                @media (max-width: 320px) {
                    form {
                        flex-direction: column;
                    }
                    button {
                        margin-top: 0.5rem;
                    }
                }
            </style>
            <form>
                <input type="text" placeholder="Add a new task..." />
                <button>Add</button>
            </form>
        `;

        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = this.shadowRoot.querySelector('input');
            const text = input.value.trim();
            if (text) {
                this.dispatchEvent(new CustomEvent('add-todo', { detail: text }));
                input.value = '';
            }
        });
    }
}

customElements.define('todo-input', TodoInput);