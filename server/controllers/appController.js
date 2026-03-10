 import {
  getAllAppointmentsModel,
  createAppointmentModel,
  getAppointmentsByUserIdModel,
  getAppointmentByIdModel,
  updateAppointmentModel,
  deleteAppointmentModel
} from "../models/appModel.js";


const normalize = (value) =>
  typeof value === "string" ? value.trim() : value;

export const getAppointments = async (req, res) => {
  try {
    const limit = Math.max(1, Number(req.query.limit) || 50);
    const offset = Math.max(0, Number(req.query.offset) || 0);

    let appointments;

    if (req.user.role === "admin") {
      appointments = await getAllAppointmentsModel(limit, offset);
    } else {
      appointments = await getAppointmentsByUserIdModel(
        req.user.id,
        limit,
        offset
      );
    }

    res.json({ data: appointments });

  } catch (err) {
    console.error("Get appointments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAppointmentsByUserId = async (req, res) => {
  try {
    const limit = Math.max(1, Number(req.query.limit) || 50);
    const offset = Math.max(0, Number(req.query.offset) || 0);

    const appointments = await getAppointmentsByUserIdModel(
      req.user.id,
      limit,
      offset
    );

    res.json({ data: appointments });

  } catch (err) {
    console.error("Get user appointments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const createAppointment = async (req, res) => {
  try {
    const { pet_name, owner_name, appointment_date, appointment_time } =
      req.body;

    if (!pet_name || !owner_name || !appointment_date || !appointment_time) {
      return res.status(400).json({
        message:
          "pet_name, owner_name, appointment_date and appointment_time are required"
      });
    }

    const appointment = await createAppointmentModel(req.user.id, {
      pet_name: normalize(pet_name),
      owner_name: normalize(owner_name),
      appointment_date,
      appointment_time,
      notes: normalize(req.body.notes)
    });

    res.status(201).json(appointment);

  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await getAppointmentByIdModel(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    
    if (
      req.user.role !== "admin" &&
      appointment.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(appointment);

  } catch (err) {
    console.error("Get appointment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateAppointment = async (req, res) => {
  try {
    const appointment = await getAppointmentByIdModel(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (
      req.user.role !== "admin" &&
      appointment.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedData = {
      pet_name: normalize(req.body.pet_name ?? appointment.pet_name),
      owner_name: normalize(req.body.owner_name ?? appointment.owner_name),
      appointment_date:
        req.body.appointment_date ?? appointment.appointment_date,
      appointment_time:
        req.body.appointment_time ?? appointment.appointment_time,
      notes: normalize(req.body.notes ?? appointment.notes)
    };

    const updated = await updateAppointmentModel(
      req.params.id,
      appointment.user_id,
      updatedData
    );

    res.json(updated);

  } catch (err) {
    console.error("Update appointment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await getAppointmentByIdModel(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

   
    if (
      req.user.role !== "admin" &&
      appointment.user_id !== req.user.id
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await deleteAppointmentModel(req.params.id, appointment.user_id);

    res.json({ message: "Appointment deleted successfully" });

  } catch (err) {
    console.error("Delete appointment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};