
import '../src/MarkdownEditor.js';
import { marked } from 'marked';

jest.mock('marked');

describe('MarkdownEditor', () => {
  let markdownEditor;

  beforeEach(async () => {
    document.body.innerHTML = '<markdown-editor></markdown-editor>';
    await customElements.whenDefined('markdown-editor');
    markdownEditor = document.querySelector('markdown-editor');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(markdownEditor).toMatchSnapshot();
  });

  test('should update preview on input', () => {
    const textarea = markdownEditor.shadowRoot.querySelector('textarea');
    const preview = markdownEditor.shadowRoot.querySelector('.preview');

    textarea.value = '# Hello';
    textarea.dispatchEvent(new Event('input'));

    expect(preview.innerHTML).toContain('<h1 id="hello">Hello</h1>');
  });

  test('should reset the editor', () => {
    const textarea = markdownEditor.shadowRoot.querySelector('textarea');
    const preview = markdownEditor.shadowRoot.querySelector('.preview');
    const resetButton = markdownEditor.shadowRoot.querySelector('#reset-app');

    textarea.value = '# Hello';
    textarea.dispatchEvent(new Event('input'));

    resetButton.click();

    expect(textarea.value).toBe('');
    expect(preview.innerHTML).toBe('');
  });

  test('should show and hide the help modal', () => {
    const helpButton = markdownEditor.shadowRoot.querySelector('.help-button');
    const closeButton = markdownEditor.shadowRoot.querySelector('.close-button');
    const helpModal = markdownEditor.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = markdownEditor.shadowRoot.querySelector('.fullscreen-button');
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
