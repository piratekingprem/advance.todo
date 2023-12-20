const express = require("express");
const router  = express.Router();

// verify token
const verify = require('../middleware/verifyToken');
//controller 
const taskController = require('../controller/taskController')
const userController = require('../controller/userController')

// Routes for tasks 
router.get('/task/:user_id',verify,taskController.getAllTask);
router.post('/task',verify,taskController.createTask);
router.put('/task/:id',verify,taskController.editTask);
router.put('/task/status/:id',verify,taskController.createStatus);
router.delete('/task/:id',verify,taskController.deleteTask);

// Routes for user
router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports = router; 