class DrawingApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                }
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
            <div class="drawing-app">
                <div class="controls">
                    <label for="color">Color:</label>
                    <input type="color" id="color" value="#000000">
                    <label for="brush-size">Brush Size:</label>
                    <input type="range" id="brush-size" min="1" max="20" value="5">
                    <button id="reset-app">Reset</button>
                </div>
                <canvas></canvas>
            </div>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <button class="fullscreen-button">&#x26F6;</button>
                    <h2>Drawing App Help</h2>
                    <p>This is a simple drawing application.</p>
                    <ul>
                        <li>Use the color picker to select a drawing color.</li>
                        <li>Use the brush size slider to adjust the brush thickness.</li>
                        <li>Click and drag on the canvas to draw.</li>
                    </ul>
                </div>
            </div>
            <button class="help-button">?</button>
        `;

        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.colorInput = this.shadowRoot.querySelector('#color');
        this.brushSizeInput = this.shadowRoot.querySelector('#brush-size');
        this.resetButton = this.shadowRoot.querySelector('#reset-app');

        this.isDrawing = false;

        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
        this.resetButton.addEventListener('click', this.resetApp.bind(this));

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

        this.ctx.lineWidth = Number(currentStroke.brushSize);
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

    resetApp() {
        this.strokes = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

customElements.define('drawing-app', DrawingApp);