import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  getCurrentUser,
  getAllUsers
} from "../controllers/userController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getCurrentUser);

router.get("/", roleMiddleware("admin"), getAllUsers);

export default router;
