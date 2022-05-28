import mongoose from "mongoose";
import TopicModel from "../models/Topic.model";

const TopicController = {};

TopicController.getAll = async (req, res) => {
  try {
    const topics = await TopicModel.find({
      userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
    })
      .select("title _id")
      .sort("title");
    return res.status(200).json({
      success: true,
      data: { topics: topics },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error,
    });
  }
};

TopicController.addTopic = async (req, res) => {
  const { title } = req.body;
  const userId = req.JWTDecode.userId;
  const Topic = new TopicModel({
    title: title,
    userId: mongoose.Types.ObjectId(userId),
  });
  return Topic.save()
    .then((newTopic) => {
      return res.status(200).json({
        success: true,
        message: "Tạo chủ đề thành công.",
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error,
      });
    });
};

export default TopicController;
