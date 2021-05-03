const express = require('express');
const cart = express.Router();

const cartArray = [
    {id: 1, product: 'Rice Krispies', price: 2.00, quantity: 2},
    {id: 2, product: 'Fish', price: 5.50, quantity: 1},
    {id: 3, product: 'Crackers', price: 1.10, quantity: 3},
    {id: 4, product: 'Fancy T-Rex Toy', price: 15.10, quantity: 10},
    {id: 5, product: 'Bacon', price: 20.10, quantity: 5}
];

cart.get('/', (req, res) => {
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : null;
    const prefix = req.query.prefix ? req.query.prefix : null;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
    let myItems = cartArray;
    if (maxPrice) {
        myItems =myItems.filter( item => item.price <= maxPrice);
    } if (prefix) {
        myItems = myItems.filter( item => item.product.toUpperCase().startsWith(prefix.toUpperCase()));
    } if (pageSize) {
        myItems =  myItems.slice(0, pageSize);
    }
    res.status(200);
    res.json(myItems);
});

cart.get('/:id', (req, res) => {
    const cartId = parseInt(req.params.id);
    const item = cartArray.find( i => i.id === cartId); {
        if(item) {
            res.status(200).send(item);
        } else {
            res.status(404);
            res.json('ID NOT FOUND');
        }
    }
});

cart.post('/', (req, res) => {
    const newId = cartArray[cartArray.length -1].id + 1;
    const newItem = {
        id: newId,
        product: req.body.product,
        quantity: req.body.quantity,
        price: req.body.price
    };
    cartArray.push(newItem);
    res.send(cartArray);
});

//this update logic had not been implemeted in front end yes
cart.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCart = cartArray.findIndex(i => i.id === id);
    cartArray[indexOfCart].product = req.body.product;
    cartArray[indexOfCart].price = req.body.price;
    cartArray[indexOfCart].quantity = req.body.quantity;
    res.status(200).json(cartArray[indexOfCart]);
})

cart.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indexOfCart = cartArray.findIndex(i => i.id === id);
    cartArray.splice(indexOfCart, 1).id -1;
    res.send(cartArray);
});

module.exports = cart;