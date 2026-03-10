import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { PawIcon } from "../components/icons";
import PawIconBar from "../components/PawIconsBar";
export default function NewAppointment() {
  const [form, setForm] = useState({
    pet_name: "",
    owner_name: "",
    appointment_date: "",
    appointment_time: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      await api.post("/appointments", form);
      navigate("/appointments");
    } catch (err) {
      console.error("Failed to create appointment:", err);
      setErrors({ server: "Failed to create appointment" });
    }
  };

  return (
    <div className="max-w-l mx-auto p-6">
      <div className="mb-4">
        <Link
          to="/appointments"
          className="flex items-center gap-3 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-amber-700 font-semibold transition shadow-md w-max"
        >
          <PawIconBar
            PawIcon={PawIcon}
          />
        </Link>
      </div>

      <h1 className="text-center text-3xl bg-indigo-800 text-white px-6 py-3.5 rounded-sm transition mx-auto mb-6">
        Pets Medicare
      </h1>
      <div
        className="bg-indigo-800 text-white px-6 py-4 rounded-sm  transition mx-auto w-[60%] text-center"
      >
        Add Appointment
      </div>

      <form
        onSubmit={submit}
        className="w-[60%] mx-auto  border rounded-sm p-6 flex flex-col gap-5"
      >
        <div className="grid grid-cols-[150px_1fr] items-center gap-4">
          <label className="text-gray-700">Pet Name</label>

          <div>
            <input
              type="text"
              placeholder="Pet's Name"
              className={`border rounded-md p-2 w-full ${errors.pet_name ? "border-red-500" : ""
                }`}
              onChange={(e) => setForm({ ...form, pet_name: e.target.value })}
            />
            {errors.pet_name && (
              <p className="text-red-500 text-sm">{errors.pet_name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[150px_1fr] items-center gap-4">
          <label className="text-gray-700">Pet Owner</label>

          <div>
            <input
              type="text"
              placeholder="Owner's Name"
              className={`border rounded-md p-2 w-full ${errors.owner_name ? "border-red-500" : ""
                }`}
              onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
            />
            {errors.owner_name && (
              <p className="text-red-500 text-sm">{errors.owner_name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[150px_1fr_80px_1fr] items-center gap-4">
          <label className="text-gray-700">Date</label>

          <div>
            <input
              type="date"
              className={`border rounded-md p-2 w-full ${errors.appointment_date ? "border-red-500" : ""
                }`}
              onChange={(e) =>
                setForm({ ...form, appointment_date: e.target.value })
              }
            />
          </div>

          <label className="text-gray-700">Time</label>

          <div>
            <input
              type="time"
              className={`border rounded-md p-2 w-full ${errors.appointment_time ? "border-red-500" : ""
                }`}
              onChange={(e) =>
                setForm({ ...form, appointment_time: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-[150px_1fr] items-start gap-4">
          <label className="text-gray-700">Apt. Notes</label>

          <textarea
            placeholder="Appointment Notes"
            className="border rounded-md p-3 w-full h-28 resize-none"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <button className="bg-indigo-800 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition">
            Add Appointment
          </button>
        </div>
      </form>

    </div>

  );
}
