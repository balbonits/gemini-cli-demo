export const marked = jest.fn((markdown) => {
  if (markdown === '# Hello') {
    return '<h1 id="hello">Hello</h1>';
  }
  return markdown;
});