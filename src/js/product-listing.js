import loadAlerts from "./alert.mjs";
import { renderCartIcon } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

loadAlerts();
renderCartIcon();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);
const category = getParam("category") || "tents"; // fallback por si no viene en URL
productList.init();
