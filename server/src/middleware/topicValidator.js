import { body, validationResult } from "express-validator";
import TopicModel from "../models/Topic.model";
import mongoose from "mongoose";

const topicValidator = {};

topicValidator.addTopic = [
  body("title", "Tên chủ đề không được trống.").notEmpty(),
  async function (req, res, next) {
    try {
      validationResult(req).throw();
      const existTopic = await TopicModel.findOne({
        title: req.body.title,
        userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
      });
      if (existTopic) {
        throw {
          errors: {
            value: req.body.title,
            msg: "Topic đã tồn tại.",
            param: "title",
            location: "body"
          },
        };
      } else {
        next();
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        ...error,
      });
    }
  },
];

export default topicValidator;
