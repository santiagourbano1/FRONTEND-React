import axios from "axios";

// ======================
// AXIOS INSTANCE
// ======================
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ======================
// JWT INTERCEPTOR
// ======================
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ======================
// TYPES (opcional pero pro)
// ======================
export type TicketDTO = {
    titulo: string;
    descripcion: string;
    prioridad: string;
    categoriaId: number;
    status?: string;
};

// ======================
// OBTENER TICKETS
// ======================
export const getTickets = async () => {
    const response = await api.get("/tickets");
    return response.data.data;
};

// ======================
// CREAR TICKET
// ======================
export const createTicket = async (dto: TicketDTO) => {
    const response = await api.post("/tickets", dto);
    return response.data;
};

// ======================
// ELIMINAR TICKET
// ======================
export const deleteTicket = async (id: number) => {
    await api.delete(`/tickets/${id}`);
};