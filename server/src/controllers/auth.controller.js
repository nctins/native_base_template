import mongoose from "mongoose";
import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import jwt from "jsonwebtoken";
import UsersModel from "../models/Users.model";
import authConfig from "../configs/authConfig";

const AuthController = {};

AuthController.register = async (req, res) => {
  const hashPass = bcrypt.hashSync(req.body.password, 10);
  const user = new UsersModel({
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
  });

  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "Đăng ký thành công",
        user: {
          username: newUser.username,
          email: newUser.email,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error,
      });
    });
};

AuthController.login = async (req, res) => {
  const condition = emailValidator.validate(req.body.user)
    ? { email: req.body.user }
    : { username: req.body.user };
  const user = await UsersModel.findOne(condition);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Email, tài khoản không chính xác.",
    });
  }
  const password = req.body.password;
  if (bcrypt.compareSync(password, user.password)) {
    let payload = {
      username: user.username,
      email: user.email,
    };
    let options = { expiresIn: authConfig.jwtExpiration };
    let secret = authConfig.secret;

    let accessToken = await jwt.sign(payload, secret, options);
    let refreshToken = await jwt.sign(payload, authConfig.RTSecret, {
      expiresIn: authConfig.jwtRefreshExpiration,
    });
    await UsersModel.updateOne(condition, { refreshToken: refreshToken });

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công.",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Mật khẩu không chính xác.",
    });
  }
};

AuthController.logout = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decode = jwt.verify(token, authConfig.secret);
    await UsersModel.updateOne({ email: decode.email }, { refreshToken: "" });
    return res.status(200).json({
      success: true,
      message: "Đăng xuất thành công.",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      ...error,
    });
  }
};

AuthController.refreshToken = async (req, res) => {
  const token = req.body.refreshToken;

  try {
    const decode = jwt.verify(token, authConfig.RTSecret);
    const user = await UsersModel.findOne({ email: decode.email });
    if (token === user.refreshToken) {
      const accessToken = await jwt.sign(
        { username: decode.username, email: decode.email },
        authConfig.secret,
        { expiresIn: authConfig.jwtExpiration }
      );
      return res.status(200).json({
        success: true,
        accessToken: accessToken,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Wrong refreshToken.",
      });
    }
  } catch (error) {
      return res.status(400).json({
          success: false,
          ...error
      });
  }
};

export default AuthController;
