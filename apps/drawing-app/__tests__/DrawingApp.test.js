
import '../src/DrawingApp.js';

describe('DrawingApp', () => {
  let drawingApp;
  let mockCtx;

  beforeEach(async () => {
    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetWidth', { value: 100 });
    Object.defineProperty(HTMLCanvasElement.prototype, 'offsetHeight', { value: 100 });

    document.body.innerHTML = '<drawing-app></drawing-app>';
    await customElements.whenDefined('drawing-app');
    drawingApp = document.querySelector('drawing-app');

    // Mock the canvas context
    mockCtx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      canvas: {
        width: 100,
        height: 100,
      },
    };
    drawingApp.canvas.getContext = jest.fn(() => mockCtx);
    drawingApp.ctx = mockCtx;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(drawingApp).toMatchSnapshot();
  });

  test('should draw on canvas', () => {
    drawingApp.startDrawing({ offsetX: 10, offsetY: 10 });
    drawingApp.draw({ offsetX: 20, offsetY: 20 });
    drawingApp.stopDrawing();

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.moveTo).toHaveBeenCalledWith(10, 10);
    expect(mockCtx.lineTo).toHaveBeenCalledWith(20, 20);
    expect(mockCtx.stroke).toHaveBeenCalled();
  });

  test('should change color and brush size', () => {
    const colorInput = drawingApp.shadowRoot.querySelector('#color');
    const brushSizeInput = drawingApp.shadowRoot.querySelector('#brush-size');

    colorInput.value = '#FF0000';
    brushSizeInput.value = '10';

    const canvas = drawingApp.shadowRoot.querySelector('canvas');
    canvas.dispatchEvent(new MouseEvent('mousedown', { offsetX: 10, offsetY: 10, bubbles: true }));
    canvas.dispatchEvent(new MouseEvent('mousemove', { offsetX: 20, offsetY: 20, bubbles: true }));
    canvas.dispatchEvent(new MouseEvent('mouseup'));

    expect(mockCtx.strokeStyle).toBe('#ff0000');
    expect(mockCtx.lineWidth).toBe(10);
  });

  test('should clear canvas on reset', () => {
    const resetButton = drawingApp.shadowRoot.querySelector('#reset-app');
    resetButton.click();
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 100, 100);
  });

  test('should show and hide the help modal', () => {
    const helpButton = drawingApp.shadowRoot.querySelector('.help-button');
    const closeButton = drawingApp.shadowRoot.querySelector('.close-button');
    const helpModal = drawingApp.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = drawingApp.shadowRoot.querySelector('.fullscreen-button');
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
