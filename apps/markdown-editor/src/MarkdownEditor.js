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
            </style>
            <div class="editor-container">
                <textarea class="markdown-input"></textarea>
                <div class="preview"></div>
            </div>
        `;

        this.markdownInput = this.shadowRoot.querySelector('.markdown-input');
        this.preview = this.shadowRoot.querySelector('.preview');

        this.markdownInput.addEventListener('input', () => {
            this.updatePreview();
        });

        this.updatePreview();
    }

    updatePreview() {
        this.preview.innerHTML = marked(this.markdownInput.value);
    }
}

customElements.define('markdown-editor', MarkdownEditor);