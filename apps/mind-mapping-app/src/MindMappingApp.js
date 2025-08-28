class Node {
    constructor(x, y, text = 'New Node', shape = 'rectangle') {
        this.x = x;
        this.y = y;
        this.text = text;
        this.width = 150;
        this.height = 50;
        this.color = '#f0f0f0';
        this.fontSize = 16;
        this.shape = shape;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        switch (this.shape) {
            case 'rectangle':
                ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 'ellipse':
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
                ctx.fill();
                break;
        }
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class MindMappingApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .mind-map-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .controls {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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
            <div class="mind-map-container">
                <div class="controls">
                    <label for="color">Node Color:</label>
                    <input type="color" id="color" value="#f0f0f0">
                    <label for="font-size">Font Size:</label>
                    <input type="range" id="font-size" min="10" max="30" value="16">
                    <button id="add-rect">Add Rectangle</button>
                    <button id="add-circle">Add Circle</button>
                    <button id="add-ellipse">Add Ellipse</button>
                </div>
                <canvas></canvas>
            </div>
            <button class="help-button">?</button>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <h2>Mind Mapping App Help</h2>
                    <p>This is a simple mind mapping application.</p>
                    <ul>
                        <li>Double-click on the canvas to create a new node.</li>
                        <li>Drag nodes to move them around.</li>
                        <li>Hold Shift and click on two nodes to connect them.</li>
                        <li>Double-click on a node to edit its text.</li>
                        <li>Use the color picker and font size slider to style the selected node.</li>
                        <li>Use the shape buttons to add different shapes.</li>
                        <li>Right-click and drag to pan the canvas.</li>
                        <li>Use the mouse wheel to zoom in and out.</li>
                    </ul>
                </div>
            </div>
        `;

        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.panX = 0;
        this.panY = 0;
        this.zoom = 1;

        this.trackTransforms(this.ctx);

        this.colorInput = this.shadowRoot.querySelector('#color');
        this.fontSizeInput = this.shadowRoot.querySelector('#font-size');

        this.colorInput.addEventListener('input', () => {
            if (this.selectedNode) {
                this.selectedNode.color = this.colorInput.value;
                this.draw();
            }
        });

        this.fontSizeInput.addEventListener('input', () => {
            if (this.selectedNode) {
                this.selectedNode.fontSize = this.fontSizeInput.value;
                this.draw();
                this.saveToLocalStorage();
            }
        });

        this.shadowRoot.querySelector('#add-rect').addEventListener('click', () => {
            this.createNode(this.canvas.width / 2, this.canvas.height / 2, 'rectangle');
        });

        this.shadowRoot.querySelector('#add-circle').addEventListener('click', () => {
            this.createNode(this.canvas.width / 2, this.canvas.height / 2, 'circle');
        });

        this.shadowRoot.querySelector('#add-ellipse').addEventListener('click', () => {
            this.createNode(this.canvas.width / 2, this.canvas.height / 2, 'ellipse');
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

        this.loadFromLocalStorage();

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        this.canvas.addEventListener('dblclick', (e) => {
            const clickedNode = this.getNodeAt(e.offsetX, e.offsetY);
            if (clickedNode) {
                this.editNodeText(clickedNode);
            } else {
                this.createNode(e.offsetX, e.offsetY);
            }
        });

        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // Right mouse button
                this.isPanning = true;
                this.lastPanX = e.clientX;
                this.lastPanY = e.clientY;
            } else if (e.shiftKey) {
                const clickedNode = this.getNodeAt(e.offsetX, e.offsetY);
                if (clickedNode) {
                    if (this.selectedForConnection) {
                        this.createConnection(this.selectedForConnection, clickedNode);
                        this.selectedForConnection = null;
                    } else {
                        this.selectedForConnection = clickedNode;
                    }
                }
            } else {
                this.selectedNode = this.getNodeAt(e.offsetX, e.offsetY);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isPanning) {
                const dx = e.clientX - this.lastPanX;
                const dy = e.clientY - this.lastPanY;
                this.panX += dx;
                this.panY += dy;
                this.lastPanX = e.clientX;
                this.lastPanY = e.clientY;
                this.draw();
            } else if (this.selectedNode) {
                this.selectedNode.x = e.offsetX - this.panX;
                this.selectedNode.y = e.offsetY - this.panY;
                this.draw();
                this.saveToLocalStorage();
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (e.button === 2) {
                this.isPanning = false;
            }
            this.selectedNode = null;
        });

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomIntensity = 0.1;
            const wheel = e.deltaY < 0 ? 1 : -1;
            const zoom = Math.exp(wheel * zoomIntensity);
            const pt = this.ctx.transformedPoint(e.offsetX, e.offsetY);
            
            this.ctx.translate(pt.x, pt.y);
            this.ctx.scale(zoom, zoom);
            this.ctx.translate(-pt.x, -pt.y);
            
            this.draw();
        });
    }

    getNodeAt(x, y) {
        return this.nodes.find(node => {
            return x >= node.x - node.width / 2 &&
                   x <= node.x + node.width / 2 &&
                   y >= node.y - node.height / 2 &&
                   y <= node.y + node.height / 2;
        });
    }

    editNodeText(node) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = node.text;
        input.style.position = 'absolute';
        input.style.left = `${node.x - node.width / 2}px`;
        input.style.top = `${node.y - node.height / 2}px`;
        input.style.width = `${node.width}px`;
        input.style.height = `${node.height}px`;
        input.style.textAlign = 'center';
        input.style.border = 'none';
        input.style.padding = '0';
        input.style.margin = '0';
        input.style.fontSize = '16px';

        this.shadowRoot.appendChild(input);
        input.focus();

        input.addEventListener('blur', () => {
            node.text = input.value;
            this.shadowRoot.removeChild(input);
            this.draw();
            this.saveToLocalStorage();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }

    saveToLocalStorage() {
        const data = {
            nodes: this.nodes,
            connections: this.connections.map(conn => ({
                from: this.nodes.indexOf(conn.from),
                to: this.nodes.indexOf(conn.to)
            }))
        };
        localStorage.setItem('mind-map', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('mind-map'));
        if (data) {
            this.nodes = data.nodes.map(nodeData => {
                const node = new Node(nodeData.x, nodeData.y, nodeData.text, nodeData.shape);
                node.width = nodeData.width;
                node.height = nodeData.height;
                node.color = nodeData.color;
                node.fontSize = nodeData.fontSize;
                return node;
            });
            this.connections = data.connections.map(connData => ({
                from: this.nodes[connData.from],
                to: this.nodes[connData.to]
            }));
            this.draw();
        }
    }

    createNode(x, y, shape = 'rectangle') {
        const node = new Node(x, y, 'New Node', shape);
        this.nodes.push(node);
        this.draw();
        this.saveToLocalStorage();
    }

    createConnection(node1, node2) {
        this.connections.push({ from: node1, to: node2 });
        this.draw();
        this.saveToLocalStorage();
    }

    resizeCanvas() {
        this.canvas.width = this.offsetWidth;
        this.canvas.height = this.offsetHeight;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.panX, this.panY);
        this.ctx.scale(this.zoom, this.zoom);
        
        // Draw connections
        this.ctx.strokeStyle = '#000';
        this.connections.forEach(conn => {
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.stroke();
        });

        // Draw nodes
        this.nodes.forEach(node => node.draw(this.ctx));

        this.ctx.restore();
    }

    trackTransforms(ctx) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        let xform = svg.createSVGMatrix();
        ctx.getTransform = () => xform;

        const savedTransforms = [];
        const save = ctx.save;
        ctx.save = () => {
            savedTransforms.push(xform.translate(0, 0));
            return save.call(ctx);
        };
        const restore = ctx.restore;
        ctx.restore = () => {
            xform = savedTransforms.pop();
            return restore.call(ctx);
        };

        const scale = ctx.scale;
        ctx.scale = (sx, sy) => {
            xform = xform.scaleNonUniform(sx, sy);
            return scale.call(ctx, sx, sy);
        };
        const rotate = ctx.rotate;
        ctx.rotate = (radians) => {
            xform = xform.rotate(radians * 180 / Math.PI);
            return rotate.call(ctx, radians);
        };
        const translate = ctx.translate;
        ctx.translate = (dx, dy) => {
            xform = xform.translate(dx, dy);
            return translate.call(ctx, dx, dy);
        };
        const transform = ctx.transform;
        ctx.transform = (a, b, c, d, e, f) => {
            const m2 = svg.createSVGMatrix();
            m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
            xform = xform.multiply(m2);
            return transform.call(ctx, a, b, c, d, e, f);
        };
        const setTransform = ctx.setTransform;
        ctx.setTransform = (a, b, c, d, e, f) => {
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(ctx, a, b, c, d, e, f);
        };
        const pt = svg.createSVGPoint();
        ctx.transformedPoint = (x, y) => {
            pt.x = x; pt.y = y;
            return pt.matrixTransform(xform.inverse());
        }
    }
}

customElements.define('mind-mapping-app', MindMappingApp);