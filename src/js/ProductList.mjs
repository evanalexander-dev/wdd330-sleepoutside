import { renderListWithTemplate, generateDiscountTag } from "./utils.mjs";

function productCardTemplate(product) {
  const discountTag = generateDiscountTag(product.FinalPrice, product.SuggestedRetailPrice);

  return `<li class="product-card">
                <a href="/product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
                ${discountTag}
                <h2 class="card__brand">${product.Brand.Name}</h2>
                <h3 class="card__name">${product.Name}</h3>
                <p class="product-card__price">$${product.FinalPrice}</p>
                </a>
                <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
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
    try {
      const list = await this.dataSource.getData(this.category);
      this.fullList = list;
      this.originalList = [...list];
      this.renderList(this.fullList);
      this.addSortListener();
      this.addModalListener();

      const titleCaseCategory = this.category
      .replace("-", " ")
      .replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
      );
      document.querySelector("#breadcrumb").innerText = `${titleCaseCategory}->(${this.originalList.length} items)`;
    } catch (err) {
      console.log(err);
      this.listElement.innerHTML = "<p>Unable to load products at this time. Please try again later.</p>";
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  sortList(type) {
    const sorted = [...this.fullList];
    switch (type) {
      case "name":
        return sorted.sort((a, b) => a.Name.localeCompare(b.Name));
      case "price-low-high":
        return sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
      case "price-high-low":
        return sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
      default:
        return [...this.originalList];
    }
  }

  addSortListener() {
    const select = document.getElementById("sort");
    if (select) {
      select.addEventListener("change", (e) => {
        const sorted = this.sortList(e.target.value);
        this.renderList(sorted);
      });
    }
  }

  addModalListener() {
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalColor = document.getElementById("modalColor");
    const modalDescription = document.getElementById("modalDescription");
    const closeBtn = document.querySelector(".modal-close-btn");

    document.querySelectorAll(".quick-view-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        const product = this.fullList.find((p) => p.Id == productId);

        if (product) {
          modalTitle.textContent = product.Name;
          modalPrice.textContent = `Price: $${product.FinalPrice}`;
          modalColor.textContent = `Color: ${product.Colors[0].ColorName}`
          modalDescription.innerHTML = product.DescriptionHtmlSimple || "No description available.";
          modal.style.display = "block";
        }
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}