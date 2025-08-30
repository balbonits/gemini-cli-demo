import '../src/MindMappingApp.js';

describe('MindMappingApp', () => {
  let mindMappingApp;
  let mockCtx;
  let MockNode;

  beforeEach(async () => {
    MockNode = jest.fn().mockImplementation((x, y, text, shape) => ({
      x,
      y,
      text,
      shape,
      width: 150,
      height: 50,
      color: '#f0f0f0',
      fontSize: 16,
      draw: jest.fn(),
    }));
    Object.defineProperty(window, 'Node', {
      writable: true,
      value: MockNode,
    });

    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetWidth', { value: 500 });
    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetHeight', { value: 500 });

    document.body.innerHTML = '<mind-mapping-app></mind-mapping-app>';
    await customElements.whenDefined('mind-mapping-app');
    mindMappingApp = document.querySelector('mind-mapping-app');

    // Mock the canvas context
    mockCtx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      arc: jest.fn(),
      ellipse: jest.fn(),
      fillText: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      setTransform: jest.fn(),
      getTransform: jest.fn(() => ({ inverse: jest.fn(() => ({ matrixTransform: jest.fn() })) })),
      transformedPoint: jest.fn((x, y) => ({ x, y })),
      canvas: {
        width: 500,
        height: 500,
      },
    };
    mindMappingApp.canvas.getContext = jest.fn(() => mockCtx);
    mindMappingApp.ctx = mockCtx;

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(mindMappingApp).toMatchSnapshot();
  });

  test('should create a new node on double click', () => {
    mindMappingApp.canvas.dispatchEvent(new MouseEvent('dblclick', { offsetX: 100, offsetY: 100, bubbles: true }));
    expect(mindMappingApp.nodes.length).toBe(1);
    expect(mindMappingApp.nodes[0].x).toBe(100);
    expect(mindMappingApp.nodes[0].y).toBe(100);
    expect(mockCtx.fillRect).toHaveBeenCalled();
  });

  test('should draw nodes correctly', () => {
    mindMappingApp.createNode(50, 50, 'Test Node', 'rectangle');
    mindMappingApp.createNode(150, 150, 'Test Circle', 'circle');
    mindMappingApp.createNode(250, 250, 'Test Ellipse', 'ellipse');
    mindMappingApp.draw();

    expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 25, 150, 50);
    expect(mockCtx.arc).toHaveBeenCalledWith(150, 150, 75, 0, 2 * Math.PI);
    expect(mockCtx.ellipse).toHaveBeenCalledWith(250, 250, 75, 25, 0, 0, 2 * Math.PI);
    expect(mockCtx.fillText).toHaveBeenCalledWith('Test Node', 50, 50);
    expect(mockCtx.fillText).toHaveBeenCalledWith('Test Circle', 150, 150);
    expect(mockCtx.fillText).toHaveBeenCalledWith('Test Ellipse', 250, 250);
  });

  test('should show and hide the help modal', () => {
    const helpButton = mindMappingApp.shadowRoot.querySelector('.help-button');
    const closeButton = mindMappingApp.shadowRoot.querySelector('.close-button');
    const helpModal = mindMappingApp.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = mindMappingApp.shadowRoot.querySelector('.fullscreen-button');
    const iframe = {
      requestFullscreen: jest.fn(),
      mozRequestFullScreen: jest.fn(),
      webkitRequestFullscreen: jest.fn(),
      msRequestFullscreen: jest.fn(),
    };

    Object.defineProperty(window, 'frameElement', {
      writable: true,
      value: iframe,
    });

    fullscreenButton.click();

    expect(iframe.requestFullscreen).toHaveBeenCalled();
  });
});