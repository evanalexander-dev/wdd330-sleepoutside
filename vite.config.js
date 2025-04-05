import { resolve } from "path";
import { defineConfig } from "vite";
import Wishlist from "./src/js/wishList-listing";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        productlisting: resolve(__dirname, "src/product_listing/index.html"),
        wishlist: resolve(__dirname, "src/wish_list/index.html"),
      },
    },
  },
});
