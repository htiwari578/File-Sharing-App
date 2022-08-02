import mongoose from "mongoose";



const fileSchema = mongoose.Schema({
  fileName: {
    type: String,
    requied: true,
  },
  path: {
    type: String,
    requied: true,
  },
  link: {
    type: String,
    requied: true,
  },
  downloadLink: {
    type: String,
    requied: true,
  },
  size: {
    type: String,
    requied: true,
  },
  uuid: {
    type: String,
    requied: true,
  },
  sender: {
    type: String,
    requied: true,
  },
  receiver: {
    type: String,
    requied: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});
const File = mongoose.model("File", fileSchema);
export default File;