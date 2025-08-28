class JSFiddleClone extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .editor {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    height: auto;
                }
                textarea {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }
                iframe {
                    width: 100%;
                    height: auto;
                    border: 1px solid #ccc;
                }
                @media (max-width: 600px) {
                    .editor {
                        grid-template-columns: 1fr;
                        height: auto;
                    }
                    textarea {
                        height: 200px;
                    }
                    iframe {
                        height: 300px;
                    }
                }
                .help-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
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
                }
                .help-modal-content {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 5px;
                    max-width: 500px;
                }
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
            </style>
            <div class="editor">
                <textarea class="html" placeholder="HTML"></textarea>
                <textarea class="css" placeholder="CSS"></textarea>
                <textarea class="js" placeholder="JavaScript"></textarea>
            </div>
            <iframe class="output"></iframe>
            <button class="help-button">?</button>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <h2>JSFiddle Clone Help</h2>
                    <p>This is a simplified JSFiddle clone.</p>
                    <ul>
                        <li>Enter HTML, CSS, and JavaScript code into the respective text areas.</li>
                        <li>The output will update automatically as you type.</li>
                    </ul>
                </div>
            </div>
        `;

        this.htmlInput = this.shadowRoot.querySelector('.html');
        this.cssInput = this.shadowRoot.querySelector('.css');
        this.jsInput = this.shadowRoot.querySelector('.js');
        this.output = this.shadowRoot.querySelector('.output');

        this.htmlInput.addEventListener('input', this.updateOutput.bind(this));
        this.cssInput.addEventListener('input', this.updateOutput.bind(this));
        this.jsInput.addEventListener('input', this.updateOutput.bind(this));

        this.helpButton = this.shadowRoot.querySelector('.help-button');
        this.helpModal = this.shadowRoot.querySelector('.help-modal');
        this.closeButton = this.shadowRoot.querySelector('.close-button');

        this.helpButton.addEventListener('click', () => {
            this.helpModal.style.display = 'flex';
        });

        this.closeButton.addEventListener('click', () => {
            this.helpModal.style.display = 'none';
        });
    }

    updateOutput() {
        const source = `
            <html>
                <head>
                    <style>${this.cssInput.value}</style>
                </head>
                <body>
                    ${this.htmlInput.value}
                    <script>${this.jsInput.value}</script>
                </body>
            </html>
        `;
        this.output.srcdoc = source;
    }
}

customElements.define('jsfiddle-clone', JSFiddleClone);