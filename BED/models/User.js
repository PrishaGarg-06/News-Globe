const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const bookmarkSchema = new mongoose.Schema({
  articleId: { type: String, required: false },
  title: { type: String, required: false },
  // content: { type: String, required: true },
  url: { type: String, required: true },
});


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: [bookmarkSchema],
  likedArticles: [
    {
      articleId: String,
      url: String,
    },
  ],
});


// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
