import '../src/MarkdownEditor.js';

describe('MarkdownEditor', () => {
  let markdownEditor;

  beforeEach(() => {
    markdownEditor = document.createElement('markdown-editor');
    document.body.appendChild(markdownEditor);
  });

  afterEach(() => {
    document.body.removeChild(markdownEditor);
  });

  test('should render correctly', () => {
    expect(markdownEditor).toMatchSnapshot();
  });
});