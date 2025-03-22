import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="Image of ${product.Name}">
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
      this.fullList = [];
      this.originalList = [];
    }
    async init() {
      const list = await this.dataSource.getData();
      this.fullList = list;
      this.originalList = [...list];
      this.renderList(this.fullList);
      this.addSortListener();
    }
    renderList(list) {
      renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }

    //Sort part
    sortProducts(type) {
      const sorted = [...this.fullList];
      switch (type) {
        case "name":
          return sorted.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        case "price-low-high":
          return sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
        case "price-high-low":
          return sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
        default:
          return [...this.originalList]; 
      }
    }

    addSortListener() {
      const sortSelect = document.getElementById("sort");
      if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
          const sortedList = this.sortProducts(e.target.value);
          this.renderList(sortedList);
        });
      }
    }
}

