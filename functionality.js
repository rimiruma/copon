const cards = document.querySelectorAll('.card-clickable');
const selectedItemNamesContainer = document.getElementById('selectedItemNames');
const totalPriceElement = document.getElementById('totalPrice');
const discountAmountElement = document.getElementById('discountAmount');
const finalTotalElement = document.getElementById('finalTotal');
const couponInput = document.getElementById('couponInput');
const applyCouponButton = document.getElementById('applyCoupon');

let totalPrice = 0;
let discountPercentage = 0;

cards.forEach(card => {
    card.addEventListener('click', function() {
        const itemName = card.querySelector('h2').textContent;
        const priceText = card.querySelector('#price').textContent;
        const price = parseFloat(priceText);
        const listItem = document.createElement('li');
        listItem.textContent = itemName;
        selectedItemNamesContainer.appendChild(listItem);
        totalPrice += price;
        totalPriceElement.textContent = totalPrice.toFixed(2) + ' TK';
        updateFinalTotal();
        updateApplyCouponButton();
    });
});

applyCouponButton.addEventListener('click', function() {
    const couponCode = couponInput.value;
    if (couponCode === 'SELL200') {
        discountPercentage = 20;
        updateFinalTotal();
    }
});

function updateFinalTotal() {
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const finalTotal = totalPrice - discountAmount;
    discountAmountElement.textContent = discountAmount.toFixed(2) + ' TK';
    finalTotalElement.textContent = finalTotal.toFixed(2) + ' TK';
}

function updateApplyCouponButton() {
    applyCouponButton.disabled = totalPrice < 200;
}