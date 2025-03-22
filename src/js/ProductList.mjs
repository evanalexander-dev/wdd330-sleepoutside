import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
<<<<<<< HEAD
                <a href="product_pages/index.html?product=${product.Id}">
                <img
                    src="${product.Image}"
                    alt="Image of ${product.Name}"
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p></a>
=======
                <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="Image of ${product.Name}">
                <h2 class="card__brand">${product.Brand.Name}</h2>
                <h3 class="card__name">${product.Name}</h3>
                <p class="product-card__price">$${product.FinalPrice}</p>
                </a>
>>>>>>> origin/main
            </li>`;
}

export default class ProductList {
<<<<<<< HEAD

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        console.log('ProductList initialized');
        const list = await this.dataSource.getData();
        
        this.renderList(list);
    }


    renderList(product_list) {
        renderListWithTemplate(product_list, productCardTemplate, this.listElement, "afterbegin", true);
    }
}
=======
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
      const list = await this.dataSource.getData();
      this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
>>>>>>> origin/main
