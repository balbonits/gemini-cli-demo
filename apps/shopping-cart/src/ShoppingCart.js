class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.products = [
            { id: 1, name: 'Product 1', price: 10 },
            { id: 2, name: 'Product 2', price: 20 },
            { id: 3, name: 'Product 3', price: 30 },
            { id: 4, name: 'Product 4', price: 40 },
        ];
        this.cart = [];

        this.shadowRoot.innerHTML = `
            <style>
                .shopping-cart-container {
                    display: flex;
                }
                .product-list {
                    width: 70%;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1rem;
                }
                .product {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    text-align: center;
                }
                .cart {
                    width: 30%;
                    border: 1px solid #ccc;
                    padding: 1rem;
                }
                @media (max-width: 768px) {
                    .shopping-cart-container {
                        flex-direction: column;
                    }
                    .product-list, .cart {
                        width: 100%;
                    }
                }
                .help-button {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 1.2rem;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }
                .help-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .help-modal-content {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 5px;
                    max-width: 500px;
                    position: relative;
                }
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .fullscreen-button {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
            </style>
            <div class="shopping-cart-container">
                <div class="product-list"></div>
                <div class="cart">
                    <h2>Shopping Cart</h2>
                    <ul class="cart-items"></ul>
                    <p>Total: <span class="total">0</span></p>
                </div>
            </div>
            <button class="help-button">?</button>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <button class="fullscreen-button">&#x26F6;</button>
                    <h2>Shopping Cart Help</h2>
                    <p>This is a simple shopping cart application.</p>
                    <ul>
                        <li>Drag and drop products from the product list to the shopping cart.</li>
                        <li>The cart total will update automatically.</li>
                    </ul>
                </div>
            </div>
        `;

        this.productList = this.shadowRoot.querySelector('.product-list');
        this.cartItems = this.shadowRoot.querySelector('.cart-items');
        this.total = this.shadowRoot.querySelector('.total');

        this.renderProducts();
        this.renderCart();

        this.productList.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.id);
        });

        const cartElement = this.shadowRoot.querySelector('.cart');
        cartElement.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        cartElement.addEventListener('drop', (e) => {
            e.preventDefault();
            const productId = e.dataTransfer.getData('text/plain');
            this.addToCart(parseInt(productId));
        });

        this.helpButton = this.shadowRoot.querySelector('.help-button');
        this.helpModal = this.shadowRoot.querySelector('.help-modal');
        this.closeButton = this.shadowRoot.querySelector('.close-button');

        this.helpButton.addEventListener('click', () => {
            this.helpModal.style.display = 'flex';
        });

        this.closeButton.addEventListener('click', () => {
            this.helpModal.style.display = 'none';
        });

        this.fullscreenButton = this.shadowRoot.querySelector('.fullscreen-button');
        this.fullscreenButton.addEventListener('click', () => {
            const iframe = window.frameElement;
            if (iframe) {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.mozRequestFullScreen) { /* Firefox */
                    iframe.mozRequestFullScreen();
                } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) { /* IE/Edge */
                    iframe.msRequestFullscreen();
                }
            }
        });
    }

    renderProducts() {
        this.products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.setAttribute('draggable', true);
            productElement.dataset.id = product.id;
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            `;
            this.productList.appendChild(productElement);
        });
    }

    renderCart() {
        this.cartItems.innerHTML = '';
        let total = 0;
        this.cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            this.cartItems.appendChild(li);
            total += item.price;
        });
        this.total.textContent = `$${total}`;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.cart.push(product);
            this.renderCart();
        }
    }
}

customElements.define('shopping-cart', ShoppingCart);