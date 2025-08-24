class DrawingApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .drawing-app {
                    border: 1px solid #ccc;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .controls {
                    padding: 0.5rem;
                }
                canvas {
                    flex-grow: 1;
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div class="drawing-app">
                <div class="controls">
                    <label for="color">Color:</label>
                    <input type="color" id="color" value="#000000">
                    <label for="brush-size">Brush Size:</label>
                    <input type="range" id="brush-size" min="1" max="20" value="5">
                </div>
                <canvas></canvas>
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

        this.strokes = [];
        this.resizeCanvas();
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.redraw();
        });
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.strokes.forEach(stroke => {
            this.ctx.beginPath();
            this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
            stroke.points.forEach(point => {
                this.ctx.lineWidth = stroke.brushSize;
                this.ctx.lineCap = 'round';
                this.ctx.strokeStyle = stroke.color;
                this.ctx.lineTo(point.x, point.y);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(point.x, point.y);
            });
        });
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.strokes.push({
            points: [],
            color: this.colorInput.value,
            brushSize: this.brushSizeInput.value
        });
        this.draw(e);
    }

    draw(e) {
        if (!this.isDrawing) return;
        const currentStroke = this.strokes[this.strokes.length - 1];
        currentStroke.points.push({ x: e.offsetX, y: e.offsetY });

        this.ctx.lineWidth = currentStroke.brushSize;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = currentStroke.color;

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