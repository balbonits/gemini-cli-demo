class DataVisualizationApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    max-height: 400px;
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
            <div class="chart-container">
                <canvas></canvas>
            </div>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <button class="fullscreen-button">&#x26F6;</button>
                    <h2>Data Visualization Help</h2>
                    <p>This is a simple data visualization app that displays a line chart.</p>
                    <p>The chart data is hardcoded in the component.</p>
                </div>
            </div>
            <button class="help-button">?</button>
        `;

        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

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

        this.renderChart();
    }

    renderChart() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sample Data',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };

        new Chart(this.ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true
            }
        });
    }
}

customElements.define('data-visualization-app', DataVisualizationApp);