import { getLocalStorage, handleCartChange, setLocalStorage, generateDiscountTag } from "./utils.mjs";

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
    cartContent.push(this.product);
    setLocalStorage("so-cart", cartContent);
    handleCartChange();
  }
  renderProductDetails(selector) {
    const title = document.querySelector("title");
    title.innerText = `Sleep Outside | ${this.product.Name}`;

    const discountTag = generateDiscountTag(this.product.FinalPrice, this.product.SuggestedRetailPrice);

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
