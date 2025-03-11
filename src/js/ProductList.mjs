import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="../product_pages/${product.Id}.html">
          <img src="${product.Image}" alt="${product.Name}">
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="product-card__brand">${product.Brand?.Name || ''}</p>
          <p class="product-card__color">${product.Colors?.[0]?.ColorName || ''}</p>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `;
}
  
export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    async init() {
      const list = await this.dataSource.getData();
      //const filteredList = list.filter(product => this.hasDetailPage(product));
      this.renderList(filteredList);
    }
  
    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList, "afterbegin", true);
    }
  

    hasDetailPage(product) {
      const allowedIds = ["880RR", "985RF"]; 
      return allowedIds.includes(product.Id);
    }
}
  