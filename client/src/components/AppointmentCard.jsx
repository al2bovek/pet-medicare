import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "./icons";

export default function AppointmentCard({ appt, refresh }) {
  const navigate = useNavigate();

  const deleteAppointment = async () => {
    try {
      await api.delete(`/appointments/${appt.id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const formattedDate = new Date(appt.appointment_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

  const formattedTime = appt.appointment_time.slice(0, 5);

  return (
    <div className="m-auto w-[99%] lg:w-[60%] sm:w-[90%] border-b px-4 py-3 flex items-start justify-between">

      <div className="flex items-start gap-3">

        <button
          onClick={deleteAppointment}
          className="w-8 h-8 flex items-center justify-center border rounded text-gray-600 hover:bg-gray-200 text-sm"
        >
          <DeleteIcon />
        </button>

        <div className="[&>p]:text-xl">
          <h2 className="font-semibold text-2xl text-purple-800 ">
            {appt.pet_name}
          </h2>

          <p className="text-gray-600">
            <span className="text-gray-500">Owner:</span> {appt.owner_name}
          </p>

          <p className="text-gray-700">
            {appt.notes}
          </p>
        </div>

      </div>

      <div className="text-gray-900 italic">
        {formattedDate} {formattedTime}
      </div>
    </div>
  );
}
