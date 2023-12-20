const db = require('../../config/db');
const bcrypt = require('bcrypt');

exports.create = async (req) =>{
    let message = 'Something went wrong',code = 500,data = [];
    const password = await bcrypt.hash(req.password,10);
    try {
        const user = await db.query(
            `INSERT INTO user(username,email,password) VALUES(?,?,?)`,[req.username,req.email,password]
        );
        message = "Error in creating user",code = 404,data = [];
        if(user.affectedRows){
            message = "task created successfully",
            code = 201,
            data = user
        }
    } catch (error) {
        message = error;
    }

    return {message,data,code};
}

exports.get_user_by_id = async (id) =>{
    let message = 'Something went wrong',code = 500,data = [];
    try {
        const user = await db.query(
            `SELECT * FROM user WHERE id = ?`,[id]
        );
        message = "No user found",code = 404,data = [];
        if(user.length) {
            message = "USer fetched successfuly",
            code = 200,
            data = user[0];
        }
    } catch (error) {
        message = error;
    } 
    return {message,code,data};
}

exports.get_user_by_email = async (email) =>{
    let message = 'Something went wrong',code = 500,data = [];
    try {
        const user = await db.query(
            `SELECT * FROM user WHERE email = ?`,[email]
        );
        message = "No user found",code = 404,data = [];
        if(user.length) {
            message = "USer fetched successfuly",
            code = 200,
            data = user[0];
        }
        
    } catch (error) {
        message = error;
    } 
    return { message, code, data };
}


exports.getAllUSer = async () =>{
    let message = "Something went wrong",code = 500,data = [];
    try {
        const user = await db.query(
            `SELECT * FROM user`
        );
        message = "No user found",code = 404,data = [];
        if(user.length > 0){
            message = "user list fetched successfully",
            code = 200,
            data = user
        }
    } catch (error) {
        message = error;
    }
    return {message,code,data};
}