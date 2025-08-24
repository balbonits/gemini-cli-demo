class DataVisualizationApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    height: auto;
                    max-height: 400px;
                }
            </style>
            <div class="chart-container">
                <canvas></canvas>
            </div>
        `;

        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

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