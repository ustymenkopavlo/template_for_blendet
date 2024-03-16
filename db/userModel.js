import { Schema, model } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

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
);
userSchema.plugin(findOrCreate);
export default model('User', userSchema);
