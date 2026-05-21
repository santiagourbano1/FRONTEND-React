import axios from "axios";

const API_URL = "http://localhost:8080/api/tickets";

// 🔥 Instancia de Axios
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔐 INTERCEPTOR JWT (MEJOR PRÁCTICA)
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

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
export const createTicket = async (dto: {
    titulo: string;
    descripcion: string;
    prioridad: string;
    categoriaId: number;
    status?: string;
}) => {
    const response = await api.post("/tickets", dto);
    return response.data;
};

// ======================
// ELIMINAR TICKET
// ======================
export const deleteTicket = async (id: number) => {
    await api.delete(`/tickets/${id}`);
};