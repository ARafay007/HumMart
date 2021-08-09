'use strict';

const header = document.querySelector('.nav');
const nav = document.querySelector('.nav2-active');
const detailPageNavigator = document.querySelector('.offer-container');
const cart = document.querySelector('.cart');
const obj = {};
const finalPrice = document.querySelector('.priceSpan');
let toggleCart = false;
const itemsQty = document.querySelectorAll('.itemQty');
const cartTopDiv = document.querySelector('.cardTopDiv');
let bookedItemObj = []; //localStorage.itemList === undefined ? [] : JSON.parse(localStorage.itemList);

// localStorage.removeItem('itemList');

if(localStorage.itemList === undefined){
    localStorage.itemList = JSON.stringify([]);
    console.log(localStorage.itemList);
}


//Immediate invoked function expression IIFE
(function(){

    console.log(localStorage.itemList);

    if(localStorage.itemList != undefined && localStorage.itemList != [])
    {
        finalPrice.textContent = 'Rs 0';
        const list = JSON.parse(localStorage.itemList);
        bookedItemObj = JSON.parse(localStorage.itemList);
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

    // localStorage.removeItem('item');
    // localStorage.removeItem('itemList');
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

// =======================================Sticky nav code=======================================
// const stickyNav = function(entries){
//     entries.forEach(entry => {
//         // console.log(entry);

//         if(!entry.isIntersecting) nav.classList.remove('nav2-active');
//         else nav.classList.add('nav2-active');
//     });

//     const [entry] = entries;
//     if(!entry.isIntersecting) nav.classList.remove('nav2-active');
//     else nav.classList.add('nav2-active');
// };

const stickyNav = function(entries){
    const [entry] = entries;
    
    if(!entry.isIntersecting) nav.classList.remove('nav2-active');
    else nav.classList.add('nav2-active');
};

const observer = new IntersectionObserver(stickyNav, {
    root: null,
    threshold:0
});

observer.observe(header);


// =======================================Bundle Items code=======================================

detailPageNavigator.addEventListener('click', function(e){
    e.preventDefault();
    // const closestParent_Children = e.target.closest('.offer-item')
    //                                 .children[0]
    //                                 .firstElementChild
    //                                 .getAttribute('src');

    obj.name = e.target.dataset.name;
    obj.price = e.target.previousElementSibling.textContent;
    obj.bundleName = e.target.closest('.offer-item').children[1].textContent;
    obj.img = e.target.closest('.offer-item').children[0].firstElementChild.getAttribute('src');
    localStorage.item = JSON.stringify(obj);
    window.location.href = 'detail.html';
});

// console.log(detailPageNavigator);
// detailPageNavigator.addEventListener('click', function(e){
//         e.preventDefault();
//         console.log(e.target);
//         const closestParent = e.target.closest('.offer-item');
//         console.log(closestParent.children);
//         const closestParent_Children = closestParent.children[0].firstElementChild.getAttribute('src');
//         // console.log(closestParent_Children);
//         localStorage.getImg = String(closestParent_Children);
//         console.log(localStorage.getImg);
//         window.location.href = "detail.html"
//     });

const cartToggle = function(){
    toggleCart ? cart.classList.add('hideCart') : cart.classList.remove('hideCart');
    toggleCart = !toggleCart;
};

document.querySelector('.crossBtn').addEventListener('click', cartToggle)
document.querySelector('.openCart').addEventListener('click', cartToggle)

cartTopDiv.addEventListener('click', function(e){
    let countQty = 0;
    e.preventDefault();
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

        const removeDiv = document.querySelectorAll('.cart-itemInfo');
        removeDiv.forEach(el => el.remove());

        createDynamicItems(bookedItemObj);
    }
});