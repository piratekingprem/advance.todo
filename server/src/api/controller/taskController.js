const taskModel = require('../model/taskModel');

exports.getAllTask = async function (req,res,next){
    try {
        const response = await taskModel.get(req.params.user_id);
        return res.send(response);
    } catch (error) {
        next(error);
    }
}

exports.createTask = async function (req,res,next){
    try {
        const response = await taskModel.create(req.body);
        return res.send(response);
    } catch (error) {
        next(error);
    }
}

exports.editTask = async function (req,res,next){
    try {
        const response = await taskModel.update(req.params.id,req.body);
        return res.send(response);
    } catch (error) {
        next(error);
    }
}

exports.createStatus = async function (req,res,next){
    try {
       const response = await taskModel.updateStatus(req.body,req.params.id);
       return res.send(response);
    } catch (error) {
        next(error)
    }
}

exports.deleteTask = async function (req,res,next){
    try{
        const response = await taskModel.delete(req.params.id);
        return res.send(response);
    } catch (error){
        next(error);
    }
}