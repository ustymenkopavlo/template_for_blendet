import userModel from "../db/userModel.js";
import { HttpError } from "../helpers/httpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ ...req.body, hashPassword });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw HttpError(409, "Wrong email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw HttpError(409, "Wrong email or password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await userModel.findByIdAndUpdate(user._id, { token });

    res.send(token);
  } catch (error) {
    next(error);
  }
}

export function getUser(req, res) {
  const { email } = req.user;
  res.status(200).json({ message: "Hello " + email });
}
