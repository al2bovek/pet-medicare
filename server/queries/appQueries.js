import sql from "../dbConnection.js";


const appointmentColumns = sql`
  id,
  user_id,
  pet_name,
  owner_name,
  appointment_date,
  appointment_time,
  notes
`;


const normalize = (value) =>
  typeof value === "string" ? value.trim() : value;


export const getAllAppointmentsQuery = async (limit = 50, offset = 0) => {
  limit = Math.min(limit, 100);

  return await sql`
    SELECT ${appointmentColumns}
    FROM appointments
    ORDER BY appointment_date ASC, appointment_time ASC
    LIMIT ${limit} OFFSET ${offset}
  `;
};

export const createAppointmentQuery = async ({
  user_id,
  pet_name,
  owner_name,
  appointment_date,
  appointment_time,
  notes
}) => {
  const result = await sql`
    INSERT INTO appointments (
      user_id,
      pet_name,
      owner_name,
      appointment_date,
      appointment_time,
      notes
    )
    VALUES (
      ${user_id},
      ${normalize(pet_name)},
      ${normalize(owner_name)},
      ${appointment_date},
      ${appointment_time},
      ${normalize(notes)}
    )
    RETURNING ${appointmentColumns}
  `;

  return result[0];
};


export const getAppointmentsByUserIdQuery = async (
  userId,
  limit = 50,
  offset = 0
) => {
  limit = Math.min(limit, 100);

  return await sql`
    SELECT ${appointmentColumns}
    FROM appointments
    WHERE user_id = ${userId}
    ORDER BY appointment_date ASC, appointment_time ASC
    LIMIT ${limit} OFFSET ${offset}
  `;
};


export const getAppointmentByIdQuery = async (id) => {
  const result = await sql`
    SELECT ${appointmentColumns}
    FROM appointments
    WHERE id = ${id}
  `;

  return result[0] || null;
};


export const updateAppointmentQuery = async (fields) => {
  const { id, user_id, ...updates } = fields;

  if (Object.keys(updates).length === 0) {
    throw new Error("No fields to update");
  }

  const normalizedUpdates = Object.fromEntries(
    Object.entries(updates).map(([key, value]) => [key, normalize(value)])
  );

  const result = await sql`
    UPDATE appointments
    SET ${sql(normalizedUpdates)}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING ${appointmentColumns}
  `;

  return result[0] || null;
};


export const deleteAppointmentQuery = async (id, userId) => {
  const result = await sql`
    DELETE FROM appointments
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `;

  return result[0] || null;
};