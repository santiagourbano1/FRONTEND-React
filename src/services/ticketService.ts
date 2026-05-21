import axios from "axios";

const API_URL = "http://localhost:8080/api/tickets";

// OBTENER TICKETS
export const getTickets = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// CREAR TICKET
export const createTicket = async (dto: {
  titulo: string;
  descripcion: string;
  prioridad: string;
  categoriaId: number;
  status?: string;
}) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    dto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// ELIMINAR TICKET
export const deleteTicket = async (id: number) => {

  const token = localStorage.getItem("token");

  await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};