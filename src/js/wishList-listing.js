import {
    getLocalStorage,
    handleCartChange,
} from "./utils.mjs";

export default class Wishlist {
    constructor(key) {
        this.wishlistKey = key;
        // this.init();
    }

    init() {
        this.renderWishlistContents();
    }

    renderWishlistContents() {
        const wishlistItems = getLocalStorage(this.wishlistKey) || [];
        const htmlItems = wishlistItems.map((item) => this.wishlistItemTemplate(item));

        // Check if wishlist is empty
        if (wishlistItems.length !== 0) {
            document.querySelector(".wishlist-product-list").innerHTML = htmlItems.join("");

            const deleteButtons = document.querySelectorAll(".remove-btn");
            deleteButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    this.deleteItem(button.getAttribute("data-id"));
                });
            });

            const addToCartButtons = document.querySelectorAll("#addToCart");
            addToCartButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    this.addToCart(event.target.getAttribute("data-id"));
                });
            });

            // const wishListBtnWrapper = document.querySelector(".wishlist-button-wrapper");
            // wishListBtnWrapper.innerHTML = `<button class="clear-wishlist">Clear Wish List</button>`

            // If not, display the default text
        } else {
            document.querySelector(".wishlist-product-list").innerHTML =
                `<p>Your wishlist is as empty as a desert! Start adding some items to fill it up!</p>`;
        }
    }

    addToCart(productId) {
        const cartContent = getLocalStorage("so-cart") || [];
        const wishlistItems = getLocalStorage(this.wishlistKey) || [];
        const product = wishlistItems.find(item => item.Id === productId);

        if (product) {
            const productExists = cartContent.find(item => item.Id === productId);

            if (productExists) {
                productExists.Quantity += 1;
            } else {
                product.Quantity = 1;
                cartContent.push(product);
            }

            localStorage.setItem("so-cart", JSON.stringify(cartContent));
            handleCartChange();
        }
    }



    wishlistItemTemplate(item) {
        return `
            <li class="wishlist-card divider">
                <a href="/product_pages/?product=${item.Id}" class="wishlist-card__all">
                    <img src="${item.Images.PrimarySmall}" alt="${item.Name}" class="wishlist-card__image"/>
                    <h2 class="wishlist_card__name">${item.Name}</h2>
                    <p class="wishlist_card__color">${item.Colors[0].ColorName}</p>
                    <p class="wishlist-card__price">$${item.FinalPrice.toFixed(2)}</p>
                </a>
                <div class="product-detail__add_or_remove">
                    <button id="addToCart" class="addtoCart-Btn" data-id="${item.Id}">Add to Cart</button>
                    <button class="remove-btn remove-wishlist" data-id="${item.Id}">Remove</button>
                </div>
            </li>`;
    }

    deleteItem(id) {
        const wishlistItems = getLocalStorage(this.wishlistKey);

        if (wishlistItems) {
            const itemIndex = wishlistItems.findIndex((item) => item.Id === id);

            if (itemIndex !== -1) {
                wishlistItems.splice(itemIndex, 1);
                localStorage.setItem(this.wishlistKey, JSON.stringify(wishlistItems));

                handleCartChange();
                this.renderWishlistContents();
            }
        }
    }
}

new Wishlist();
