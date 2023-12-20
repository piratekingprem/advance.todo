const db = require('../../config/db');

exports.get = async (id) =>{
    let message = 'Something went wrong',data = [],code = 500;
    try{
        const task = await db.query(
            `SELECT * FROM task WHERE user_id = ${id}`
        );
        message = "No task found",code = 404,data = [];
        if(task.length){
            message = "task list fetched successfully";
            data = task;
            code = 200
        }
    } catch(error) {
        message = error;
    }

    return {message,data,code};
}

exports.create = async (req) =>{
    let message = 'Something went wrong', code = 500, data = [];
    try {
        console.log(req)
        const task = await db.query(
            `INSERT INTO task(task,user_id) VALUES (?,?)`,[req.task,req.user_id]
        );
        message = "Error in creating task",code = 404,data = [];
        if(task.affectedRows){
            message = "task is created successfully";
            code = 201;
        }
    } catch (error) {
        message = error;
    }

    return {message,code,data};
}

exports.update = async (id,params) => {
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const task = await db.query(
            `UPDATE task SET task = ? WHERE id = ?`,[params.task,id]
        );
        message = "Error in updateing task",code = 404,data = [];
        if(task.affectedRows){
            message = "Task updated successfully";
            code = 200;
            data = task
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data};
}

exports.updateStatus = async (params,id) =>{
    
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const task = await db.query(
            `UPDATE task SET status = ? WHERE id = ?`,[params.status,id]
        );
        message = "Error in updating status",code = 404,data = [];
        if(task.affectedRows){
            message = "Status updated successfully";
            code = 200;
            data = task
        }
    } catch (error) {
        message = error;
    }

    return {message,code,data};
}

exports.delete = async (id) =>{
    let message = 'Something went wrong', code = 500, data = [];
    try {
        const task = await db.query(
            `DELETE FROM task where id = ?`,[id]
        );
        message = "Error in deleting status",code = 404,data = [];
        if(task.affectedRows){
            message = "Status deleted successfully";
            code = 201;
            data = task
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data};
}