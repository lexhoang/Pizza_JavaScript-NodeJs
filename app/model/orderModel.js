// bước 1: import mongoose
const mongoose = require('mongoose');

// bước 2: khai báo schema từ thư viện mongoose
const Schema = mongoose.Schema;

// bước 3: khởi tạo 1 schema với các thuộc tính được yêu cầu
const orderSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    orderCode: {
        type: String,
        unique: true,
    },
    hoTen: {
        type: String,
    },
    email: {
        type: String,
    },
    diaChi: {
        type: String,
    },
    soDienThoai: {
        type: String,
    },
    loiNhan: {
        type: String,
    },
    kichCo: {
        type: String,
        required: true,
    },
    duongKinh: {
        type: String,
        required: true,
    },
    suon: {
        type: String,
        required: true,
    },
    salad: {
        type: Number,
        required: true,
    },
    loaiPizza: {
        type: String,
        required: true,
    },
    maVoucher: {
            type: String,
            ref: "voucher"
        },
    thanhTien: {
        type: Number,
        required: true,
    },
    giamGia: {
        type: Number,
        required: false,
    },
    maNuocUong: {
            type: String,
            ref: "drink"
        },
    soLuongNuoc: {
        type: String,
        required: true,
    },
    trangThai: {
        type: String,
        required: true,
    },
    ngayTao: {
        type: Date,
        default: Date.now()
    },
    ngayCapNhat: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model("orders", orderSchema)