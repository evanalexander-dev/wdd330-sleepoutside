import { loadHeaderFooter, getParam, capitalizeString } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category =
  getParam("category") === "null" ? "tents" : getParam("category");
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

let formattedCategory = category.split("-").join(" ");
formattedCategory = formattedCategory === "null" ? "tents" : formattedCategory;
document.getElementById("title").innerText +=
  `: ${capitalizeString(formattedCategory)}`;

productList.init();
