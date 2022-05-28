import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const VocabSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  mean: {
    type: String,
  },
  image: {
    type: String,
  },
  note: {
    type: String,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  favorite: {
    type: Boolean,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default mongoose.model("Vocab", VocabSchema);
