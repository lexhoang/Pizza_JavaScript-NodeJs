// khởi tạo bộ thư viện
const express = require('express');
// import controller
const { createNewOrder, getAllOrder, getOrderById, updateOrderById, deleteOrderById } = require('../controller/orderController');
//khởi tạo router
const orderRouter = express.Router();

// create new order
orderRouter.post('/devcamp-pizza365/orders', createNewOrder)

// get all orders
orderRouter.get("/orders", getAllOrder);

// get order by id
orderRouter.get("/orders/:orderId", getOrderById);

//update order by id
orderRouter.put("/orders/:orderId", updateOrderById);

//delete order by id
orderRouter.delete("/orders/:orderId", deleteOrderById);

// export dữ liệu thành 1 module
module.exports = orderRouter