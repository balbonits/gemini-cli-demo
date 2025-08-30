
import '../src/CalculatorApp.js';

describe('CalculatorApp', () => {
  let calculatorApp;

  const getButtonByText = (app, text) => {
    const buttons = app.shadowRoot.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent === text) {
        return buttons[i];
      }
    }
    return null;
  };

  beforeEach(async () => {
    document.body.innerHTML = '<calculator-app></calculator-app>';
    await customElements.whenDefined('calculator-app');
    calculatorApp = document.querySelector('calculator-app');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(calculatorApp).toMatchSnapshot();
  });

  test('should display 0 initially', () => {
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('0');
  });

  test('should append digits to the display', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '8').click(); // Click 8
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('78');
  });

  test('should add decimal point', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '.').click();
    getButtonByText(calculatorApp, '8').click(); // Click 8
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('7.8');
  });

  test('should perform addition', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '+').click(); // Click +
    getButtonByText(calculatorApp, '8').click(); // Click 8
    getButtonByText(calculatorApp, '=').click(); // Click =
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('15');
  });

  test('should perform subtraction', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '-').click(); // Click -
    getButtonByText(calculatorApp, '8').click(); // Click 8
    getButtonByText(calculatorApp, '=').click(); // Click =
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('-1');
  });

  test('should perform multiplication', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '*').click(); // Click *
    getButtonByText(calculatorApp, '8').click(); // Click 8
    getButtonByText(calculatorApp, '=').click(); // Click =
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('56');
  });

  test('should perform division', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '/').click(); // Click /
    getButtonByText(calculatorApp, '8').click(); // Click 8
    getButtonByText(calculatorApp, '=').click(); // Click =
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('0.875');
  });

  test('should clear the display', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, 'AC').click(); // Click AC
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('0');
  });

  test('should toggle the sign', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '+/').click(); // Click +/-
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('-7');
  });

  test('should calculate percentage', () => {
    getButtonByText(calculatorApp, '7').click(); // Click 7
    getButtonByText(calculatorApp, '%').click(); // Click %
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('0.07');
  });

  test('should show and hide the help modal', () => {
    const helpButton = calculatorApp.shadowRoot.querySelector('.help-button');
    const closeButton = calculatorApp.shadowRoot.querySelector('.close-button');
    const helpModal = calculatorApp.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = calculatorApp.shadowRoot.querySelector('.fullscreen-button');
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
