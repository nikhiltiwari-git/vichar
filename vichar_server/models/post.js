import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  creator: String,
  name: String,
  message: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: []},
  comments: { type: [String], default: []},
  createdAt: { type: Date, default: new Date() }
  
});

var Post = mongoose.model("Post", postSchema);

export default Post;
