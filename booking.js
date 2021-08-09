'use strict'

const finalizeOrder = document.querySelector('.section-blank_Container-rightDiv');

(function(){
    console.log(localStorage.itemList);
    if(localStorage.itemList != undefined && localStorage.itemList != [])
    {
        const list = JSON.parse(localStorage.itemList);

        for(let i of list){
            finalizeOrder.insertAdjacentHTML('beforeend',
            `<div class="cart-itemInfo">
                <div class="cart-itemInfo-img"><img class='cart-Img' src="${i.img}" alt=""></div>
                <div class="cart-itemInfo-detail">
                <p class="cart-itemInfo-p1">${i.bundleName}</p>
                <p class="cart-itemInfo-p2">${i.Name}</p>
                </div>
                <div class="cart-itemInfo-price">Rs ${i.price}</div>
            </div>`);
        }
    }
})();