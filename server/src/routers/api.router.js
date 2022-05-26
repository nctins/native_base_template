import express from 'express';
import AuthController from '../controllers/Auth.controller';
import authValidator from '../middleware/authValidator';
import authJWT from '../middleware/authJWT';
import { json } from 'body-parser';

const APIRouter = express.Router();

APIRouter.post('/register', authValidator.register, AuthController.register)
APIRouter.post('/login', authValidator.login, AuthController.login)
APIRouter.post('/logout', authValidator.logout, AuthController.logout)
APIRouter.post('/refreshToken',authValidator.refreshToken, AuthController.refreshToken)

APIRouter.post('/test', authJWT.verifyToken, (req,res)=>{
    res.status(200).json({
        success: true,
        message: "this is test api",
        JWTDecode: req.JWTDecode
    })
})

export default APIRouter