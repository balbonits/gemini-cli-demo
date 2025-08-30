
import '../src/ShoppingCart.js';

describe('ShoppingCart', () => {
  let shoppingCart;

  beforeEach(async () => {
    document.body.innerHTML = '<shopping-cart></shopping-cart>';
    await customElements.whenDefined('shopping-cart');
    shoppingCart = document.querySelector('shopping-cart');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should render correctly', () => {
    expect(shoppingCart).toMatchSnapshot();
  });

  test('should add item to cart on drop', () => {
    const productElement = shoppingCart.shadowRoot.querySelector('.product');
    const cartElement = shoppingCart.shadowRoot.querySelector('.cart');
    const totalElement = shoppingCart.shadowRoot.querySelector('.total');

    const dragEvent = new CustomEvent('dragstart', { bubbles: true, composed: true });
    dragEvent.dataTransfer = { setData: jest.fn() };
    productElement.dispatchEvent(dragEvent);

    expect(dragEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', '1');

    const dropEvent = new CustomEvent('drop', { bubbles: true, composed: true });
    dropEvent.dataTransfer = { getData: jest.fn(() => '1') };
    cartElement.dispatchEvent(dropEvent);

    expect(shoppingCart.cart.length).toBe(1);
    expect(shoppingCart.cart[0].name).toBe('Product 1');
    expect(totalElement.textContent).toBe('$10');
  });

  test('should reset the cart', () => {
    shoppingCart.addToCart(1);
    shoppingCart.addToCart(2);

    const resetButton = shoppingCart.shadowRoot.querySelector('#reset-app');
    const totalElement = shoppingCart.shadowRoot.querySelector('.total');

    resetButton.click();

    expect(shoppingCart.cart.length).toBe(0);
    expect(totalElement.textContent).toBe('$0');
  });

  test('should show and hide the help modal', () => {
    const helpButton = shoppingCart.shadowRoot.querySelector('.help-button');
    const closeButton = shoppingCart.shadowRoot.querySelector('.close-button');
    const helpModal = shoppingCart.shadowRoot.querySelector('.help-modal');

    helpButton.click();
    expect(helpModal.style.display).toBe('flex');

    closeButton.click();
    expect(helpModal.style.display).toBe('none');
  });

  test('should call requestFullscreen on the iframe', () => {
    const fullscreenButton = shoppingCart.shadowRoot.querySelector('.fullscreen-button');
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
