import loadAlerts from "./alert.mjs";
import { renderCartIcon } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadAlerts();
renderCartIcon();


const productData = new ProductData('tents');
//  new productData(category, dataSource, listElement);
const productList = new ProductList('tenets', productData, document.querySelector('.product-list'));
productList.init();