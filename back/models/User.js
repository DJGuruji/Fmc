const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Post = require('./Post');  

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "staff", "admin"],
    default: "user",
  },
  photo: { type: String, default: "" },
  state: { type: String, default: "" },
  job: { type: String, default: "" },
  district: { type: String, default: "" },
  office: { type: String, default: "" },
  officePlace: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Middleware to delete associated posts when a user is deleted
UserSchema.pre('remove', async function(next) {
  try {
    await Post.deleteMany({ user: this._id });
    console.log(`Posts deleted for user ${this._id}`);
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("User", UserSchema);
