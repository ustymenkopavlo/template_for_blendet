import userModel from "../db/userModel.js";
import bcrypt from "bcrypt";
import { HttpError } from "../helpers/httpError.js";
import jwt from "jsonwebtoken";

export async function baseAuthenticate(req, res, next) {
  try {
    const header = req.headers.authorization.split(" ")[1];
    const [email, password] = Buffer.from(header, "base64")
      .toString()
      .split(":");
    if (!email || !password) {
      throw HttpError(401, "Bad request");
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw HttpError(401, "Wrong email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw HttpError(401, "Wrong email or password");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = verify;
    const user = await userModel.findById(id);
    if (!user || token !== user.token) {
      throw new Error("Not authorization");
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
