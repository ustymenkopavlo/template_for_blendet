export const authenticate = async (req, res, next) => {
  req.user ? next() : res.status(401).send('unauthorized');
};
