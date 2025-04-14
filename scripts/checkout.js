import { render } from "./checkout/ordersummary.js";
import { renderpaymentsummary } from "./checkout/paymentsummary.js";
import { cart } from "../data/cart-oop.js";
render();
renderpaymentsummary();

new Promise(()=>{
    console.log('Hello');
})
