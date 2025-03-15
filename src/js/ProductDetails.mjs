import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        // console.log(this.product);
        this.renderProductDetails(this.product);

        setTimeout(document.getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this))
            , 0);
    }
    addProductToCart(product) {
        const cartContent = getLocalStorage("so-cart") || [];
        // console.log(cartContent);
        console.log(this.product);
        cartContent.push(this.product);
        setLocalStorage("so-cart", cartContent);
    }
    renderProductDetails(product) {
        const main = document.querySelector("main");
        const section = `
        <section class="product-detail">
            <h3>${product.Brand['Name']}</h3>

            <h2 class="divider">${product.Name}</h2>

            <img
            class="divider"
            src="${product.Image}"
            alt="${product.Name}"
            />

            <p class="product-card__price">$ ${product.FinalPrice}</p>

            <p class="product__color">${product.Colors[0].ColorName}</p>

            <p class="product__description">${product.DescriptionHtmlSimple}
            </p>


            <div class="product-detail__add">
            <button id="addToCart" data-id="344YJ">Add to Cart</button>
            </div>
        </section>
        `;

        main.insertAdjacentHTML('beforeend', section);
    }
}

// // save data to local storage
// export function setLocalStorage(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
// }

// // retrieve data from localstorage
// export function getLocalStorage(key) {
//     return JSON.parse(localStorage.getItem(key));
// }