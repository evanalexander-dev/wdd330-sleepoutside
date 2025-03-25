import loadAlerts from "./alert.mjs";
import { loadHeaderFooter, getParam, capitalize } from "./utils.mjs";

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const categoryTitle = document.querySelector(".category-title");

categoryTitle.innerText = capitalize(category);

// Another way of solving the issue
// const parentElement = element.parentElement;
// parentElement.querySelector('h2').insertAdjacentText('beforeend', capitalize(category));

const productList = new ProductList(category, dataSource, element);
productList.init();
