import { useState } from "react";
import { deleteTicket } from "../services/ticketService";
import { useTickets } from "../context/TicketsContext";

export default function TicketTable() {
    
    // Extraemos los datos y la función de recarga directamente del contexto
    const { tickets, loading, refreshTickets } = useTickets();

    // 🔥 ESTE ES EL CHISMOSO: Vamos a ver qué tiene React en memoria
    console.log("TICKETS EN MEMORIA:", tickets);

    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar este ticket?"
        );

        if (!confirmDelete) return;

        try {
            await deleteTicket(id);
            alert("Ticket eliminado");
            // Le decimos al contexto que vuelva a consultar el backend
            await refreshTickets(); 

        } catch (error) {
            console.error(error);
            alert("Error eliminando ticket");
        }
    };

    // 🔥 ESTE ES EL SEGUNDO CHISMOSO: Vamos a ver si los filtros están borrando los datos
    const filteredTickets = tickets.filter((ticket) => {
        const matchStatus =
            statusFilter === "" ||
            ticket.status === statusFilter;

        const matchPriority =
            priorityFilter === "" ||
            ticket.prioridad === priorityFilter;

        return matchStatus && matchPriority;
    });

    console.log("TICKETS DESPUÉS DE FILTRAR:", filteredTickets);

    if (loading) {
        return <p className="p-4 text-slate-600">Cargando tickets...</p>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Listado de Tickets
            </h2>

            {/* FILTROS */}
            <div className="flex gap-4 mb-6 flex-wrap">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todos los estados</option>
                    <option value="ABIERTO">ABIERTO</option>
                    <option value="EN_PROCESO">EN_PROCESO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="RESUELTO">RESUELTO</option>
                    <option value="CERRADO">CERRADO</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todas las prioridades</option>
                    <option value="BAJA">BAJA</option>
                    <option value="MEDIA">MEDIA</option>
                    <option value="ALTA">ALTA</option>
                    <option value="CRITICA">CRITICA</option>
                </select>
            </div>

            {/* TABLA */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-100 text-left">
                            <th className="p-3 font-semibold text-slate-700">Título</th>
                            <th className="p-3 font-semibold text-slate-700">Estado</th>
                            <th className="p-3 font-semibold text-slate-700">Prioridad</th>
                            <th className="p-3 font-semibold text-slate-700">Categoría</th>
                            <th className="p-3 font-semibold text-slate-700">Asignado</th>
                            <th className="p-3 font-semibold text-slate-700">Fecha</th>
                            <th className="p-3 font-semibold text-slate-700">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b hover:bg-slate-50 transition-colors">
                                    <td className="p-3">{ticket.titulo}</td>
                                    <td className="p-3">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{ticket.prioridad}</td>
                                    <td className="p-3">
                                        {ticket.categoriaNombre || "Sin categoría"}
                                    </td>
                                    <td className="p-3">
                                        {ticket.asignadoANombreCompleto || "Sin asignar"}
                                    </td>
                                    <td className="p-3">
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(ticket.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors shadow-sm"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center p-8 text-slate-500">
                                    No hay tickets registrados que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
