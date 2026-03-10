import express from "express";

import {
  register,
  login,
  refresh,
  logout
} from "../controllers/authController.js";

import {
  registerValidator,
  loginValidator,
  validate
} from "../validators/authValidator.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { authLimiter } from "../middleware/rateLimitMiddleware.js";

const router = express.Router();


router.post("/register", authLimiter, registerValidator, validate, register);
router.post("/login", authLimiter, loginValidator, validate, login);
router.get("/refresh", refresh);


router.use(authMiddleware);

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.get(
  "/admin",
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Admin access granted",
      user: req.user
    });
  }
);

router.get(
  "/client",
  roleMiddleware("admin", "client"),
  (req, res) => {
    res.json({
      message: "Dashboard access granted"
    });
  }
);

router.post("/logout", logout);

export default router;
