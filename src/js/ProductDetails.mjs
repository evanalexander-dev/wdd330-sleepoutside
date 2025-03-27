import { getLocalStorage, handleCartChange, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails("main");

    document.getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    const cartContent = getLocalStorage("so-cart") || [];
    // find product in cart using find()
    const productExists = cartContent.find(item => item.Id === this.productId);
    // Check if product exist
    if (productExists) {
      // Increase the Qty by 1
      productExists.Quantity += 1;
    } else {
      // add Qty attribute to the product array 
      this.product.Quantity = 1;
      cartContent.push(this.product);
    }
    setLocalStorage("so-cart", cartContent);
    handleCartChange();
  }
  renderProductDetails(selector) {
    const title = document.querySelector("title");
    title.innerText = `Sleep Outside | ${this.product.Name}`;

    const hasDiscount = this.product.FinalPrice < this.product.SuggestedRetailPrice;

    const discountAmount = (this.product.SuggestedRetailPrice - this.product.FinalPrice).toFixed(2);
    const discountPercent = Math.round((discountAmount / this.product.SuggestedRetailPrice) * 100);

    const discountTag = hasDiscount
      ? `<p class="product__discount">Save $${discountAmount} (${discountPercent}% OFF)</p>`
      : "";

    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "beforeend",
      `<section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img class="divider" src="${this.product.Images.PrimaryLarge}" alt="${this.product.NameWithoutBrand}" />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        ${discountTag}
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>`
    );
  }
}
