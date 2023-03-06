// bước 1: import mongoose
const mongoose = require('mongoose');

// bước 2: khai báo schema từ thư viện mongoose
const Schema = mongoose.Schema;

// bước 3: khởi tạo 1 schema với các thuộc tính được yêu cầu
const drinkSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    maNuocUong: {
        type: String,
        required: true
    },
    tenNuocUong: {
        type: String,
        required: true
    },
    donGia: {
        type: Number,
        required: true
    },
    ngayTao: {
        type: Date,
        default: Date.now()
    },
    ngayCapNhat: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("drink", drinkSchema)