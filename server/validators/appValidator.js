const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isValidDate = (value) =>
  !isNaN(Date.parse(value));

const isValidTime = (value) =>
  typeof value === "string" && /^\d{2}:\d{2}$/.test(value);


export const validateCreateAppointment = (req, res, next) => {
  const { pet_name, owner_name, appointment_date, appointment_time } = req.body;

  if (!isNonEmptyString(pet_name)) {
    return res.status(400).json({ message: "pet_name is required" });
  }

  if (!isNonEmptyString(owner_name)) {
    return res.status(400).json({ message: "owner_name is required" });
  }

  if (!appointment_date || !isValidDate(appointment_date)) {
    return res.status(400).json({ message: "Valid appointment_date is required" });
  }

  if (!appointment_time || !isValidTime(appointment_time)) {
    return res.status(400).json({ message: "Valid appointment_time is required (HH:MM)" });
  }

  next();
};


export const validateUpdateAppointment = (req, res, next) => {
  const { pet_name, owner_name, appointment_date, appointment_time, notes } = req.body;

  const noFields =
    typeof pet_name === "undefined" &&
    typeof owner_name === "undefined" &&
    typeof appointment_date === "undefined" &&
    typeof appointment_time === "undefined" &&
    typeof notes === "undefined";

  if (noFields) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  if (pet_name !== undefined && !isNonEmptyString(pet_name)) {
    return res.status(400).json({ message: "pet_name cannot be empty" });
  }

  if (owner_name !== undefined && !isNonEmptyString(owner_name)) {
    return res.status(400).json({ message: "owner_name cannot be empty" });
  }

  if (appointment_date !== undefined && !isValidDate(appointment_date)) {
    return res.status(400).json({ message: "appointment_date must be a valid date" });
  }

  if (appointment_time !== undefined && !isValidTime(appointment_time)) {
    return res.status(400).json({ message: "appointment_time must be HH:MM" });
  }

  next();
};
