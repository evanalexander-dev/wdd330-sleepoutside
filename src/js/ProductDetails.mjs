import { getLocalStorage, handleCartChange, setLocalStorage, generateDiscountTag } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    console.log("ProductDetails initialized");
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.product);

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
  
    const discountTag = generateDiscountTag(this.product.FinalPrice, this.product.SuggestedRetailPrice);
  
    // Generate color swatch buttons
    const colorSwatches = this.product.Colors.map(color => 
      `<button class="color-swatch" 
               data-color="${color.ColorName}" 
               data-image="${color.ColorPreviewImageSrc}">
        <img src="${color.ColorChipImageSrc}" alt="${color.ColorName}" title="${color.ColorName}">
      </button>`
    ).join("");
  
    const element = document.querySelector(selector);
    element.innerHTML = `
      <section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img id="productImage" class="divider" src="${this.product.Images.PrimaryLarge}" 
             alt="${this.product.NameWithoutBrand}" loading="lazy" />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        ${discountTag}
        <div class="product__colors">
          <p>Select Color:</p>
          <div id="colorOptions">${colorSwatches}</div>
        </div>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>`;
  
    // Add event listeners for color selection
    document.querySelectorAll(".color-swatch").forEach(button => {
      button.addEventListener("click", (event) => {
        this.updateProductColor(event.target.closest("button").dataset);
      });
    });
  }
  updateProductColor(colorData) {
    document.getElementById("productImage").src = colorData.image;
  }
}


