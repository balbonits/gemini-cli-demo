import '../src/ShoppingCart.js';

describe('ShoppingCart', () => {
  let shoppingCart;

  beforeEach(() => {
    shoppingCart = document.createElement('shopping-cart');
    document.body.appendChild(shoppingCart);
  });

  afterEach(() => {
    document.body.removeChild(shoppingCart);
  });

  test('should render correctly', () => {
    expect(shoppingCart).toMatchSnapshot();
  });
});