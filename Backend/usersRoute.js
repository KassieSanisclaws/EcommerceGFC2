const express =require("express");
const usersRoute =express.Router();
const usersController =require("../Controllers/usersController");


// usersRoute Listed Below. //
////////////////////////////////////////////////////
// getUsersList From Database. //
usersRoute.get('/', usersController.getUsersList);

// getUserByID from Database. //
//usersRoute.get('/:id', usersController.getUserByID);

// userLogin Validation Through Bcrypt. //
//usersRoute.post('/login', usersController.loginUser);

// register New Users In Database. //
usersRoute.post('/register', usersController.createNewUser);

// update User Profile. //
//usersRoute.put('/profile', usersController.userProfile);

// delete User From In Database. //

module.exports = usersRoute;


