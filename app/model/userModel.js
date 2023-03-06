// bước 1: import mongoose
const mongoose = require('mongoose');

// bước 2: khai báo schema từ thư viện mongoose
const Schema = mongoose.Schema;

// bước 3: khởi tạo 1 schema với các thuộc tính được yêu cầu
const userSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        unique: false,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "orders"
        }
    ],
    ngayTao: {
        type: Date,
        default: Date.now()
    },
    ngayCapNhat: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("user", userSchema)