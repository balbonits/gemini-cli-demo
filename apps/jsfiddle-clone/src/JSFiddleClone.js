class JSFiddleClone extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                }
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
                    bottom: 10px;
                    right: 10px;
                    font-size: 1.2rem;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
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
            <div class="editor">
                <textarea class="html" placeholder="HTML"></textarea>
                <textarea class="css" placeholder="CSS"></textarea>
                <textarea class="js" placeholder="JavaScript"></textarea>
            </div>
            <iframe class="output"></iframe>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <button class="fullscreen-button">&#x26F6;</button>
                    <h2>JSFiddle Clone Help</h2>
                    <p>This is a simplified JSFiddle clone.</p>
                    <ul>
                        <li>Enter HTML, CSS, and JavaScript code into the respective text areas.</li>
                        <li>The output will update automatically as you type.</li>
                    </ul>
                </div>
            </div>
            <button class="help-button">?</button>
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