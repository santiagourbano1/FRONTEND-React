import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) =>
        location.pathname === path;

    return (

        <div className="w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col gap-3">

            <h2 className="text-xl font-bold mb-4">
                Sistema Tickets
            </h2>

            {/* DASHBOARD */}
            <button
                onClick={() => navigate("/dashboard")}
                className={`p-2 rounded ${
                    isActive("/dashboard")
                        ? "bg-blue-600"
                        : "bg-slate-700"
                }`}
            >
                Dashboard
            </button>

            {/* CREAR TICKET */}
            <button
                onClick={() => navigate("/create-ticket")}
                className={`p-2 rounded ${
                    isActive("/create-ticket")
                        ? "bg-blue-600"
                        : "bg-slate-700"
                }`}
            >
                Crear Ticket
            </button>

        </div>
    );
}