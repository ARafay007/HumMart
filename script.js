'use strict';

const header = document.querySelector('.nav');
const nav = document.querySelector('.nav2-active');
const detailPageNavigator = document.querySelector('.offer-container');
const addCategories = document.querySelector('.addCategories');
const cart = document.querySelector('.cart');
let obj = {};
const finalPrice = document.querySelector('.priceSpan');
let toggleCart = false;
const itemsQty = document.querySelectorAll('.itemQty');
const addItemDiv = document.querySelector('.cart_chargesDiv');
const cartTopDiv = document.querySelector('.cardTopDiv');
let bookedItemObj = []; //localStorage.itemList === undefined ? [] : JSON.parse(localStorage.itemList);
const categoriesName = ['Personal Care', 'Home & Kitchen', 'Household Needs', 'Noodles, Sauce and Frozen Foods', 'Grocery & Staples', 'Breakfast & Dairy', 'Furnishing & Home Needs', 'Beverages', 'Baby & Kids', 'Pet Care', 'Pharmacy', 'Home Service', 'Biscuits, Snacks and Chocolates', 'Meat & Seafood'];

const bundleNameAry = [{
    id: 1,
    name: 'Shahi Zeera',
    price: 120,
    bundleName: 'Super Saver Bundle 6',
    img: 'Images/bundleOffer-1.jpg',
    qty: 1,
    remaining: 9
},
{
    id: 2,
    name: 'Chat Masala',
    price: 111,
    bundleName: 'Super Saver Bundle 1',
    img: 'Images/bundleOffer-2.jpg',
    qty: 1,
    remaining: 9
}];

localStorage.searchableItems = JSON.stringify(bundleNameAry);

// localStorage.removeItem('itemList');
// localStorage.removeItem('searchableItems');
// localStorage.removeItem('orders');

if(localStorage.itemList === undefined){
    localStorage.itemList = JSON.stringify([]);
    console.log(localStorage.itemList);
}


//Immediate invoked function expression IIFE
(function(){

    console.log(localStorage.itemList);

    showBundleOffer();

    showCategories();

    loadSelectedItems();

})();

function showCategories(){
    for(let i=0; i < categoriesName.length/2; i++){
        let k = i;

        if(k > 0){ 
            k=2;
            k *= i;
         }

        addCategories.insertAdjacentHTML('beforeend', `
        <div class="category-container">
            <div class="category-item">
                <div class="category-Img">
                    <img src="Images/category-${k}.jpg" alt="">
                </div>
                <div class="category-content">
                    <p>${categoriesName[k]}</p>
                    <p></p>
                </div>
                <div class="category-icon">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div>
            <div class="category-item">
                <div class="category-Img">
                    <img src="Images/category-${k+1}.jpg" alt="">
                </div>
                <div class="category-content">
                    <p>${categoriesName[k+1]}</p>
                    <p></p>
                </div>
                <div class="category-icon">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
            </div>
        </div>
        `);
    }
}

function showBundleOffer(){
    const addBundleOffer = document.querySelector('.offer-container');

    bundleNameAry.forEach(el => {
        addBundleOffer.insertAdjacentHTML('beforeend', `
        <div class="offer-item">
            <div class="offer-imgDiv">
                <img src="${el.img}" data-name="${el.name}" alt="">
            </div>
            <p>${el.bundleName}</p>
            <div class="btnDiv">
                <strike>Rs 195</strike>
                Rs <span>${el.price}</span>
                <a href="#" data-name="${el.name}" class="btn btn-addToCart">ADD TO CART</a>
            </div>
        </div>
        `)}
    );
}

function loadSelectedItems(){
    if(localStorage.itemList != undefined && localStorage.itemList != [])
    {
        finalPrice.textContent = 'Rs 0';
        const list = JSON.parse(localStorage.itemList);
        bookedItemObj = JSON.parse(localStorage.itemList);
        let totalItems = 0, totalPrice = 0;

        list.forEach((el, i) => 
        {
            let itemTotalPrice = 0;
            // console.log(el);
            totalItems++;
            itemTotalPrice += Number(el.price) * el.qty;
            totalPrice += itemTotalPrice;
            document.querySelector('.cart_chargesDiv').insertAdjacentHTML('afterend', 
            `<div class="cart-itemInfo">
                <div class="cart-itemInfo-img"><img class='cart-Img' src="${el.img}" alt=""></div>
                <div class="cart-itemInfo-detail">
                    <p class="cart-itemInfo-p1">${el.bundleName}</p>
                    <p class="cart-itemInfo-p2">${el.name}</p>
                    <p class="cart-itemInfo-p3">
                        <span class='increaseQty'>+</span> 
                        <span class='qty'>${el.qty}</span> 
                        <span class='decreaseQty'>-</span>
                        Stock <span class='reamining'>${el.remaining}</span>
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
}

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
    
    if(e.target.hasAttribute('src')){
        console.log(e.target);
        obj.name = e.target.dataset.name;
        obj.bundleName = e.target.closest('.offer-item').children[1].textContent;
        obj.price = e.target.closest('.offer-item').children[2].children[1].textContent;
        obj.img = e.target.getAttribute('src');

        bookedItemObj.filter(el => {
            if(el.name === obj.name){
                obj.qty = el.qty;
                obj.remaining = el.remaining;
            }
        });

        localStorage.item = JSON.stringify(obj);
        window.location.href = 'detail.html';
    }
    else if(e.target.hasAttribute('href')){
        console.log(e.target);
        obj.name = e.target.dataset.name;
        obj.price = e.target.previousElementSibling.textContent;
        obj.bundleName = e.target.closest('.offer-item').children[1].textContent;
        obj.img = e.target.closest('.offer-item').children[0].firstElementChild.getAttribute('src');
        obj.qty = 1;
        obj.remaining = 9;
        addToCart();
    }

});

const addToCart = function(){
    console.log(localStorage.itemList);

    bookedItemObj.forEach(el => {
        if(el.name === obj.name){
            el.qty++;
            el.remaining--;
            obj = {};
            console.log(obj);
            localStorage.itemList = JSON.stringify(bookedItemObj);

            const clear_cartItemInfoDiv = document.querySelectorAll('.cart-itemInfo');
            clear_cartItemInfoDiv.forEach(div => div.remove());

            loadSelectedItems();
        }
    });

    if(Object.keys(obj).length === 0 && obj.constructor === Object)
        return;

    bookedItemObj.push(obj);
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
        <div class="cart-itemInfo-img"><img class='cart-Img' src="${obj.img}" alt=""></div>
        <div class="cart-itemInfo-detail">
            <p class="cart-itemInfo-p1">${obj.bundleName}</p>
            <p class="cart-itemInfo-p2">${obj.name}</p>
            <p class="cart-itemInfo-p3">
                <span class='increaseQty'>+</span> 
                <span class='qty'>${obj.qty}</span> 
                <span class='decreaseQty'>-</span>
                Stock <span class='reamining'>${obj.remaining}</span>
            </p>
        </div>
        <div class="cart-itemInfo-price">
            <button class="RemoveItem" data-key="${bookedItemObj.length}">Remove</button>
            <p>Rs ${obj.price}</p>
        </div>
    </div>`);
};

const cartToggle = function(){
    toggleCart ? cart.classList.add('hideCart') : cart.classList.remove('hideCart');
    toggleCart = !toggleCart;
};

document.querySelector('.crossBtn').addEventListener('click', cartToggle)
document.querySelector('.openCart').addEventListener('click', cartToggle)


//Increase, decrease or remove item
cartTopDiv.addEventListener('click', function(e){
    let countQty = 0;
    e.preventDefault();
    console.log(e.target);
    
    if(e.target.classList.contains('increaseQty')){ 
        countQty = Number(e.target.nextElementSibling.textContent);

        if(countQty === 10){
            alert('No more stock available');
            return;
        }

        countQty++;
        e.target.nextElementSibling.textContent = countQty;
        
        const itemName = e.target.closest('.cart-itemInfo-detail').children[1].textContent;

        console.log(bookedItemObj);

        bookedItemObj.filter(el => {
            if(el.name === itemName){
                el.qty = countQty;
                el.remaining -= 1;
                e.target.closest('.cart-itemInfo-p3').children[3].textContent = el.remaining;
            }
        });

        localStorage.itemList = JSON.stringify(bookedItemObj);

        const clear_cartItemInfoDiv = document.querySelectorAll('.cart-itemInfo');
        clear_cartItemInfoDiv.forEach(div => div.remove());

        loadSelectedItems();
    }
    else if(e.target.classList.contains('decreaseQty')) {
        countQty = Number(e.target.previousElementSibling.textContent);

        if(countQty === 1){
            alert('Item quantity should be atleast 1');
            return;
        }

        countQty = countQty == 1 ? 1 : --countQty;
        e.target.previousElementSibling.textContent = countQty;

        const itemName = e.target.closest('.cart-itemInfo-detail').children[1].textContent;

        bookedItemObj.filter(el => {
            if(el.name === itemName){
                el.qty = countQty;
                el.remaining += 1;
                e.target.closest('.cart-itemInfo-p3').children[3].textContent = el.remaining;
            }
        });

        localStorage.itemList = JSON.stringify(bookedItemObj);

        const clear_cartItemInfoDiv = document.querySelectorAll('.cart-itemInfo');
        clear_cartItemInfoDiv.forEach(div => div.remove());

        loadSelectedItems();
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