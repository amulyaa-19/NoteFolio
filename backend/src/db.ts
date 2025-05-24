import mongoose, {model, Schema} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI!).catch(() => {
  process.exit(1); // Exit if connection fails
});


const UserSchema = new Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true}
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{type: mongoose.Types.ObjectId, ref: "Tag"}],
  type: String,
  userId: [{type: mongoose.Types.ObjectId, ref: "User", required: true}]
})

const LinkSchema = new Schema({
  hash: String,
  userId: [{type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true}]
})

export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);
