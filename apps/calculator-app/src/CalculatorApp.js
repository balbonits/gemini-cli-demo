class CalculatorApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .calculator {
                    width: 100%;
                    max-width: 300px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .display {
                    background-color: #222;
                    color: white;
                    font-size: 2rem;
                    padding: 1rem;
                    text-align: right;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
                .buttons {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                }
                button {
                    height: 60px;
                    font-size: 1.5rem;
                    border: 1px solid #ccc;
                    background-color: #f0f0f0;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #ddd;
                }
                .operator {
                    background-color: #f9a825;
                    color: white;
                }
                @media (max-width: 400px) {
                    .calculator {
                        max-width: 100%;
                        border-radius: 0;
                        box-shadow: none;
                        border: none;
                    }
                    button {
                        font-size: 1.2rem;
                        height: 50px;
                    }
                    .display {
                        font-size: 1.5rem;
                    }
                }
                .help-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
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
                }
                .help-modal-content {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 5px;
                    max-width: 500px;
                }
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
            </style>
            <div class="calculator">
                <div class="display">0</div>
                <div class="buttons">
                    <button class="clear">C</button>
                    <button class="sign">+/</button>
                    <button class="percent">%</button>
                    <button class="operator divide">/</button>
                    <button class="digit">7</button>
                    <button class="digit">8</button>
                    <button class="digit">9</button>
                    <button class="operator multiply">*</button>
                    <button class="digit">4</button>
                    <button class="digit">5</button>
                    <button class="digit">6</button>
                    <button class="operator subtract">-</button>
                    <button class="digit">1</button>
                    <button class="digit">2</button>
                    <button class="digit">3</button>
                    <button class="operator add">+</button>
                    <button class="digit zero">0</button>
                    <button class="decimal">.</button>
                    <button class="equals">=</button>
                </div>
            </div>
            <button class="help-button">?</button>
            <div class="help-modal" style="display: none;">
                <div class="help-modal-content">
                    <span class="close-button">&times;</span>
                    <h2>Calculator Help</h2>
                    <p>This is a simple calculator app.</p>
                    <ul>
                        <li>Click the number buttons to input numbers.</li>
                        <li>Click the operator buttons to perform calculations.</li>
                        <li>Click the 'C' button to clear the display.</li>
                        <li>Click the '= ' button to see the result.</li>
                    </ul>
                </div>
            </div>
        `;

        this.display = this.shadowRoot.querySelector('.display');
        this.buttons = this.shadowRoot.querySelector('.buttons');
        this.buttons.addEventListener('click', this.handleButtonClick.bind(this));

        this.helpButton = this.shadowRoot.querySelector('.help-button');
        this.helpModal = this.shadowRoot.querySelector('.help-modal');
        this.closeButton = this.shadowRoot.querySelector('.close-button');

        this.helpButton.addEventListener('click', () => {
            this.helpModal.style.display = 'flex';
        });

        this.closeButton.addEventListener('click', () => {
            this.helpModal.style.display = 'none';
        });

        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
    }

    handleButtonClick(event) {
        const target = event.target;
        const action = target.classList[0];
        const value = target.textContent;

        switch (action) {
            case 'digit':
                this.appendDigit(value);
                break;
            case 'decimal':
                this.appendDecimal();
                break;
            case 'operator':
                this.setOperator(value);
                break;
            case 'clear':
                this.clear();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'sign':
                this.toggleSign();
                break;
            case 'percent':
                this.percentage();
                break;
        }
        this.updateDisplay();
    }

    appendDigit(digit) {
        if (this.currentValue === '0') {
            this.currentValue = digit;
        } else {
            this.currentValue += digit;
        }
    }

    appendDecimal() {
        if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
    }

    setOperator(operator) {
        if (this.operator !== null) {
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.currentValue = '0';
        this.operator = operator;
    }

    calculate() {
        if (this.operator === null || this.previousValue === null) {
            return;
        }
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result = 0;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
        }
        this.currentValue = result.toString();
        this.operator = null;
        this.previousValue = null;
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = null;
        this.operator = null;
    }

    toggleSign() {
        this.currentValue = (parseFloat(this.currentValue) * -1).toString();
    }
    
    percentage() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
    }

    updateDisplay() {
        this.display.textContent = this.currentValue;
    }
}

customElements.define('calculator-app', CalculatorApp);