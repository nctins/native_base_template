import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const TopicSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  size: {
    type: Number,
  },
});

TopicSchema.index({ title: 'text' });

export default mongoose.model("Topic", TopicSchema);
