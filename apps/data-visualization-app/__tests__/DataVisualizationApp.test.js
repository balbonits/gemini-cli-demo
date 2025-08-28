import '../src/DataVisualizationApp.js';

describe('DataVisualizationApp', () => {
  let dataVisualizationApp;

  beforeEach(() => {
    dataVisualizationApp = document.createElement('data-visualization-app');
    document.body.appendChild(dataVisualizationApp);
  });

  afterEach(() => {
    document.body.removeChild(dataVisualizationApp);
  });

  test('should render correctly', () => {
    expect(dataVisualizationApp).toMatchSnapshot();
  });
});