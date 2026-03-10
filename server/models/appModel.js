 import {
  getAllAppointmentsQuery,
  createAppointmentQuery,
  getAppointmentsByUserIdQuery,
  getAppointmentByIdQuery,
  updateAppointmentQuery,
  deleteAppointmentQuery
} from "../queries/appQueries.js";


export const getAllAppointmentsModel = async (limit = 50, offset = 0) => {
  return await getAllAppointmentsQuery(limit, offset);
};


export const createAppointmentModel = async (userId, data) => {
  return await createAppointmentQuery({
    user_id: userId,
    pet_name: data.pet_name,
    owner_name: data.owner_name,
    appointment_date: data.appointment_date,
    appointment_time: data.appointment_time,
    notes: data.notes
  });
};


export const getAppointmentsByUserIdModel = async (
  userId,
  limit = 50,
  offset = 0
) => {
  return await getAppointmentsByUserIdQuery(userId, limit, offset);
};


export const getAppointmentByIdModel = async (id) => {
  return await getAppointmentByIdQuery(id);
};


export const updateAppointmentModel = async (id, userId, updatedData) => {
  return await updateAppointmentQuery({
    id,
    user_id: userId,
    ...updatedData
  });
};


export const deleteAppointmentModel = async (id, userId) => {
  return await deleteAppointmentQuery(id, userId);
};