import { resolve } from "path";
import { defineConfig } from "vite";

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
<<<<<<< HEAD
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
=======
        productlisting: resolve(__dirname, "src/product_listing/index.html"),
>>>>>>> d145edbf45a967c6b0fa5a8bae1adc27e727121b
      },
    },
  },
});
