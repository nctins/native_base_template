import jwt, { TokenExpiredError } from 'jsonwebtoken';
import {header, validationResult} from 'express-validator';
import authConfig from '../configs/authConfig';

const authJWT =  {}

const catchError = (err, res) => {
    if(err instanceof TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "expired_token"
        });
    }
    return res.status(401).json({
        success: false,
        message: "Unauthorized"
    });
}

authJWT.verifyToken = [
    header("x-access-token", "").notEmpty(),
    function (req, res, next) {
        try {
            validationResult(req).throw();
            jwt.verify(req.headers["x-access-token"], authConfig.secret, (err, data)=>{
                if(err) {return catchError(err, res);}
                req.JWTDecode = data;
                next();
            })
        } catch (error) {
            res.status(400).json({
            success: false,
            ...error,
        });
        }
    }
]

export default authJWT