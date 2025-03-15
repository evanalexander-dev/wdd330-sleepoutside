import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(clear) {
        const list = await this.dataSource.getData();
        console.log(list);
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
            // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
            // const htmlStrings = list.map(productCardTemplate);
    }

}

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt=Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card_name">${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>    
    </li>`;
}


