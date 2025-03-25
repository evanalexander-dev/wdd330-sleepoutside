import { renderListWithTemplate, getParam } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;


function productCardTemplate(product) {
  return `<li class="product-card">
                <a href="${baseURL}product_pages/?product=${product.Id}&category=${getParam('category')}">
                <img src="${product.Images?.PrimarySmall ?? product.Image}" alt="Image of ${product.Name}">
                <h2 class="card__brand">${product.Brand.Name}</h2>
                <h3 class="card__name">${product.Name}</h3>
                <p class="product-card__price">$${product.FinalPrice}</p>
                </a>
            </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list.Result);
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
