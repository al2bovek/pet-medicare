import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pet_name: "",
    owner_name: "",
    appointment_date: "",
    appointment_time: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/appointments/${id}`);
        const appt = res.data;

        setForm({
          pet_name: appt.pet_name,
          owner_name: appt.owner_name,
          appointment_date: appt.appointment_date.split("T")[0],
          appointment_time: appt.appointment_time.slice(0, 5),
          notes: appt.notes
        });
      } catch (err) {
        console.error("Failed to load appointment:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.pet_name.trim()) errs.pet_name = "Pet name is required";
    if (!form.owner_name.trim()) errs.owner_name = "Owner name is required";
    if (!form.appointment_date) errs.appointment_date = "Date is required";
    if (!form.appointment_time) errs.appointment_time = "Time is required";
    return errs;
  };

  const submit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await api.put(`/appointments/${id}`, form);
      navigate("/appointments");
    } catch (err) {
      console.error("Failed to update appointment:", err);
      setErrors({ server: "Failed to update appointment" });
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading appointment...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl mb-4">Edit Appointment</h1>

      {errors.server && (
        <p className="text-red-600 text-sm mb-2">{errors.server}</p>
      )}

      <form onSubmit={submit} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            value={form.pet_name}
            onChange={(e) => setForm({ ...form, pet_name: e.target.value })}
            className={`border p-2 w-full ${errors.pet_name ? "border-red-500" : ""}`}
          />
          {errors.pet_name && <p className="text-red-500 text-sm">{errors.pet_name}</p>}
        </div>

        <div>
          <input
            type="text"
            value={form.owner_name}
            onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
            className={`border p-2 w-full ${errors.owner_name ? "border-red-500" : ""}`}
          />
          {errors.owner_name && <p className="text-red-500 text-sm">{errors.owner_name}</p>}
        </div>

        <div>
          <input
            type="date"
            value={form.appointment_date}
            onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
            className={`border p-2 w-full ${errors.appointment_date ? "border-red-500" : ""}`}
          />
          {errors.appointment_date && (
            <p className="text-red-500 text-sm">{errors.appointment_date}</p>
          )}
        </div>

        <div>
          <input
            type="time"
            value={form.appointment_time}
            onChange={(e) => setForm({ ...form, appointment_time: e.target.value })}
            className={`border p-2 w-full ${errors.appointment_time ? "border-red-500" : ""}`}
          />
          {errors.appointment_time && (
            <p className="text-red-500 text-sm">{errors.appointment_time}</p>
          )}
        </div>

        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-white p-2 rounded-md">
          Save Changes
        </button>
      </form>
    </div>
  );
}
