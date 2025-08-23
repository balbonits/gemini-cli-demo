class JSFiddleClone extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .editor {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    height: 400px;
                }
                textarea {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }
                iframe {
                    width: 100%;
                    height: 400px;
                    border: 1px solid #ccc;
                }
            </style>
            <div class="editor">
                <textarea class="html" placeholder="HTML"></textarea>
                <textarea class="css" placeholder="CSS"></textarea>
                <textarea class="js" placeholder="JavaScript"></textarea>
            </div>
            <iframe class="output"></iframe>
        `;

        this.htmlInput = this.shadowRoot.querySelector('.html');
        this.cssInput = this.shadowRoot.querySelector('.css');
        this.jsInput = this.shadowRoot.querySelector('.js');
        this.output = this.shadowRoot.querySelector('.output');

        this.htmlInput.addEventListener('input', this.updateOutput.bind(this));
        this.cssInput.addEventListener('input', this.updateOutput.bind(this));
        this.jsInput.addEventListener('input', this.updateOutput.bind(this));
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