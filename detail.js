'use strict'

let detailObj = JSON.parse(localStorage.item);
let bookedItemObj = localStorage.itemList === undefined ? [] : JSON.parse(localStorage.itemList);
const searchableItems = JSON.parse(localStorage.searchableItems);

const itemName = document.querySelector('.namePara');
const price = document.querySelector('.pricePara');
const bundleName = document.querySelector('h3');
const img = document.querySelector('.img');
const searchBox = document.querySelector('.searchSection_search');
const searchArea = document.querySelector('.searchArea');

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
    loadItemToBeSelected();
    loadSelectedItems();
})();

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
};

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
// console.log(bookedItemObj);
function loadItemToBeSelected(){
    itemName.textContent = detailObj.name;
    price.textContent = detailObj.price;
    bundleName.textContent = detailObj.bundleName;
    img.src = detailObj.img;
}
const cartToggle = function(){
    toggleCart ? cart.classList.add('hideCart') : cart.classList.remove('hideCart');
    toggleCart = !toggleCart;
};

document.querySelector('.crossBtn').addEventListener('click', cartToggle)
document.querySelector('.openCart').addEventListener('click', cartToggle)

addToCartBtn.addEventListener('click', function(){
    console.log(localStorage.itemList);

    bookedItemObj.forEach(el => {
        if(el.name === detailObj.name){
            el.qty++;
            el.remaining--;
            detailObj = {};
            console.log(detailObj);
            localStorage.itemList = JSON.stringify(bookedItemObj);

            const clear_cartItemInfoDiv = document.querySelectorAll('.cart-itemInfo');
            clear_cartItemInfoDiv.forEach(div => div.remove());

            loadSelectedItems();
        }
    });

    if(Object.keys(detailObj).length === 0 && detailObj.constructor === Object)
        return;
    
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
                <span class='qty'>${detailObj.qty}</span> 
                <span class='decreaseQty'>-</span>
                Stock <span class='reamining'>${detailObj.remaining}</span>
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
        localStorage.itemList = JSON.stringify(bookedItemObj);
        console.log(bookedItemObj);

        const removeDiv = document.querySelectorAll('.cart-itemInfo');
        removeDiv.forEach(el => el.remove());

        createDynamicItems(bookedItemObj);
    }
});

//Search Area
searchBox.addEventListener('keyup', function(){
    if(searchBox.value === '' || searchBox.value === null){
        while(searchArea.firstElementChild){
            searchArea.removeChild(searchArea.firstElementChild);
        }

        searchArea.classList.add('hideSearchArea');
    }
    else{
        searchArea.classList.remove('hideSearchArea');

        // bookedItemObj.forEach(el => {el.name.toLowerCase().split(" ").forEach(el => {console.log(el)})});

        searchableItems.forEach(item => {
            item.name.toLowerCase().split(" ")
                   .forEach(name => { 
                    if(name === searchBox.value.toLowerCase()){
                        searchArea.insertAdjacentHTML('beforeend', `<li>${item.name}</li>`);
                        // console.log(el.name);
                    } })
        });
    }
});

searchArea.addEventListener('click', function(e){
    console.log(e.target);

    searchableItems.forEach(el => {
        if(el.name === e.target.textContent){
            detailObj = el;
            console.log(el);
            loadItemToBeSelected();
        }
    })
});