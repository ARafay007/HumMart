'use strict'

const detailObj = JSON.parse(localStorage.item);
const bookedItemObj = localStorage.itemList === undefined ? [] : JSON.parse(localStorage.itemList);

const itemName = document.querySelector('.namePara');
const price = document.querySelector('.pricePara');
const bundleName = document.querySelector('h3');
const img = document.querySelector('.img');

let finalPrice = document.querySelector('.priceSpan');
const cart = document.querySelector('.cart');
const addToCartBtn = document.querySelector('.btn-addToCart');
const itemsQty = document.querySelectorAll('.itemQty');
const addItemDiv = document.querySelector('.cart_chargesDiv');
const cartTopDiv = document.querySelector('.cardTopDiv');
let toggleCart = false;


//Immediate invoked function expression IIFE
(function(){
    console.log(localStorage.itemList);
    if(localStorage.itemList != undefined || localStorage.itemList != [])
    {
        finalPrice.textContent = '';
        const list = JSON.parse(localStorage.itemList);
        let totalPrice = 0, totalItems = 0;

        list.forEach((el, i) => 
        {
            totalItems++;
            totalPrice += Number(el.price);
            document.querySelector('.cart_chargesDiv').insertAdjacentHTML('afterend', 
            `<div class="cart-itemInfo">
                <div class="cart-itemInfo-img"><img class='cart-Img' src="${el.img}" alt=""></div>
                <div class="cart-itemInfo-detail">
                    <p class="cart-itemInfo-p1">${el.bundleName}</p>
                    <p class="cart-itemInfo-p2">${el.name}</p>
                    <p class="cart-itemInfo-p3">
                    <span class='increaseQty'>+</span> 
                    <span class='qty'>1</span> 
                    <span class='decreaseQty'>-</span>
                    </p>
                </div>
                <div class="cart-itemInfo-price">
                    <button class="RemoveItem" data-key="${i}">Remove</button>
                    <p>Rs ${el.price}</p>
                </div>
            </div>`);
        }
        )
        finalPrice.textContent = `Rs ${totalPrice}`;
        itemsQty.forEach(el => el.textContent = `${totalItems} item(s)`);
    }
})();

const createDynamicItems = function(list){
        finalPrice.textContent = '';
        // const list = JSON.parse(localStorage.itemList);
        let totalPrice = 0, totalItems = 0;

        list.forEach((el, i) => 
        {
            totalItems++;
            totalPrice += Number(el.price);
            document.querySelector('.cart_chargesDiv').insertAdjacentHTML('afterend', 
            `<div class="cart-itemInfo">
                <div class="cart-itemInfo-img"><img class='cart-Img' src="${el.img}" alt=""></div>
                <div class="cart-itemInfo-detail">
                    <p class="cart-itemInfo-p1">${el.bundleName}</p>
                    <p class="cart-itemInfo-p2">${el.name}</p>
                    <p class="cart-itemInfo-p3">
                    <span class='increaseQty'>+</span> 
                    <span class='qty'>1</span> 
                    <span class='decreaseQty'>-</span>
                    </p>
                </div>
                <div class="cart-itemInfo-price">
                    <button class="RemoveItem" data-key="${i}">Remove</button>
                    <p>Rs ${el.price}</p>
                </div>
            </div>`);
        }
        )
        finalPrice.textContent = `Rs ${totalPrice}`;
        itemsQty.forEach(el => el.textContent = `${totalItems} item(s)`);
}


// console.log(detailObj);
console.log(bookedItemObj);
itemName.textContent = detailObj.name;
price.textContent = detailObj.price;
bundleName.textContent = detailObj.bundleName;
img.src = detailObj.img;
// console.log(cartItemQuantity.textContent);

const cartToggle = function(){
    toggleCart ? cart.classList.add('hideCart') : cart.classList.remove('hideCart');
    toggleCart = !toggleCart;
};

document.querySelector('.crossBtn').addEventListener('click', cartToggle)
document.querySelector('.openCart').addEventListener('click', cartToggle)

addToCartBtn.addEventListener('click', function(){
    console.log(localStorage.itemList);
    bookedItemObj.push(detailObj);
    console.log(bookedItemObj);    
    localStorage.itemList = JSON.stringify(bookedItemObj);
    
    finalPrice.textContent = '';
    let totalPrice = 0, totalItems = 0;

    for(let i of bookedItemObj){
        totalPrice += Number(i.price);
        totalItems++;
    }

    itemsQty.forEach(el => el.textContent = `${totalItems} item(s)`);
    
    finalPrice.textContent = `Rs ${totalPrice}`;

    addItemDiv.insertAdjacentHTML('afterend', 
    `<div class="cart-itemInfo">
        <div class="cart-itemInfo-img"><img class='cart-Img' src="${detailObj.img}" alt=""></div>
        <div class="cart-itemInfo-detail">
            <p class="cart-itemInfo-p1">${detailObj.bundleName}</p>
            <p class="cart-itemInfo-p2">${detailObj.name}</p>
            <p class="cart-itemInfo-p3">
                <span class='increaseQty'>+</span> 
                <span class='qty'>1</span> 
                <span class='decreaseQty'>-</span>
            </p>
        </div>
        <div class="cart-itemInfo-price">
            <button class="RemoveItem" data-key="${bookedItemObj.length}">Remove</button>
            <p>Rs ${detailObj.price}</p>
        </div>
    </div>`);
    
    localStorage.removeItem('item');
    // console.log(cart.outerHTML);
});

cartTopDiv.addEventListener('click', function(e){
    let countQty = 0;
    console.log(e.target);
    
    if(e.target.classList.contains('increaseQty')){ 
        countQty = Number(e.target.nextElementSibling.textContent);
        countQty++;
        e.target.nextElementSibling.textContent = countQty;
    }
    else if(e.target.classList.contains('decreaseQty')) {
        countQty = Number(e.target.previousElementSibling.textContent);
        countQty = countQty == 1 ? 1 : --countQty;
        e.target.previousElementSibling.textContent = countQty;
    }
    else if(e.target.classList.contains('RemoveItem')){
        console.log(e.target.dataset.key);
        bookedItemObj.splice(Number(e.target.dataset.key) - 1, 1);
        localStorage.itemList = bookedItemObj;
        console.log(bookedItemObj);

        const removeDiv = document.querySelectorAll('.cart-itemInfo');
        removeDiv.forEach(el => el.remove());

        createDynamicItems(bookedItemObj);
    }
});