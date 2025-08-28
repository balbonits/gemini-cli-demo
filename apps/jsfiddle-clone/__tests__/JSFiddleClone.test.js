import '../src/JSFiddleClone.js';

describe('JSFiddleClone', () => {
  let jsFiddleClone;

  beforeEach(() => {
    jsFiddleClone = document.createElement('jsfiddle-clone');
    document.body.appendChild(jsFiddleClone);
  });

  afterEach(() => {
    document.body.removeChild(jsFiddleClone);
  });

  test('should render correctly', () => {
    expect(jsFiddleClone).toMatchSnapshot();
  });
});