import { cartTotalReducerFunction, getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    if (this.cartItems.length === 0) {
      window.location.replace('/');
    }
    this.subtotal = this.calculateSubtotal();
  }

  init() {
    this.renderSubtotal();
  }

  renderSubtotal() {
    document.getElementById('subtotal').innerText = `$${this.subtotal.toFixed(2)}`;
  }

  calculateAndRenderSummary() {
    const tax = this.calculateTax();
    const shippingEstimate = this.calculateShipping();
    const orderTotal = this.calculateOrderTotal(tax, shippingEstimate);

    document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('shipping-estimate').innerText = `$${shippingEstimate.toFixed(2)}`;
    document.getElementById('order-total').innerText = `$${orderTotal.toFixed(2)}`;
  }

  calculateSubtotal() {
    return this.cartItems.reduce(cartTotalReducerFunction, 0);
  }

  calculateTax() {
    const taxRate = 0.06;
    return this.subtotal * taxRate;
  }

  calculateShipping() {
    const cartItemsAmount = this.cartItems.length;
    let shippingEstimate = 10; // Base shipping cost
    if (cartItemsAmount > 1) {
      shippingEstimate += 2 * (cartItemsAmount - 1);
    }
    return shippingEstimate;
  }

  calculateOrderTotal(tax, shipping) {
    return this.subtotal + tax + shipping;
  }
}
