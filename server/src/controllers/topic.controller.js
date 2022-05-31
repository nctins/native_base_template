import mongoose from "mongoose";
import TopicModel from "../models/Topic.model";
import VocabModel from "../models/Vocab.model";

const catchError = (err, res) => {
  console.log(err);
  return res.status(500).json({
    success: false,
    message: "Server error. Please try again.",
    error: err,
  });
};

const TopicController = {};

TopicController.getAll = async (req, res) => {
  try {
    const topics = await TopicModel.find({
      userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
    })
      .select("title _id size")
      .sort("title");
    return res.status(200).json({
      success: true,
      data: { topics: topics },
    });
  } catch (error) {
    return catchError(error, res);
  }
};

TopicController.addTopic = async (req, res) => {
  const { title } = req.body;
  const userId = req.JWTDecode.userId;
  const Topic = new TopicModel({
    title: title,
    userId: mongoose.Types.ObjectId(userId),
    size: 0,
  });
  return Topic.save()
    .then((newTopic) => {
      return res.status(200).json({
        success: true,
        message: "Tạo chủ đề thành công.",
        topic: { _id: newTopic._id, title: newTopic.title },
      });
    })
    .catch((error) => {
      return catchError(error, res);
    });
};

TopicController.deleteTopic = (req, res) => {
  const topicId = req.params.topicId;
  return TopicModel.findByIdAndRemove(mongoose.Types.ObjectId(topicId))
    .then(() => {
      // console.log(topicId)
      // return res.status(200).json({
      //   success: true,
      //   message: "Xóa chủ đề thành công.",
      // });
      return VocabModel.deleteMany({
        topicId: mongoose.Types.ObjectId(topicId),
      })
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Xóa chủ đề thành công.",
          });
        })
        .catch((err) => {
          return catchError(err, res);
        });
    })
    .catch((error) => {
      return catchError(error, res);
    });
};

TopicController.topicSearch = async (req, res) => {
  try {
    const topics = await TopicModel.find({
      userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
      title: new RegExp(".*" + req.query.keySearch + ".*", "i"),
    });
    return res.status(200).json({
      success: true,
      data: topics,
    });
  } catch (error) {
    return catchError(error, res);
  }
};

export default TopicController;
