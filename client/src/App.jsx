import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard"; 
import AdminDashboard from "./pages/AdminDashboard"; 
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AppointmentsPage from "./pages/AppointmentsPage";
import NewAppointment from "./pages/NewAppointmentPage";
import EditAppointment from "./pages/EditAppointment";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route
                    path="/client"
                    element={
                        <ProtectedRoute>
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route element={<ProtectedRoute />}>
                    <Route path="/appointments" element={<AppointmentsPage />} />
                    <Route path="/appointments/new" element={<NewAppointment />} />
                    <Route path="/appointments/:id/edit" element={<EditAppointment />} />
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}