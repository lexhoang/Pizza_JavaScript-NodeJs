// import mongoose
const mongoose = require('mongoose');
// import modal
const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');
// const drinkModel = require('../model/drinkModel');
// const voucherModel = require('../model/voucherModel');

//KHAI BÁO API

// CREATE NEW ORDER
const createNewOrder = (request, response) => {
    //b1 thu thập dữ liệu
    let body = request.body;
    //b2 sử dụng cơ sở dữ liệu
    //tìm kiếm xem email user có tồn tại không
    userModel.findOne({
        email: request.query.email
    }, (errorFindUser, userExist) => {
        // nếu xảy ra lỗi thì trả về lỗi 500
        if (errorFindUser) {
            return response.status(500).json({
                status: "Error 500: Internal server error",
                message: errorFindUser.message
            })
        } else {
            // nếu không tồn tại thì tạo user mới và order mới
            if (!userExist) {
                // tạo user mới
                userModel.create({
                    _id: mongoose.Types.ObjectId(),
                    fullName: body.fullName,
                    email: body.email,
                    address: body.address,
                    phone: body.phone,
                }, (error, userData) => {
                    if (error) {
                        response.status(500).json({
                            status: "Error 500: Internal sever Error",
                            message: error.message
                        })
                    } else {
                        orderModel.create({
                            _id: mongoose.Types.ObjectId(),
                            orderCode: Math.random().toString(36).substring(1, 8),
                            hoTen: userData.fullName,
                            email: userData.email,
                            diaChi: userData.address,
                            soDienThoai: userData.phone,
                            loiNhan: body.loiNhan,
                            kichCo: body.kichCo,
                            duongKinh: body.duongKinh,
                            suon: body.suon,
                            salad: body.salad,
                            loaiPizza: body.loaiPizza,
                            maVoucher: body.maVoucher,
                            thanhTien: body.thanhTien,
                            giamGia: body.giamGia,
                            maNuocUong: body.maNuocUong,
                            soLuongNuoc: body.soLuongNuoc,
                            trangThai: body.trangThai,
                        }, (error, orderData) => {
                            if (error) {
                                response.status(500).json({
                                    status: "Error 500: Internal sever Error",
                                    message: error.message
                                })
                            } else {
                                response.status(200).json({
                                    status: "Success: create orders success",
                                    data: {
                                        _id: orderData._id,
                                        orderCode: orderData.orderCode,
                                        kichCo: orderData.kichCo,
                                        duongKinh: orderData.duongKinh,
                                        suon: orderData.suon,
                                        salad: orderData.salad,
                                        loaiPizza: orderData.loaiPizza,
                                        maVoucher: orderData.maVoucher,
                                        thanhTien: orderData.thanhTien,
                                        giamGia: orderData.giamGia,
                                        maNuocUong: orderData.maNuocUong,
                                        soLuongNuoc: orderData.soLuongNuoc,
                                        hoTen: userData.fullName,
                                        email: userData.email,
                                        diaChi: userData.address,
                                        soDienThoai: userData.phone,
                                        loiNhan: orderData.loiNhan,
                                        trangThai: orderData.trangThai,
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                orderModel.create({
                    _id: mongoose.Types.ObjectId(),
                    orderCode: Math.random().toString(36).substring(1, 8),
                    hoTen: userExist.fullName,
                    email: userExist.email,
                    diaChi: userExist.address,
                    soDienThoai: userExist.phone,
                    kichCo: body.kichCo,
                    duongKinh: body.duongKinh,
                    suon: body.suon,
                    salad: body.salad,
                    loaiPizza: body.loaiPizza,
                    maVoucher: body.maVoucher,
                    giamGia: body.giamGia,
                    thanhTien: body.thanhTien,
                    maNuocUong: body.maNuocUong,
                    soLuongNuoc: body.soLuongNuoc,
                    loiNhan: body.loiNhan,
                    trangThai: body.trangThai,
                }, (error, orderData) => {
                    if (error) {
                        response.status(500).json({
                            status: "Error 500: Internal sever Error",
                            message: error.message
                        })
                    } else {
                        userModel.findByIdAndUpdate(userExist._id, { $push: { orders: orderData._id } }, (error, userData) => {
                            response.status(200).json({
                                status: "Success: create orders success",
                                data: {
                                    _id: userExist._id,
                                    orderCode: orderData.orderCode,
                                    kichCo: orderData.kichCo,
                                    duongKinh: orderData.duongKinh,
                                    suon: orderData.suon,
                                    salad: orderData.salad,
                                    loaiPizza: orderData.loaiPizza,
                                    maVoucher: orderData.maVoucher,
                                    thanhTien: orderData.thanhTien,
                                    giamGia: orderData.giamGia,
                                    maNuocUong: orderData.maNuocUong,
                                    soLuongNuoc: orderData.soLuongNuoc,
                                    hoTen: userExist.fullName,
                                    email: userExist.email,
                                    diaChi: userExist.address,
                                    soDienThoai: userExist.phone,
                                    loiNhan: orderData.loiNhan,
                                    trangThai: orderData.trangThai,
                                }
                            })
                        })
                    }
                })
            }
        }
    })
}

// GET ALL ORDERS
const getAllOrder = (request, response) => {

    //b3: thao tác với cơ sở dữ liệu
    orderModel.find((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Get all orders success",
                data: data
            })
        }
    })
}

// GET ORDER BY ID
const getOrderById = (request, response) => {
    //b1: thu thập dữ liệu
    let orderId = request.params.orderId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "order ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    orderModel.findById(orderId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Get order by id success",
                data: data
            })
        }
    })
}

//UPDATE ORDER BY ID
const updateOrderById = (request, response) => {
    //b1: thu thập dữ liệu
    let orderId = request.params.orderId;
    let body = request.body;
    //b2: thu thập dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "order id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    let orderUpdate = {
        loiNhan: body.loiNhan,
        kichCo: body.kichCo,
        duongKinh: body.duongKinh,
        suon: body.suon,
        salad: body.salad,
        loaiPizza: body.loaiPizza,
        maVoucher: body.maVoucher,
        thanhTien: body.thanhTien,
        giamGia: body.giamGia,
        maNuocUong: body.maNuocUong,
        soLuongNuoc: body.soLuongNuoc,
        trangThai: body.trangThai,
    }
    orderModel.findByIdAndUpdate(orderId, orderUpdate, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Update order success",
                data: data
            })
        }
    })
}

// DELETE ORDER BY ID
const deleteOrderById = (request, response) => {
    //b1: thu thập dữ liệu
    let orderId = request.params.orderId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "order Id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    orderModel.findByIdAndDelete(orderId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            response.status(204).json({
                status: "Success: Delete order success"
            })
        }
    })
}



// EXPORT
module.exports = {
    createNewOrder,
    getAllOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById,
}

// {
//     "orderCode": "t1bUpWZSlq",
//     "kichCo": "M",
//     "duongKinh": "25",
//     "suon": 4,
//     "salad": 300,
//     "loaiPizza": "seafood",
//     "maVoucher":"888888",
//     "thanhTien": 200000,
//     "giamGia": 50,
//     "maNuocUong": "COCA",
//     "soLuongNuoc": 3,
//     "hoTen": "hoangbeo",
//     "email": "hoangbeo@gmail.com",
//     "soDienThoai": "0123487654",
//     "diaChi": "asd2",
//     "loiNhan": "",
//     "trangThai": "open"
// }