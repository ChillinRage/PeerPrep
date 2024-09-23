import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const DEFAULT_IMAGE_URL = 'https://storage.cloud.google.com/peerprep_userimages/default.jpg';

const UserModelSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
    default: DEFAULT_IMAGE_URL,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Setting default to the current date/time
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("UserModel", UserModelSchema);
