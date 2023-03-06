// import drink model vào controller
const drinkModel = require('../model/drinkModel');
// import mongoose
const mongoose = require('mongoose');

//KHAI BÁO API

// CREATE NEW DRINK
const createDrink = (request, response) => {
    //b1: thu thập dữ liệu
    let bodyRequest = request.body;
    console.log(bodyRequest)
        //b2: validate dữ liệu
    if (!bodyRequest.maNuocUong) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "maNuocUong is require"
        })
    }

    if (!bodyRequest.tenNuocUong) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "tenNuocUong is require"
        })
    }

    if (!(Number.isInteger(bodyRequest.donGia)) && bodyRequest.donGia > 0) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "donGia is not valid"
        })
    }

    //b3: thao tác với cơ sở dữ liệu
    let createDrink = {
        _id: mongoose.Types.ObjectId(),
        maNuocUong: bodyRequest.maNuocUong,
        tenNuocUong: bodyRequest.tenNuocUong,
        donGia: bodyRequest.donGia
    }

    drinkModel.create(createDrink, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(201).json({
                status: "Success: Create drink success",
                data: data
            })
        }
    })
}

// GET ALL DRINKS
const getAllDrink = (request, response) => {
    //b1: thu thập dữ liệu
    //b2: validate dữ liệu
    //b3: thao tác với cơ sở dữ liệu
    drinkModel.find((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Get all drink success",
                data: data
            })
        }
    })
}

// GET DRINK BY ID
const getDrinkById = (request, response) => {
    //b1: thu thập dữ liệu
    let drinkId = request.params.drinkId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "Drink ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    drinkModel.findById(drinkId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Get drink by id success",
                data: data
            })
        }
    })
}

//UPDATE DRINK BY ID
const updateDrinkById = (request, response) => {
    //b1: thu thập dữ liệu
    let drinkId = request.params.drinkId;
    let drinkBody = request.body;
    //b2: thu thập dữ liệu
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "drink id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    let drinkUpdate = {
        maNuocUong: drinkBody.maNuocUong,
        tenNuocUong: drinkBody.tenNuocUong,
        donGia: drinkBody.donGia
    }
    drinkModel.findByIdAndUpdate(drinkId, drinkUpdate, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Update drink success",
                data: data
            })
        }
    })

}

// DELETE DRINK BY ID
const deleteDrinkById = (request, response) => {
    //b1: thu thập dữ liệu
    let drinkId = request.params.drinkId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(drinkId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "Drink Id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    drinkModel.findByIdAndDelete(drinkId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            response.status(204).json({
                status: "Success: Delete drink success"
            })
        }
    })
}

// GET DRINK REF
const getDrinkByModel = (request, response) => {
    //b1: thu thập dữ liệu
    let bodyRequest = request.body;
    //b2: validate dữ liệu
    if (!bodyRequest.maNuocUong) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "maNuocUong is require"
        })
    }

    if (!bodyRequest.tenNuocUong) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "tenNuocUong is require"
        })
    }

    if (!(Number.isInteger(bodyRequest.donGia)) && bodyRequest.donGia > 0) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "donGia is not valid"
        })
    }

    //b3: thao tác với cơ sở dữ liệu
    let createDrink = {
        _id: mongoose.Types.ObjectId(),
        maNuocUong: bodyRequest.maNuocUong,
        tenNuocUong: bodyRequest.tenNuocUong,
        donGia: bodyRequest.donGia
    }

    drinkModel.create(createDrink, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(201).json({
                status: "Success: Create drink success",
                data: data
            })
        }
    })
}

// EXPORT
module.exports = {
    createDrink,
    getAllDrink,
    getDrinkById,
    updateDrinkById,
    deleteDrinkById,
    getDrinkByModel
}