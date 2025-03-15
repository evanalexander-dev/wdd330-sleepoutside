import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


const productData = new ProductData('tents');
//  new productData(category, dataSource, listElement);
const productList = new ProductList('tenets', productData, document.querySelector('.product-list'));
productList.init();