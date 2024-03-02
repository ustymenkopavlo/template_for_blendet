import User from '../db/userModel.js'
import bcrypt from 'bcrypt'
import HttpError from '../helpers/httpError.js';

export async function authenticate(req, res, next) {
try {
    const header = req.headers.authorization.split(" ")[1];
    const [email, password] = Buffer.from(header, "base64").toString().split(":");
    if (!email || !password) {
        throw HttpError(401, "Wrong email or password")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, "Wrong email or password")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
    throw HttpError(401, "Wrong email or password")
    }
    req.user = user;
    next()
} catch (error) {
    console.log(error);
    next(error)
}
}
