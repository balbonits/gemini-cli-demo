import '../src/WeatherApp.js';

describe('WeatherApp', () => {
  let weatherApp;

  beforeEach(() => {
    weatherApp = document.createElement('weather-app');
    document.body.appendChild(weatherApp);
  });

  afterEach(() => {
    document.body.removeChild(weatherApp);
  });

  test('should render correctly', () => {
    expect(weatherApp).toMatchSnapshot();
  });
});