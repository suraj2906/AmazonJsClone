import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import deliveryOptions, {getDeliveryOption} from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
export default function renderPaymentSummary() {
    
    let priceOfCart = 0;
    let totalQuantity = 0;
    let totalDeliveryPrice = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        priceOfCart += product.priceCents*cartItem.quantity;
        totalQuantity += cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        totalDeliveryPrice += deliveryOption.priceCents;
    });



    const totalWithDelivery = totalDeliveryPrice + priceOfCart;
    const tax = totalWithDelivery*0.1;
    const finalTotal = totalWithDelivery + tax;
    console.log(priceOfCart);

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-items-quantity">Items (${totalQuantity}):</div>
            <div class="payment-summary-money js-payment-summary-subtotal">$${formatCurrency(priceOfCart)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-delivery-total">$${formatCurrency(totalDeliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-total-with-delivery">$${formatCurrency(totalWithDelivery)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-tax">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-final-total">$${formatCurrency(finalTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`
    

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-items-quantity').innerHTML = `${totalQuantity} items`;
 

}