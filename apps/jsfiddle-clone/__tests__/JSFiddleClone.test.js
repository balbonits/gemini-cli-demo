
import '../src/JSFiddleClone.js';

describe('JSFiddleClone', () => {
  let jsFiddleClone;

  beforeEach(async () => {
    document.body.innerHTML = '<jsfiddle-clone></jsfiddle-clone>';
    await customElements.whenDefined('jsfiddle-clone');
    jsFiddleClone = document.querySelector('jsfiddle-clone');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(jsFiddleClone).toMatchSnapshot();
  });

  test('should update output on HTML input', () => {
    const htmlInput = jsFiddleClone.shadowRoot.querySelector('.html');
    const output = jsFiddleClone.shadowRoot.querySelector('.output');

    htmlInput.value = '<h1>Hello</h1>';
    htmlInput.dispatchEvent(new Event('input'));

    expect(output.srcdoc).toContain('<h1>Hello</h1>');
  });

  test('should update output on CSS input', () => {
    const cssInput = jsFiddleClone.shadowRoot.querySelector('.css');
    const output = jsFiddleClone.shadowRoot.querySelector('.output');

    cssInput.value = 'h1 { color: red; }';
    cssInput.dispatchEvent(new Event('input'));

    expect(output.srcdoc).toContain('h1 { color: red; }');
  });

  test('should update output on JavaScript input', () => {
    const jsInput = jsFiddleClone.shadowRoot.querySelector('.js');
    const output = jsFiddleClone.shadowRoot.querySelector('.output');

    jsInput.value = 'console.log("Hello");';
    jsInput.dispatchEvent(new Event('input'));

    expect(output.srcdoc).toContain('console.log("Hello");');
  });

  test('should clear inputs and output on reset', () => {
    const htmlInput = jsFiddleClone.shadowRoot.querySelector('.html');
    const cssInput = jsFiddleClone.shadowRoot.querySelector('.css');
    const jsInput = jsFiddleClone.shadowRoot.querySelector('.js');
    const output = jsFiddleClone.shadowRoot.querySelector('.output');
    const resetButton = jsFiddleClone.shadowRoot.querySelector('#reset-app');

    htmlInput.value = '<h1>Hello</h1>';
    cssInput.value = 'h1 { color: red; }';
    jsInput.value = 'console.log("Hello");';
    jsFiddleClone.updateOutput(); // Manually trigger update after setting values

    resetButton.click();

    expect(htmlInput.value).toBe('');
    expect(cssInput.value).toBe('');
    expect(jsInput.value).toBe('');
    expect(output.srcdoc).not.toContain('<h1>Hello</h1>');
    expect(output.srcdoc).not.toContain('h1 { color: red; }');
    expect(output.srcdoc).not.toContain('console.log("Hello");');
  });

  test('should show and hide the help modal', () => {
    const helpButton = jsFiddleClone.shadowRoot.querySelector('.help-button');
    const closeButton = jsFiddleClone.shadowRoot.querySelector('.close-button');
    const helpModal = jsFiddleClone.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = jsFiddleClone.shadowRoot.querySelector('.fullscreen-button');
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
