import { cartTotalReducerFunction, getLocalStorage } from './utils.mjs';
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.Quantity,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
    if (this.cartItems.length === 0) {
      window.location.replace('/');
    }
    this.subtotal = this.calculateSubtotal();
    this.orderTotal = 0;
    this.tax = 0;
    this.shipping = 0;
  }

  init() {
    this.renderSubtotal();
  }

  renderSubtotal() {
    document.getElementById('subtotal').innerText = `$${this.subtotal.toFixed(2)}`;
  }

  calculateAndRenderSummary() {
    this.tax = this.calculateTax();
    this.shipping = this.calculateShipping();
    this.orderTotal = this.calculateOrderTotal();

    document.getElementById('tax').innerText = `$${this.tax.toFixed(2)}`;
    document.getElementById('shipping-estimate').innerText = `$${this.shipping.toFixed(2)}`;
    document.getElementById('order-total').innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  calculateSubtotal() {
    return parseFloat(this.cartItems.reduce(cartTotalReducerFunction, 0).toFixed(2));
  }

  calculateTax() {
    const taxRate = 0.06;
    return parseFloat((this.subtotal * taxRate).toFixed(2));
  }

  calculateShipping() {
    const cartItemsAmount = this.cartItems.reduce((acc, item) => acc + item.Quantity, 0);
    let shipping = 10;
    if (cartItemsAmount > 1) {
      shipping += 2 * (cartItemsAmount - 1);
    }
    return parseFloat(shipping.toFixed(2));
  }

  calculateOrderTotal() {
    const orderTotal = this.subtotal + this.tax + this.shipping;
    return parseFloat(orderTotal.toFixed(2));
  }

  async checkout() {
    const formElement = document.forms["checkout-form"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.cartItems);

    try {
      const response = await services.checkout(order);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
}
