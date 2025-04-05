import {
    loadHeaderFooter,
} from "./utils.mjs";
import Wishlist from "./wishList-listing";


loadHeaderFooter();

const wishList = new Wishlist('so-wishlist');
wishList.init();
