
import '../src/WeatherApp.js';

describe('WeatherApp', () => {
  let weatherApp;

  beforeEach(async () => {
    document.body.innerHTML = '<weather-app></weather-app>';
    await customElements.whenDefined('weather-app');
    weatherApp = document.querySelector('weather-app');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  const waitForShadowElement = (shadowRoot, selector) => {
    return new Promise(resolve => {
      const observer = new MutationObserver(() => {
        if (shadowRoot.querySelector(selector)) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(shadowRoot, { childList: true, subtree: true });
      if (shadowRoot.querySelector(selector)) {
        resolve();
      }
    });
  };

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(weatherApp).toMatchSnapshot();
  });

  test('should fetch and display weather data', async () => {
    const mockWeatherData = {
      current_weather: {
        temperature: 25,
        weathercode: 2,
      },
      current: {
        temperature_2m: 25,
        weather_code: 2,
      },
      daily: {
        temperature_2m_max: [28, 27, 26],
        temperature_2m_min: [18, 17, 16],
        weather_code: [0, 1, 2],
        time: ['2025-08-29', '2025-08-30', '2025-08-31'],
      },
    };

    global.fetch = jest.fn((url) => {
      if (url.includes('geocoding')) {
        return Promise.resolve({
          json: () => Promise.resolve({ results: [{ latitude: 0, longitude: 0 }] }),
        });
      } else {
        return Promise.resolve({
          json: () => Promise.resolve(mockWeatherData),
        });
      }
    });

    // Set input value and click button
    weatherApp.shadowRoot.querySelector('input').value = 'London';
    weatherApp.shadowRoot.querySelector('button').click();

    // Wait for the element to appear in the DOM
    await waitForShadowElement(weatherApp.shadowRoot, '.weather-info h2');
  });

  test('should handle error when fetching weather data', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    );

    // Set input value and click button
    weatherApp.shadowRoot.querySelector('input').value = 'London';
    weatherApp.shadowRoot.querySelector('button').click();

    // Wait for the element to appear in the DOM
    await waitForShadowElement(weatherApp.shadowRoot, '.weather-info');
  });

  test('should show and hide the help modal', () => {
    const helpButton = weatherApp.shadowRoot.querySelector('.help-button');
    const closeButton = weatherApp.shadowRoot.querySelector('.close-button');
    const helpModal = weatherApp.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = weatherApp.shadowRoot.querySelector('.fullscreen-button');
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

  test('should return correct weather description', () => {
    expect(weatherApp.getWeatherDescription(0)).toBe('Clear sky');
    expect(weatherApp.getWeatherDescription(2)).toBe('Partly cloudy');
    expect(weatherApp.getWeatherDescription(999)).toBe('Unknown');
  });

  test('should reset the app', () => {
    weatherApp.shadowRoot.querySelector('input').value = 'London';
    weatherApp.shadowRoot.querySelector('.weather-info').innerHTML = '<h2>London</h2>';
    weatherApp.shadowRoot.querySelector('#reset-app').click();
    expect(weatherApp.shadowRoot.querySelector('input').value).toBe('');
    expect(weatherApp.shadowRoot.querySelector('.weather-info').innerHTML).toBe('');
  });
});
