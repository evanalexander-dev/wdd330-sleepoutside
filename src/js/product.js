import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

<<<<<<< HEAD
const dataSource = new ProductData("category");
=======
const dataSource = new ExternalServices();
>>>>>>> d145edbf45a967c6b0fa5a8bae1adc27e727121b
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
