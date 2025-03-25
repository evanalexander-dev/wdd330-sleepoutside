import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData(
  getParam("category") == "null" ? "tents" : getParam("category"),
);
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
