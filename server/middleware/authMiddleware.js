import jwt from "jsonwebtoken";
import { findUserById } from "../queries/userQueries.js";

const authMiddleware = async (req, res, next) => {
  try {
    if (req.originalUrl.includes("/auth/refresh")) {
      return next();
    }

    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const [scheme, token] = header.split(" ");
    if (!token || scheme.toLowerCase() !== "bearer") {
      return res.status(401).json({ message: "Invalid authorization format" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    const user = await findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.id = Number(user.id);
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
