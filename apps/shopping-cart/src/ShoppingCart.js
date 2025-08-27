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
            </style>
            <div class="shopping-cart-container">
                <div class="product-list"></div>
                <div class="cart">
                    <h2>Shopping Cart</h2>
                    <ul class="cart-items"></ul>
                    <p>Total: <span class="total">0</span></p>
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