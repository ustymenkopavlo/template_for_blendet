import { Schema, model } from "mongoose";
import mongooseFindorcreate from 'mongoose-findorcreate';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
userSchema.plugin(mongooseFindorcreate);

export default model("User", userSchema);
