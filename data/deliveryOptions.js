const deliveryOptions = [{
    id: '1',
    delveryDays: 7,
    priceCents: 0,
},
{
    id: '2',
    delveryDays: 3,
    priceCents: 499,
},
{
    id: '3',
    delveryDays: 1,
    priceCents: 999,
}];

export function getDeliveryOption(deliveryOptionId) {
      let deliveryOption;
      deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId){
          deliveryOption = option;
        }
      })
    return deliveryOption;
}

export default deliveryOptions;