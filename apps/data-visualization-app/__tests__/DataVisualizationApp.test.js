import '../src/DataVisualizationApp.js';
import { Chart } from 'chart.js';

jest.mock('chart.js');

describe('DataVisualizationApp', () => {
  let dataVisualizationApp;

  beforeEach(() => {
    Chart.mockClear();
    dataVisualizationApp = document.createElement('data-visualization-app');
    document.body.appendChild(dataVisualizationApp);
  });

  afterEach(() => {
    document.body.removeChild(dataVisualizationApp);
  });

  test('should render correctly', () => {
    expect(dataVisualizationApp).toMatchSnapshot();
  });

  test('should render chart on initialization', () => {
    expect(Chart).toHaveBeenCalledTimes(1);
    expect(Chart).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
  });

  test('should destroy and re-render chart on reset', () => {
    const resetButton = dataVisualizationApp.shadowRoot.querySelector('#reset-app');
    resetButton.click();
    expect(Chart.mock.results[0].value.destroy).toHaveBeenCalledTimes(2);
    expect(Chart).toHaveBeenCalledTimes(2);
  });

  test('should show and hide the help modal', () => {
    const helpButton = dataVisualizationApp.shadowRoot.querySelector('.help-button');
    const closeButton = dataVisualizationApp.shadowRoot.querySelector('.close-button');
    const helpModal = dataVisualizationApp.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = dataVisualizationApp.shadowRoot.querySelector('.fullscreen-button');
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