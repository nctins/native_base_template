import mongoose from "mongoose";
import TopicModel from "../models/Topic.model";
import VocabModel from "../models/Vocab.model";

const VocabController = {};

const catchError = (err, res) => {
  console.log(err);
  return res.status(500).json({
    success: false,
    message: "Server error. Please try again.",
    error: err,
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
      favorite: false,
    });

    return vocab
      .save()
      .then((newVocab) => {
        return TopicModel.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.params.topicId),
          { $inc: { size: 1 } }
        )
          .then(() => {
            return res.status(200).json({
              success: true,
              message: "Tạo từ vựng thành công.",
            });
          })
          .catch((err) => {
            return catchError(err, res);
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
  const vocab = await VocabModel.findById(
    mongoose.Types.ObjectId(req.params.vocabId)
  );
  const newFavor = !vocab.favorite;
  return VocabModel.updateOne({ _id: vocab._id }, { favorite: newFavor })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Thay đổi trạng thái thành công.",
        newStatus: newFavor,
      });
    })
    .catch((e) => {
      return catchError(e, res);
    });
};

VocabController.favorites = async (req, res) => {
  try {
    const favorites = await VocabModel.find({
      userId: mongoose.Types.ObjectId(req.JWTDecode.userId),
      favorite: true,
    })
      .select("-userId -__v")
      .sort("title");
    return res.status(200).json({
      success: true,
      favorites: favorites,
    });
  } catch (error) {
    return catchError(error, res);
  }
};

VocabController.updateVocab = (req, res) => {
  const data = {
    title: req.body.title,
    mean: req.body.mean,
    image: "",
    note: req.body.note,
  };
  return VocabModel.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.vocabId),
    data
  )
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Cập nhật từ vựng thành công",
      });
    })
    .catch((err) => {
      return catchError(err, res);
    });
};

VocabController.removeVocab = async (req, res) => {
  const vocab = await VocabModel.findById(
    mongoose.Types.ObjectId(req.params.vocabId)
  );
  const topicId = vocab.topicId;
  return VocabModel.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.vocabId)
  )
    .then(async () => {
      await TopicModel.findByIdAndUpdate(mongoose.Types.ObjectId(topicId), {
        $inc: { size: -1 },
      }).exec();
      return res.status(200).json({
        success: true,
        message: "Xóa từ vựng thành công.",
      });
    })
    .catch((err) => {
      return catchError(err, res);
    });
};

export default VocabController;
