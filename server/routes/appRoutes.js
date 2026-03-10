 import express from "express";
import {
  getAppointments,
  getAppointmentsByUserId,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from "../controllers/appController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import {
  validateCreateAppointment,
  validateUpdateAppointment
} from "../validators/appValidator.js";

const router = express.Router();

router.use(authMiddleware);


router.get("/", getAppointments);


router.get("/me", getAppointmentsByUserId);


router.get("/:id", getAppointmentById);


router.post("/", validateCreateAppointment, createAppointment);


router.put("/:id", validateUpdateAppointment, updateAppointment);


router.delete("/:id", deleteAppointment);

export default router;