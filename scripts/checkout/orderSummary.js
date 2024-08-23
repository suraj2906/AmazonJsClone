import { cart, removeProductFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs  from 'https://unpkg.com/dayjs@1.8.9/esm/index.js';
import deliveryOptions from "../../data/deliveryOptions.js";


export default function renderOrderSummary() {

  let cartSummaryHTML = '';

  console.log('hello');

      cart.forEach((cartItem) => {

      const productId = cartItem.productId;
      let matchingProduct;

      products.forEach((product) => {
          if(product.id == productId) {
              matchingProduct = product;
          }
      })

      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption;
      deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId){
          deliveryOption = option;
        }
      })

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.delveryDays, 'days');
      const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');

      cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDateFormatted}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;
  });


  function deliveryOptionsHTML(matchingProduct, cartItem){
    let HTML = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.delveryDays, 'days');
      const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;


      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
      
      HTML += `<div class="delivery-option js-delivery-option" 
                    data-product-id = "${matchingProduct.id}"
                    data-delivery-option-id = "${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${deliveryDateFormatted}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>`
    })
    return HTML;
  }

  document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
          link.addEventListener('click', () => {
              const deleteProductId  = link.dataset.productId;
              removeProductFromCart(deleteProductId);
              const container = document.querySelector(`.js-cart-item-container-${deleteProductId}`);
              container.remove();
          })
      })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  })

}