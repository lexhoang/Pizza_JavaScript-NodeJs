//Khai báo thư viện express
const express = require('express');

const mongoose = require('mongoose');


const drinkRouter = require('./app/router/drinkRouter');
const voucherRouter = require('./app/router/voucherRouter');
const userRouter = require('./app/router/userRouter');
const orderRouter = require('./app/router/orderRouter');

// Khai báo thư viện path
const path = require('path');


//Khỏi tạo app  nodeJS
const app = new express();

//Khai báo middleware json
app.use(express.json());

//Khai báo middleware đọc dữ liệu UTF-8
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(__dirname + '/view'));

//  Khai báo cổng chạy nodejs
const port = 8000;

mongoose.connect("mongodb://localhost:27017/CRUD_Pizza365", (err) => {
    if (err) {
        throw err;
    }

    console.log("Connect MongoDB successfully!");
})

app.get('/', (request, response) => {
    console.log(__dirname);
    response.sendFile(path.join(__dirname + "/view/Order_Pizza.html"))
});

app.get('/admin', (request, response) => {
    console.log(__dirname);
    response.sendFile(path.join(__dirname + "/view/Order_List.html"))
});

// Sử dụng router
app.use('/', drinkRouter);
app.use('/', voucherRouter);
app.use('/', userRouter);
app.use('/', orderRouter);

// Khai báo chạy trên cổng nodeJS
app.listen(port, () => {
    console.log(`App chạy trên cổng ${port}`);
})