import { check, oneOf, body, validationResult, header } from "express-validator";
import UsersModel from "../models/Users.model";

const authValidator = {};

authValidator.register = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("Tài khoản không được trống.")
    .custom(async (username) => {
      const existUser = await UsersModel.findOne({ username: username });
      if (existUser) {
        throw new Error("Tài khoản đẵ tồn tại.");
      }
    }),
  body("email")
    .isEmail()
    .withMessage("Email không hợp lệ.")
    .notEmpty()
    .withMessage("Email không được trống.")
    .custom(async (email) => {
      const existUser = await UsersModel.findOne({ email: email });
      if (existUser) {
        throw new Error("Email đẵ tồn tại.");
      }
    }),
  body("password", "Mật khẩu không được trống.").not().isEmpty(),
  function (req, res, next) {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        ...error,
      });
    }
  },
];

authValidator.login = [
  body("user", "Tài khoản, Email không được trống.").notEmpty(),
  body("password", "Mật khẩu không được trống.").notEmpty(),
  function (req, res, next) {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        ...error,
      });
    }
  },
];

authValidator.refreshToken = [
  body("token", "Token is required.").notEmpty(),
  function (req, res, next) {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        ...error,
      });
    }
  },
];

authValidator.logout = [
  header("x-access-token", "Token is required.").notEmpty(),
  function (req, res, next) {
    try {
      validationResult(req).throw();
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        ...error,
      });
    }
  },
];

export default authValidator;
