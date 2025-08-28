import '../src/CalculatorApp.js';

describe('CalculatorApp', () => {
  let calculatorApp;

  beforeEach(() => {
    calculatorApp = document.createElement('calculator-app');
    document.body.appendChild(calculatorApp);
  });

  afterEach(() => {
    document.body.removeChild(calculatorApp);
  });

  test('should render correctly', () => {
    expect(calculatorApp).toMatchSnapshot();
  });

  test('should display 0 initially', () => {
    expect(calculatorApp.shadowRoot.querySelector('.display').textContent).toBe('0');
  });
});