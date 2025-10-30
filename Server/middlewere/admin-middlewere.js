const adminMiddleware = (req, res, next) => {
  try {
    // console.log(req.user);
    const adminRole = req.user.isAdmin;
    //if not admin then deny access
    if (!req.user || !adminRole) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    //return res.status(200).json({ message: adminRole });
    //if admin then allow access
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { adminMiddleware };