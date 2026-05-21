import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TicketTable from "../components/TicketTable";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css"; // Importamos los nuevos estilos personalizados

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="dashboard-layout">

            {/* SIDEBAR */}
            <Sidebar />

            {/* CONTENIDO PRINCIPAL */}
            <div className="dashboard-main">

                {/* HEADER */}
                <div className="dashboard-header">
                    <div className="user-info">
                        <h1>Sistema de Gestión de Tickets</h1>
                        <p className="welcome-text">
                            Bienvenido: <strong>{user?.nombre} {user?.apellido}</strong>
                        </p>
                        <p className="role-text">
                            <span>Rol:</span> {user?.role}
                        </p>
                    </div>

                    <button onClick={handleLogout} className="btn-logout">
                        Cerrar sesión
                    </button>
                </div>

                {/* CONTENEDOR DE LA TABLA */}
                <div className="table-card">
                    <TicketTable />
                </div>

            </div>
        </div>
    );
}