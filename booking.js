'use strict'

const finalizeOrder = document.querySelector('.section-blank_Container-rightDiv');
const confirmOrderBtn = document.querySelector('.section-blank_Container-rightDiv-button'); 
const bookOrder = document.querySelector('.bookOrder');
const nameField = document.querySelector('.nameField');
const addressField = document.querySelector('.addressField');
const contactField = document.querySelector('.contactField');
let list;

(function(){
    console.log(localStorage.itemList);
    if(localStorage.itemList != undefined && localStorage.itemList != [])
    {
        let totalItems = 0, totalPrice = 0;
        list = JSON.parse(localStorage.itemList);

        for(let i of list){
            let itemTotalPrice = 0;

            itemTotalPrice += Number(i.price) * i.qty;
            totalPrice += itemTotalPrice;
            finalizeOrder.insertAdjacentHTML('afterbegin',
            `<div class="cart-itemInfo">
                <div class="cart-itemInfo-img"><img class='cart-Img' src="${i.img}" alt=""></div>
                <div class="cart-itemInfo-detail">
                <p class="cart-itemInfo-p1">${i.bundleName}</p>
                <p class="cart-itemInfo-p2">${i.name}</p>
                </div>
                <div class="cart-itemInfo-price">
                    <p>Qty x ${i.qty}</p>
                    <p>Rs ${i.price}</p>
                </div>
            </div>`);
        }
        finalizeOrder.insertAdjacentHTML("afterbegin", 
        `<div>
            <span>My Cart</span> <spna>Rs ${totalPrice}</span>
        </div>`);
    }
})();

bookOrder.addEventListener('click', function(){
    if(localStorage.orders != undefined && localStorage.orders != []){
        let orders = JSON.parse(localStorage.orders);
        pushingOrders(orders);
    }
    else
        pushingOrders();
});

const pushingOrders = function(orders = []){

    const id = Math.floor(Math.random() * 100);

    orders.push({
        id,
        name: nameField.value,
        address: addressField.value,
        contact: contactField.value,
        items: list
    });

    localStorage.orders = JSON.stringify(orders);
    console.log(orders);
};

confirmOrderBtn.addEventListener('click', function(){
    document.querySelector('.modal').classList.remove('hideModal');
});

document.querySelector('.modal-CloseBtn').addEventListener('click', function(){
    document.querySelector('.modal').classList.add('hideModal');
    event.stopPropagation();

});

document.querySelector('.modal').addEventListener('click', function(){
    this.classList.add('hideModal');
});

document.querySelector('.modal-UserInfo').addEventListener('click', function(){
    document.querySelector('.modal').classList.remove('hideModal');
    event.stopPropagation();
});