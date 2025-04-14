import { cart ,removefromcart,updatedeliveryoption} from "../../data/cart.js";
import { products ,getProduct} from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";   
import {deliveryOptions,getdeliveryoption} from "../../data/deliveryoptions.js";
import { renderpaymentsummary } from "./paymentsummary.js";

const today=dayjs();
const DeliveryDtae=today.add(7,'days');
console.log(DeliveryDtae.format('dddd, MMMM D'));
export function render(){
  let cartsummaryHTML='';

  cart.forEach((cartitem)=>{
      const productId=cartitem.productId;
      const matchingitem=getProduct(productId);
      
      const deliveryOptionsID=cartitem.deliveryOptionsID;
      const deliveryOption=getdeliveryoption(deliveryOptionsID);
      
      
      const today=dayjs();
      const deliverydate=today.add(deliveryOption.deliverydays,'days');
      const datestring=deliverydate.format('dddd , MMMM D');
      

      cartsummaryHTML+=`<div class="cart-item-container js-cart-item-container-${cartitem.productId}">
              <div class="delivery-date">
                Delivery date: ${datestring}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingitem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingitem.name}
                  </div>
                  <div class="product-price">
                    ${(matchingitem.priceCents/100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${cartitem.productId}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(cartitem)}
                </div>
              </div>
            </div>
      `
  });

  function deliveryOptionsHTML(cartitem){
      let html='';
      deliveryOptions.forEach((deliveryOption)=>{
          const today=dayjs();
          const deliverydate=today.add(deliveryOption.deliverydays,'days');
          const datestring=deliverydate.format('dddd , MMMM D');
          const pricestring=deliveryOption.priceCents===0
          ?'Free'
          :`$${(deliveryOption.priceCents/100).toFixed(2)}`;

          const ischecked=cartitem.deliveryOptionsID===deliveryOption.id;
          html+=`<div class="delivery-option js-delivery-option" data-product-id="${cartitem.productId}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${ischecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${cartitem.productId}">
                    <div>
                      <div class="delivery-option-date">
                        ${datestring}
                      </div>
                      <div class="delivery-option-price">
                        ${pricestring}- Shipping
                      </div>
                    </div>
                  </div>`
      });
      return html;
  }

  document.querySelector('.js-order-summary').innerHTML=cartsummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          removefromcart(productId);

          const container=document.querySelector(`.js-cart-item-container-${productId}`);
          container.remove();

          renderpaymentsummary();
      })
  })

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const productId=element.dataset.productId;
      const deliveryOptionsID=element.dataset.deliveryOptionId;
      updatedeliveryoption(productId,deliveryOptionsID);
      render();
      renderpaymentsummary();
    })
  })}
