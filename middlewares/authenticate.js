
export async function authenticate(req, res, next) {
req.user ? next() : res.sendStatus(401)
}
