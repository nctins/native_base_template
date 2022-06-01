import mongoose from "mongoose";
import UserModal from "../models/Users.model";

const catchError = (err, res) => {
  console.log(err);
  return res.status(500).json({
    success: false,
    message: "Server error. Please try again.",
    error: err,
  });
};

const UserController = {};

UserController.getUser = async (req, res) => {
  try {
    const user = await UserModal.findOne({
      _id: mongoose.Types.ObjectId(req.JWTDecode.userId),
    })
      .select("username email");
    return res.status(200).json({
      success: true,
      data: { user: user },
    });
  } catch (error) {
    return catchError(error, res);
  }
};
export default UserController;
