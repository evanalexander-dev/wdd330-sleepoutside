import loadAlerts from "./alert.mjs";
import { renderCartIcon } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadAlerts();
renderCartIcon();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);
productList.init();


const productData = new ProductData('tents');
//  new productData(category, dataSource, listElement);
const productList = new ProductList('tenets', productData, document.querySelector('.product-list'));
productList.init();