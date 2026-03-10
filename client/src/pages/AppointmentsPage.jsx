import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AppointmentCard from "../components/AppointmentCard";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import { Link, useNavigate } from "react-router-dom";
import BackIconBar from "../components/BackIconBar";
import { PawIcon } from "../components/icons";

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("pet_name");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading user...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Unauthorized</p>
      </div>
    );
  }

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);


  let result = [...appointments];

  if (search) {
    result = result.filter((appt) =>
      appt.pet_name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  result.sort((a, b) => {
    const fieldA = a[sort];
    const fieldB = b[sort];

    if (fieldA < fieldB) return order === "asc" ? -1 : 1;
    if (fieldA > fieldB) return order === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 space-y-6">
      
       <BackIconBar 
       user={user}
       Link={Link}
       PawIcon={PawIcon}
       />

      <h1 className="text-center text-3xl bg-indigo-800 text-white px-6 py-3.5 rounded-sm mx-auto">
        Pets Medicare
      </h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/appointments/new")}
          className="bg-indigo-800 text-white px-6 py-4 rounded-sm hover:bg-indigo-700 transition w-[99%] sm:w-[70%] md:w-[60%] lg:w-[60%] mx-auto"
        >
          Add Appointment
        </button>
      </div>
      <div className="flex items-center justify-between  border rounded-md w-[99%] sm:w-[50%] md:w-[50%] lg:w-[40%] mx-auto">

        <SearchBar
          search={search}
          setSearch={setSearch} />

        <SortBar
          setSort={setSort}
          setOrder={setOrder}
        />
      </div>

      <div className="space-y-4">
        {result.length > 0 ? (
          result.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              refresh={fetchAppointments}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">No appointments</p>
        )}
      </div>
    </div>
  );
}
