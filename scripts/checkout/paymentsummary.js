import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliveryoption } from "../../data/deliveryoptions.js";
export function renderpaymentsummary(){
    let paymentHTML='';
    let productpricecents=0;
    let shippingpricecents=0;
    cart.forEach((item)=>{
        const product=getProduct(item.productId);
        productpricecents+=item.quantity*product.priceCents;

        const deliveryOption=getdeliveryoption(item.deliveryOptionsID);
        shippingpricecents+=deliveryOption.priceCents;
    });
    const totalbeforetax=productpricecents+shippingpricecents;
    const taxcents=0.1*totalbeforetax;
    const totalCents=totalbeforetax+taxcents;

    paymentHTML+=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(productpricecents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingpricecents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalbeforetax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxcents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `

        document.querySelector('.js-payment-summary').innerHTML=paymentHTML;
}