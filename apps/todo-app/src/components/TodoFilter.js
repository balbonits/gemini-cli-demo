class TodoFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .filters {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 1rem;
                }
                button {
                    margin: 0 0.5rem;
                    padding: 0.5rem 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: none;
                    cursor: pointer;
                }
                button.active {
                    background-color: #007bff;
                    color: white;
                }
                @media (max-width: 320px) {
                    .filters {
                        flex-direction: column;
                    }
                    button {
                        margin: 0.25rem 0;
                    }
                }
            </style>
            <div class="filters">
                <button id="all" class="active">All</button>
                <button id="active">Active</button>
                <button id="completed">Completed</button>
            </div>
        `;

        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.shadowRoot.querySelector('button.active').classList.remove('active');
                e.target.classList.add('active');
                this.dispatchEvent(new CustomEvent('filter-todos', { detail: e.target.id }));
            });
        });
    }
}

customElements.define('todo-filter', TodoFilter);