import { loadHeaderFooter, getParam } from "./utils.mjs";
<<<<<<< HEAD
import ProductData from "./ProductData.mjs";
=======
import ExternalServices from "./ExternalServices.mjs";
>>>>>>> d145edbf45a967c6b0fa5a8bae1adc27e727121b
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
<<<<<<< HEAD
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
=======

document.querySelector("#top-products").innerHTML += `: ${category
  .replace("-", " ")
  .replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  )}`;

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);
productList.init();
>>>>>>> d145edbf45a967c6b0fa5a8bae1adc27e727121b
