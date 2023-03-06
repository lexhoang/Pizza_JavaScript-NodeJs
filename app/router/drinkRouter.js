// khởi tạo bộ thư viện
const express = require('express');

// import drink controller
const { createDrink, getAllDrink, getDrinkById, updateDrinkById, deleteDrinkById, getDrinkByModel } = require('../controller/drinkController')

//khởi tạo router
const drinkRouter = express.Router();

drinkRouter.get("/drinks", getAllDrink)

drinkRouter.post("/drinks", createDrink)

drinkRouter.get("/drinks/:drinkId", getDrinkById)

drinkRouter.put("/drinks/:drinkId", updateDrinkById)

drinkRouter.delete("/drinks/:drinkId", deleteDrinkById);

// get drink by drink model
drinkRouter.post('/devcamp-pizza365/drinks', getDrinkByModel)

// export dữ liệu thành 1 module
module.exports = drinkRouter;