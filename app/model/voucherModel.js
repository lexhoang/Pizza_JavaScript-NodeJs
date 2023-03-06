// bước 1: import mongoose
const mongoose = require('mongoose');

// bước 2: khai báo schema từ thư viện mongoose
const Schema = mongoose.Schema;

// bước 3: khởi tạo 1 schema với các thuộc tính được yêu cầu
const voucherSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    maVoucher: {
        type: String,
        unique: true,
        required: true
    },
    phanTramGiamGia: {
        type: Number,
        required: true
    },
    ghiChu: {
        type: String,
        required: false
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
module.exports = mongoose.model("voucher", voucherSchema)