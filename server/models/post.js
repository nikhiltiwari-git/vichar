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

export default mongoose.model("Post", postSchema);
