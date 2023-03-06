// khởi tạo bộ thư viện
const express = require('express');
// import module
const { createUser, getAllUser, getUserById, updateUserById, deleteUserById } = require('../controller/userController')
    //khởi tạo router
const userRouter = express.Router();
// create new user
userRouter.post("/users", createUser);
// get all user
userRouter.get("/users", getAllUser)
    // get user by id
userRouter.get("/users/:userId", getUserById)
    // get user update by id
userRouter.put("/users/:userId", updateUserById)
    // delete user
userRouter.delete("/users/:userId", deleteUserById)

// export dữ liệu thành 1 module
module.exports = userRouter;