const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  _id: false,
  id: { type: String, required: true },
  role: { type: String, required: true },
});

const user = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    wallets: [walletSchema.obj],
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  }
);

const User = mongoose.model("user", user);

module.exports = User;
