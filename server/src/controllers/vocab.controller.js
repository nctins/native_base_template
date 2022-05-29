import mongoose from "mongoose";
import VocabModel from "../models/Vocab.model";

const VocabController = {};

const catchError = (err, res) => {
  console.log(err);
  return res.status(500).json({
    success: false,
    message: "Server error. Please try again.",
    error: error,
  });
};

VocabController.getVocab = async (req, res) => {
  try {
    const vocab = await VocabModel.find({
      topicId: mongoose.Types.ObjectId(req.params.topicId),
      userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
    })
      .select("-userId -__v")
      .sort("title");
    console.log(vocab)
    return res.status(200).json({
      success: true,
      data: { vocab: vocab },
    });
  } catch (error) {
    return catchError(error, res);
  }
};

VocabController.getVocabById = async (req, res) => {
  try {
    const data = await VocabModel.findById(
      mongoose.Types.ObjectId(req.params.vocabId)
    ).select("-userId -__v");
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return catchError(error, res);
  }
};

VocabController.addVocab = async (req, res) => {
  try {
    const vocab = new VocabModel({
      title: req.body.title,
      mean: req.body.mean,
      image: "",
      note: req.body.note,
      topicId: mongoose.Types.ObjectId(req.params.topicId),
      userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
      favorites: false,
    });

    return vocab
      .save()
      .then((newVocab) => {
        return res.status(200).json({
          success: true,
          message: "Tạo từ vựng thành công.",
        });
      })
      .catch((err) => {
        return catchError(err, res);
      });
  } catch (error) {
    return catchError(err, res);
  }
};

VocabController.changeFavorite = async (req, res) => {
  return VocabModel.findById(
    mongoose.Types.ObjectId(req.params.vocabId),
    (err, vocab) => {
      if (err) {
        return catchError(err, res);
      }
      vocab.favorite = !vocab.favorite;
      vocab.save((err, updateVocab) => {
        if (err) {
          return catchError(err, res);
        }
        return res.status(200).json({
          success: true,
          message: "Thay đổi trạng thái thành công.",
        });
      });
    }
  );
};

VocabController.favorites = async (req, res) => {
  try {
    const favorites = VocabModel.find({
      userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
      favorite: true,
    })
      .select("-userId -__v")
      .sort("title");
    return res.status(200).json({
      success: true,
      data: { favorites: favorites },
    });
  } catch (error) {
    return catchError(error, res);
  }
};

export default VocabController;
