import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('Tests addToCart', () => { 
    
    it ('Adds an existing Item to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
               {
                productId: 'c2a82c5e-aff4-435f-9975-517cfaba2ece',
                quantity: 1,
                deliveryOptionId: '1',
               }
            ]);
        });
        loadFromStorage();

        addToCart('c2a82c5e-aff4-435f-9975-517cfaba2ece', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('c2a82c5e-aff4-435f-9975-517cfaba2ece');
        expect(cart[0].quantity).toEqual(2);
        });
    it ('Adds new Item to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart('c2a82c5e-aff4-435f-9975-517cfaba2ece', 1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('c2a82c5e-aff4-435f-9975-517cfaba2ece');
        expect(cart[0].quantity).toEqual(1);
    })
 })