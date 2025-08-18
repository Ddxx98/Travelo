import { verifyJwt } from "../utils/jwt.js"

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = verifyJwt(token);
    return res.status(200).json({ message: "Token verified", user: decoded });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

export default { verifyToken };