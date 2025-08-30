class Node {
    static DEFAULT_WIDTH = 150;
    static DEFAULT_HEIGHT = 50;
    static DEFAULT_FONT_SIZE = 16;

    constructor(x, y, text = 'New Node', shape = 'rectangle') {
        this.x = x;
        this.y = y;
        this.text = text;
        this.width = Node.DEFAULT_WIDTH;
        this.height = Node.DEFAULT_HEIGHT;
        this.color = '#f0f0f0';
        this.fontSize = Node.DEFAULT_FONT_SIZE;
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
    static DEFAULT_NODE_WIDTH = 150;
    static DEFAULT_NODE_HEIGHT = 50;
    static DEFAULT_FONT_SIZE = 16;
    static MIN_FONT_SIZE = 10;
    static MAX_FONT_SIZE = 30;
    static ZOOM_INTENSITY = 0.1;
    static LOCAL_STORAGE_KEY = 'mind-map';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                }
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
                    z-index: 1;
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
            <div class="mind-map-container">
                <div class="controls">
                    <label for="color">Node Color:</label>
                    <input type="color" id="color" value="#f0f0f0">
                    <label for="font-size">Font Size:</label>
                    <input type="range" id="font-size" min="${MindMappingApp.MIN_FONT_SIZE}" max="${MindMappingApp.MAX_FONT_SIZE}" value="${MindMappingApp.DEFAULT_FONT_SIZE}">
                    <button id="add-rect">Add Rectangle</button>
                    <button id="add-circle">Add Circle</button>
                    <button id="add-ellipse">Add Ellipse</button>
                    <button id="reset-app">Reset</button>
                    <button id="zoom-in">Zoom In</button>
                    <button id="zoom-out">Zoom Out</button>
                </div>
                <canvas></canvas>
            </div>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <button class="fullscreen-button">&#x26F6;</button>
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
            <button class="help-button">?</button>
        `;

        this.canvas = this.shadowRoot.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.panX = 0;
        this.panY = 0;
        this.zoom = 1;
        this.isEditing = false;

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        // Mock Node for testing purposes
        if (window.jestMockNode) {
            this.Node = window.jestMockNode;
        } else {
            this.Node = Node;
        }

        this.trackTransforms(this.ctx);

        this.addControlListeners();

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
                this.isDragging = false;
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
            } else if (this.selectedNode && !this.isEditing) {
                this.isDragging = true;
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
            if (!this.isDragging) {
                // Don't deselect if we just clicked
            } else {
                this.selectedNode = null;
            }
            this.isDragging = false;
        });

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomIntensity = MindMappingApp.ZOOM_INTENSITY;
            const wheel = e.deltaY < 0 ? 1 : -1;
            const zoom = Math.exp(wheel * zoomIntensity);
            const pt = this.ctx.transformedPoint(e.offsetX, e.offsetY);
            
            this.ctx.translate(pt.x, pt.y);
            this.ctx.scale(zoom, zoom);
            this.ctx.translate(-pt.x, -pt.y);
            
            this.draw();
        });
    }

    addControlListeners() {
        const controls = this.shadowRoot.querySelector('.controls');
        controls.addEventListener('click', (e) => {
            switch (e.target.id) {
                case 'add-rect': {
                    this.createNode(this.canvas.width / 2, this.canvas.height / 2, 'rectangle');
                    break;
                }
                case 'add-circle': {
                    this.createNode(this.canvas.width / 2, this.canvas.height / 2, 'circle');
                    break;
                }
                case 'add-ellipse': {
                    this.createNode(this.canvas.width / 2, this.canvas.height / 2, 'ellipse');
                    break;
                }
                case 'reset-app': {
                    this.resetApp();
                    break;
                }
                case 'zoom-in': {
                    const zoomInIntensity = MindMappingApp.ZOOM_INTENSITY;
                    const zoomIn = Math.exp(1 * zoomInIntensity);
                    const ptIn = this.ctx.transformedPoint(this.canvas.width / 2, this.canvas.height / 2);
                    this.ctx.translate(ptIn.x, ptIn.y);
                    this.ctx.scale(zoomIn, zoomIn);
                    this.ctx.translate(-ptIn.x, -ptIn.y);
                    this.draw();
                    break;
                }
                case 'zoom-out': {
                    const zoomOutIntensity = MindMappingApp.ZOOM_INTENSITY;
                    const zoomOut = Math.exp(-1 * zoomOutIntensity);
                    const ptOut = this.ctx.transformedPoint(this.canvas.width / 2, this.canvas.height / 2);
                    this.ctx.translate(ptOut.x, ptOut.y);
                    this.ctx.scale(zoomOut, zoomOut);
                    this.ctx.translate(-ptOut.x, -ptOut.y);
                    this.draw();
                    break;
                }
            }
        });

        controls.addEventListener('input', (e) => {
            if (e.target.id === 'color') {
                if (this.selectedNode) {
                    this.selectedNode.color = e.target.value;
                    this.draw();
                }
            } else if (e.target.id === 'font-size') {
                if (this.selectedNode) {
                    this.selectedNode.fontSize = e.target.value;
                    this.draw();
                    this.saveToLocalStorage();
                }
            }
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
        if (this.isEditing) return;
        this.isEditing = true;

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
            this.isEditing = false;
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
        localStorage.setItem(MindMappingApp.LOCAL_STORAGE_KEY, JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const storedData = localStorage.getItem(MindMappingApp.LOCAL_STORAGE_KEY);
        if (storedData) {
            const data = JSON.parse(storedData);
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

    resetApp() {
        this.nodes = [];
        this.connections = [];
        localStorage.removeItem(MindMappingApp.LOCAL_STORAGE_KEY);
        this.panX = 0;
        this.panY = 0;
        this.zoom = 1;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.draw();
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