class DrawingApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .drawing-app {
                    border: 1px solid #ccc;
                }
                .controls {
                    padding: 0.5rem;
                }
            </style>
            <div class="drawing-app">
                <div class="controls">
                    <label for="color">Color:</label>
                    <input type="color" id="color" value="#000000">
                    <label for="brush-size">Brush Size:</label>
                    <input type="range" id="brush-size" min="1" max="20" value="5">
                </div>
                <canvas width="500" height="400"></canvas>
            </div>
        `;

        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.colorInput = this.shadowRoot.querySelector('#color');
        this.brushSizeInput = this.shadowRoot.querySelector('#brush-size');

        this.isDrawing = false;

        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.draw(e);
    }

    draw(e) {
        if (!this.isDrawing) return;
        this.ctx.lineWidth = this.brushSizeInput.value;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.colorInput.value;

        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
    }

    stopDrawing() {
        this.isDrawing = false;
        this.ctx.beginPath();
    }
}

customElements.define('drawing-app', DrawingApp);