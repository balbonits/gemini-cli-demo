import '../src/DrawingApp.js';

describe('DrawingApp', () => {
  let drawingApp;

  beforeEach(() => {
    drawingApp = document.createElement('drawing-app');
    document.body.appendChild(drawingApp);
  });

  afterEach(() => {
    document.body.removeChild(drawingApp);
  });

  test('should render correctly', () => {
    expect(drawingApp).toMatchSnapshot();
  });
});