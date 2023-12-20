const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const { use } = require('../rotues/api');
require('dotenv').config()


exports.getAllUser = async function (req, res, next) {
    try {
        const response = await userModel.getAllUSer();
        return res.send(response);
    } catch (error) {
        next(error);
    }
}

exports.get_user_id = async function (req,res,next) {
    try {
        const response = await userModel.get_user_by_id(req.params.id);
        return res.send(response);
    } catch (error) {
        next(error);
    }
}

exports.login = async function (req, res, next) {
    try {
        const user = await userModel.get_user_by_email(req.body.email);
        const isPasswordValid = await bcrypt.compare(req.body.password, user.data.password);
        const message = isPasswordValid ? 'Password is valid' : 'Password is not valid';
        const status = isPasswordValid ? 200 : 401;
        if (isPasswordValid) {
            const privateKey = process.env.API_SECRET;
            const token = await jwt.sign({ userId: user.data.id }, privateKey, { expiresIn: "8h" });
            const refreshToken = await jwt.sign({ userId: user.data.id }, privateKey, { expiresIn: "30d" });
            return res.status(status).json({
                "message": message,
                "token": token,
                "refresh_token": refreshToken,
                "username": user.data.username,
                "userID":user.data.id,
                "userEmail": user.data.email,
                "code": status
            });
        } else {
            return res.status(status).json({
                "message": "fail",
                "code": status
            });
        }
    } catch (error) {
        next(error);
    }

}
exports.register = async function (req, res, next) {
    try {
        const response = await userModel.create(req.body);
        if (response.code == 201 && response.data.insertId !== undefined) {
            const privateKey = process.env.API_SECRET;
            const token = await jwt.sign({ userId: response.data.insertId }, privateKey, { expiresIn: "8h" });
            const refresh_token = await jwt.sign({ userId: response.data.insertId }, privateKey, { expiresIn: "30d" })
            return res.status(response.code).json({
                "message": "User registered successfully",
                "token": token,
                "refresh_token": refresh_token,
                "userId": response.data.insertId,
                "userName": req.body.name,
                "email": req.body.email,
                "code": response.code
            })
        } else {
            return res.status(response.code).json({
                "message": response.message,
                "code": response.code
            })
        }
    } catch (error) {
        next(error);
    }
}

