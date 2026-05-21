export interface Ticket {

    id: number;

    titulo: string;

    descripcion: string;

    status: string;

    prioridad: string;

    categoriaId?: number;
    categoriaNombre?: string;

    creadoPorId?: number;
    creadoPorUsername?: string;

    asignadoAId?: number;
    asignadoAUsername?: string;
    asignadoANombreCompleto?: string;

    createdAt: string;
    updatedAt?: string;
    closedAt?: string;
}