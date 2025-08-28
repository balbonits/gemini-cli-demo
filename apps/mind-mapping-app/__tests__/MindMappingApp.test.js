import '../src/MindMappingApp.js';

describe('MindMappingApp', () => {
  let mindMappingApp;

  beforeEach(() => {
    mindMappingApp = document.createElement('mind-mapping-app');
    document.body.appendChild(mindMappingApp);
  });

  afterEach(() => {
    document.body.removeChild(mindMappingApp);
  });

  test('should render correctly', () => {
    expect(mindMappingApp).toMatchSnapshot();
  });
});