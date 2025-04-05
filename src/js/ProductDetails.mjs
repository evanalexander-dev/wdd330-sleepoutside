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
    this.renderComments();
    this.addCommentListener();
    this.addToWishlist();

    document.getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));

    const titleCaseCategory = this.product.Category
      .replace("-", " ")
      .replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
      );
    document.querySelector("#breadcrumb").innerText = titleCaseCategory;
  }

  addToCart() {
    const cartContent = getLocalStorage("so-cart") || [];
    const productExists = cartContent.find(item => item.Id === this.productId);

    if (productExists) {
      productExists.Quantity += 1;
    } else {
      this.product.Quantity = 1;
      cartContent.push(this.product);
    }
    setLocalStorage("so-cart", cartContent);
    handleCartChange();
  }

  addToWishlist() {
    document.querySelector("#wishlistButton").addEventListener("click", () => {
      const wishlistContent = getLocalStorage("so-wishlist") || [];
      const productExists = wishlistContent.find(item => item.Id === this.productId);

      if (!productExists) {
        wishlistContent.push(this.product);
        setLocalStorage("so-wishlist", wishlistContent);
        // alert("Product added to your wishlist!");
      } else {
        // alert("Product is already in your wishlist!");
      }
    });
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

        ${this.buildImageCarousel(this.product.Images)}
        
        <button class="wishlist_button" id="wishlistButton">&#9825</button>
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        ${discountTag}
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
        <div class="comments-section">
          <h3>Comments</h3>
          <p class="comments-section__info">No comments yet. Be the first to comment!</p>
          <ul id="comments-list">
          </ul>
          
          <div class="comment-form">
            <label for="user-name" class="visually-hidden">Name</label>
            <input id="user-name" placeholder="Your name" value="${getLocalStorage('user-name') || ''}" />
            <label for="comment-input" class="visually-hidden">Comment</label>
            <textarea id="comment-input" placeholder="Add a comment..."></textarea>
            <button id="add-comment">Submit</button>
          </div>
        </div>
      </section>`
    );
    this.initCarousel();
  }

  initCarousel() {
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.querySelector(".carousel-button.prev");
    const nextBtn = document.querySelector(".carousel-button.next");
  
    if (!track || !slides.length) return;
  
    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth;
  
    function updateCarousel() {
      const offset = -(currentIndex * slideWidth);
      track.style.transform = `translateX(${offset}px)`;
    }
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
  
    window.addEventListener("resize", () => {
      updateCarousel();
    });
  }


  buildImageCarousel(images) {
    const allImages = [images.PrimaryLarge, ...(images.ExtraImages?.map(img => img.Src) || [])];
  
    if (allImages.length === 1) {
      return `<img class="divider" src="${allImages[0]}" alt="${this.product.NameWithoutBrand}" />`;
    }
  
    const imageSlides = allImages.map((src) => `
      <div class="carousel-slide">
        <img src="${src}" alt="Product image" />
      </div>
    `).join("");
  
    return `
      <div class="carousel-container">
        <button class="carousel-button prev">&#10094;</button>
        <div class="carousel-viewport">
          <div class="carousel-track">
            ${imageSlides}
          </div>
        </div>
        <button class="carousel-button next">&#10095;</button>
      </div>
    `;
  }
  
  

  renderComments() {
    const comments = getLocalStorage(`comments-${this.productId}`) || [];
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = comments.map(comment => `
      <li class="comment-item">
        <img src="https://placehold.co/50" alt="User profile" class="comment-avatar" />
        <div class="comment-content">
          <p class="comment-author">${this.escapeHtml(comment.name)}</p>
          <p class="comment-text">${this.escapeHtml(comment.text)}</p>
          <p class="comment-time">${comment.time}</p>
        </div>
      </li>
    `).join("");

    this.removeInfoMessage(comments.length > 0);
  }

  escapeHtml(unsafeString) {
    const div = document.createElement('div');
    div.innerText = unsafeString;
    return div.innerHTML;
  }

  addCommentListener() {
    document.getElementById("add-comment").addEventListener("click", () => {
      const commentInput = document.getElementById("comment-input");
      const userNameInput = document.getElementById("user-name");
      const comment = commentInput.value.trim();
      const userName = userNameInput.value.trim();

      if (userName) {
        setLocalStorage('user-name', userName);
      }

      if (comment && userName) {
        const comments = getLocalStorage(`comments-${this.productId}`) || [];
        const time = new Date().toLocaleString();
        comments.push({ name: userName, text: comment, time });
        setLocalStorage(`comments-${this.productId}`, comments);
        this.renderComments();
        commentInput.value = "";

        this.removeInfoMessage(true);
      }
    });
  }

  removeInfoMessage(hasComments) {
    const infoMessage = document.querySelector(".comments-section__info");
    if (infoMessage) {
      infoMessage.remove();
    }

    if (!hasComments) {
      const commentsList = document.getElementById("comments-list");
      commentsList.insertAdjacentHTML("afterbegin", `
        <p class="comments-section__info">No comments yet. Be the first to comment!</p>
      `);
    }
  }

}