import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const menuItemClass = (active: boolean) =>
        `p-2 rounded transition-colors duration-200 ${
            active ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
        }`;

    return (
        <div className="w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col gap-3">

            <h2 className="text-xl font-bold mb-6">
                Sistema Tickets
            </h2>

            {/* DASHBOARD */}
            <button
                onClick={() => navigate("/dashboard")}
                className={menuItemClass(isActive("/dashboard"))}
            >
                Dashboard
            </button>

            {/* CREAR TICKET */}
            <button
                onClick={() => navigate("/create-ticket")}
                className={menuItemClass(isActive("/create-ticket"))}
            >
                Crear Ticket
            </button>

        </div>
    );
}