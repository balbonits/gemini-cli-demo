import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

class MarkdownEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
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
            <div class="editor-container">
                <textarea class="markdown-input"></textarea>
                <div class="preview"></div>
            </div>
            <button class="help-button">?</button>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <h2>Markdown Editor Help</h2>
                    <p>This is a simple markdown editor with a live preview.</p>
                    <ul>
                        <li>Type markdown syntax in the left panel.</li>
                        <li>See the rendered HTML in the right panel.</li>
                    </ul>
                </div>
            </div>
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

        this.updatePreview();
    }

    updatePreview() {
        this.preview.innerHTML = marked(this.markdownInput.value);
    }
}

customElements.define('markdown-editor', MarkdownEditor);