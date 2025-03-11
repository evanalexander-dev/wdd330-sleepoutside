
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const tentData = new ProductData("tents");

tentData.getData().then((data) => {
  console.log("Tents loaded:", data);
});


const productListElement = document.querySelector(".product-list"); 
const dataSource = new ProductData("tents");
const tentList = new ProductList("tents", dataSource, productListElement);

tentList.init();