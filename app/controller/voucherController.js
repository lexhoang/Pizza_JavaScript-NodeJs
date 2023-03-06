// import voucher model
const voucherModel = require('../model/voucherModel');

// import mongoose
const mongoose = require('mongoose');
// tạo mã voucher
const createVoucher = (request, response) => {
    //b1: thu thập dữ liệu
    let bodyRequest = request.body;
    //b2: validate dữ liệu
    if (!bodyRequest.maVoucher) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "maVoucher is require"
        })
    }
    if (!(Number.isInteger(bodyRequest.phanTramGiamGia)) && bodyRequest.phanTramGiamGia > 0) {
        response.status(400).json({
            status: "Error 400: Bad Request",
            message: "phanTramGiamGia is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    let createVoucher = {
        _id: mongoose.Types.ObjectId(),
        maVoucher: bodyRequest.maVoucher,
        phanTramGiamGia: bodyRequest.phanTramGiamGia,
    }

    voucherModel.create(createVoucher, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(201).json({
                status: "Success: Create voucher success",
                data: data
            })
        }
    })
}
// lấy tất cả voucher
const getAllVoucher = (request, response) => {
    //b1: thu thập dữ liệu
    //b2: validate dữ liệu
    //b3: thao tác với cơ sở dữ liệu
    voucherModel.find((error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get all voucher success",
                data: data
            })
        }
    })
}
// lấy voucher bằng code
const getVoucherByCode = (request, response) => {
    //b1: thu thập dữ liệu
    let maVoucher = request.query.maVoucher;
    console.log(maVoucher)
    // validate
    if (!maVoucher) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "Voucher ID is not valid"
        })
    }
    // sử dụng dữ liệu
    voucherModel.findOne({ maVoucher: request.query.maVoucher }, (error, data) => {
        console.log(data);
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get voucher by id success",
                data: data
            })
        }
    })
}
// lấy voucher theo id
const getVoucherById = (request, response) => {
    //b1: thu thập dữ liệu
    let voucherId = request.params.voucherId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        response.status(400).json({
            status: "Error 400: bad request",
            message: "Voucher ID is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    voucherModel.findById(voucherId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever Error",
                message: error.message
            })
        }
        else {
            response.status(200).json({
                status: "Success: Get voucher by id success",
                data: data
            })
        }
    })
}
// cập nhật voucher theo id
const updateVoucherById = (request, response) => {
    //b1: thu thập dữ liệu
    let voucherId = request.params.voucherId;
    let voucherBody = request.body;
    //b2: thu thập dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "voucher id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    let voucherUpdate = {
        maVoucher: voucherBody.maVoucher,
        phanTramGiamGia: voucherBody.phanTramGiamGia,
        ghiChu: voucherBody.ghiChu
    }
    voucherModel.findByIdAndUpdate(voucherId, voucherUpdate, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            response.status(200).json({
                status: "Success: Update voucher success",
                data: data
            })
        }
    })

}
// xóa voucher dựa vào id
const deleteVoucherById = (request, response) => {
    //b1: thu thập dữ liệu
    let voucherId = request.params.voucherId;
    //b2: validate dữ liệu
    if (!mongoose.Types.ObjectId.isValid(voucherId)) {
        response.status(400).json({
            status: "Error 400: Bad request",
            message: "Voucher Id is not valid"
        })
    }
    //b3: thao tác với cơ sở dữ liệu
    voucherModel.findByIdAndDelete(voucherId, (error, data) => {
        if (error) {
            response.status(500).json({
                status: "Error 500: Internal sever error",
                message: error.message
            })
        } else {
            response.status(204).json({
                status: "Success: Delete voucher success"
            })
        }
    })
}

// export controller thành 1 module là 1 object gồm các hàm
module.exports = {
    createVoucher: createVoucher,
    getAllVoucher: getAllVoucher,
    getVoucherById: getVoucherById,
    updateVoucherById: updateVoucherById,
    deleteVoucherById: deleteVoucherById,
    getVoucherByCode: getVoucherByCode
}