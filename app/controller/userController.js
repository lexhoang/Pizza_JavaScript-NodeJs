// import modal user
const userModel = require('../model/userModel');
// import mongoose
const mongoose = require('mongoose');

// createUser
const createUser = (request, response) => {
    // b1 thu thập dữ liệu
    let body = request.body;
    // b2 validate
    if (!body.fullName) {
        response.status(400).json({
            message: "fullName is required!"
        })
    } else if (!body.address) {
        response.status(400).json({
            message: "address is required!"
        })
    } else if (!body.email) {
        response.status(400).json({
            message: "email is required!"
        })
    } else if (!body.phone) {
        response.status(400).json({
            message: "phone is required!"
        })
    } else {
        let user = {
            _id: mongoose.Types.ObjectId(),
            fullName: body.fullName,
            email: body.email,
            address: body.address,
            phone: body.phone,
        }
        userModel.create(user, (error, data) => {
            if (error) {
                response.status(500).json({
                    message: `Internal server error: ${error.message}`
                })
            } else {
                response.status(201).json({
                    status: "Success: Create user success",
                    data: data
                })
            }
        });
    }
};

// lấy tất cả user
const getAllUser = (request, response) => {
    //b1: thu thập dữ liệu
    //b2: validate dữ liệu
    //b3: thao tác với cơ sở dữ liệu
    userModel.find((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Get all user success",
                data: data
            })
        }
    })
}

// lấy user theo id
const getUserById = (request, response) => {
    //b1: thu thập dữ liệu
    let userId = request.params.userId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "Drink ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    userModel.findById(userId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Get user by id success",
                data: data
            })
        }
    })
}

// upadte user theo id
// cập nhật user theo id
const updateUserById = (request, response) => {
    //b1: thu thập dữ liệu
    let userId = request.params.userId;
    let body = request.body;
    //b2: thu thập dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "drink id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    let userUpdate = {
        fullName: body.fullName,
        email: body.email,
        address: body.address,
        phone: body.phone,
    }
    userModel.findByIdAndUpdate(userId, userUpdate, (error, data) => {
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

// xóa user dựa vào id
const deleteUserById = (request, response) => {
    //b1: thu thập dữ liệu
    let userId = request.params.userId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "user Id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    userModel.findByIdAndDelete(userId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            response.status(204).json({
                status: "Success: Delete user success"
            })
        }
    })
}
module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById,
}