import { createContext, useContext, useEffect, useState } from "react";
import { getTickets } from "../services/ticketService";

type TicketsContextType = {
    tickets: any[];
    refreshTickets: () => Promise<void>;
    loading: boolean;
};

const TicketsContext = createContext<TicketsContextType | null>(null);

export function TicketsProvider({ children }: { children: React.ReactNode }) {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const refreshTickets = async () => {
        setLoading(true);
        try {
            const data = await getTickets();
            setTickets(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshTickets();
    }, []);

    return (
        <TicketsContext.Provider value={{ tickets, refreshTickets, loading }}>
            {children}
        </TicketsContext.Provider>
    );
}

export function useTickets() {
    const ctx = useContext(TicketsContext);
    if (!ctx) throw new Error("useTickets must be used inside provider");
    return ctx;
}