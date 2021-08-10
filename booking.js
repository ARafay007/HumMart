'use strict'

const finalizeOrder = document.querySelector('.section-blank_Container-rightDiv');

(function(){
    console.log(localStorage.itemList);
    if(localStorage.itemList != undefined && localStorage.itemList != [])
    {
        let totalPrice = 0;
        const list = JSON.parse(localStorage.itemList);

        for(let i of list){
            totalPrice += Number(i.price);
            finalizeOrder.insertAdjacentHTML('beforeend',
            `<div class="cart-itemInfo">
                <div class="cart-itemInfo-img"><img class='cart-Img' src="${i.img}" alt=""></div>
                <div class="cart-itemInfo-detail">
                <p class="cart-itemInfo-p1">${i.bundleName}</p>
                <p class="cart-itemInfo-p2">${i.name}</p>
                </div>
                <div class="cart-itemInfo-price">Rs ${i.price}</div>
            </div>`);
        }
        finalizeOrder.insertAdjacentHTML("afterbegin", 
        `<div>
            <span>My Cart</span> <spna>Rs ${totalPrice}</span>
        </div>`);
    }
})();