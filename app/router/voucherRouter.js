// khởi tạo bộ thư viện
const express = require('express');

const { createVoucher, getAllVoucher, getVoucherByCode, getVoucherById, updateVoucherById, deleteVoucherById } = require('../controller/voucherController')

//khởi tạo router
const voucherRouter = express.Router();

voucherRouter.get("/vouchers", getAllVoucher)

voucherRouter.post("/vouchers", createVoucher)

voucherRouter.get("/vouchers/:voucherId", getVoucherById)

voucherRouter.get("/voucherCode", getVoucherByCode)

voucherRouter.put("/vouchers/:voucherId", updateVoucherById)

voucherRouter.delete("/vouchers/:voucherId", deleteVoucherById)

// export dữ liệu thành 1 module
module.exports = voucherRouter;