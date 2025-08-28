import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

class MarkdownEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                }
                .editor-container {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
                textarea {
                    width: 50%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 1rem;
                    border: 1px solid #ccc;
                }
                .preview {
                    width: 50%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    overflow-y: auto;
                }
                @media (max-width: 768px) {
                    .editor-container {
                        flex-direction: column;
                    }
                    textarea, .preview {
                        width: 100%;
                        height: 50%;
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
            </style>
            <div class="editor-container">
                <textarea class="markdown-input"></textarea>
                <div class="preview"></div>
            </div>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <button class="fullscreen-button">&#x26F6;</button>
                    <h2>Markdown Editor Help</h2>
                    <p>This is a simple markdown editor with a live preview.</p>
                    <ul>
                        <li>Type markdown syntax in the left panel.</li>
                        <li>See the rendered HTML in the right panel.</li>
                    </ul>
                </div>
            </div>
            <button class="help-button">?</button>
        `;

        this.markdownInput = this.shadowRoot.querySelector('.markdown-input');
        this.preview = this.shadowRoot.querySelector('.preview');

        this.markdownInput.addEventListener('input', () => {
            this.updatePreview();
        });

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

        this.updatePreview();
    }

    updatePreview() {
        this.preview.innerHTML = marked(this.markdownInput.value);
    }
}

customElements.define('markdown-editor', MarkdownEditor);