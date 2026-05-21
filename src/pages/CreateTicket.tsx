import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, FileText, ClipboardList } from "lucide-react";
import axios from "axios";
import "./CreateTicket.css";
import { useTickets } from "../context/TicketsContext"; // 🔥 IMPORTAMOS EL CONTEXTO

export default function CreateTicket() {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement | null>(null);
  
  // 🔥 EXTRAEMOS LA FUNCIÓN PARA RECARGAR LOS TICKETS
  const { refreshTickets } = useTickets();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIA");
  const [status, setStatus] = useState("ABIERTO");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const isFormValid =
    title.trim() !== "" &&
    description.trim() !== "" &&
    categoryId.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !isFormValid) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No hay sesión activa");
        return;
      }

      const payload = {
        titulo: title.trim(),
        descripcion: description.trim(),
        prioridad: priority.toUpperCase(),
        status: status.toUpperCase(),
        categoriaId: Number(categoryId),
      };

      console.log("CREATE TICKET PAYLOAD:", payload);

      const response = await axios.post(
        "http://localhost:8080/api/tickets",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("TICKET CREADO:", response.data);

      setSuccessMessage("Ticket creado correctamente");

      // 🔥 LE DECIMOS AL CONTEXTO QUE ACTUALICE LOS DATOS GLOBALES
      await refreshTickets();

      // Redirigimos al dashboard de manera limpia
      navigate("/dashboard");

    } catch (err: any) {
      console.error("CREATE TICKET ERROR:", err?.response?.data);
      setError(err?.response?.data?.message || "Error interno del servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen page-bg">
      <div className="container">

        {/* HEADER */}
        <header className="hero-card" aria-hidden>
          <div className="hero-overlay" />
          <div className="hero-blur hero-blur-1" />
          <div className="hero-blur hero-blur-2" />
          <div className="hero-content">
            <div className="hero-icon">
              <ClipboardList className="icon-white" />
            </div>
            <div>
              <h1 className="hero-title">Crear Ticket</h1>
              <p className="hero-sub">
                Registra un nuevo incidente o solicitud de soporte técnico en el sistema.
              </p>
            </div>
          </div>
        </header>

        {/* FORM */}
        <main className="card">
          <div className="card-header">
            <h2 className="card-title">Información del Ticket</h2>
            <p className="card-sub">
              Complete los campos para registrar el ticket en la plataforma.
            </p>
          </div>

          <div className="card-body">

            {error && <div className="alert alert-error">{error}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="form" noValidate>

              {/* TITULO */}
              <div className="field">
                <label className="label">Título</label>
                <div className="input-with-icon">
                  <FileText className="input-icon" />
                  <input
                    ref={titleRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ingrese el título"
                    disabled={loading}
                    className="input"
                  />
                </div>
              </div>

              {/* DESCRIPCION */}
              <div className="field">
                <label className="label">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe el problema"
                  disabled={loading}
                  className="textarea"
                />
              </div>

              {/* SELECTS */}
              <div className="grid-2">

                <div className="field">
                  <label className="label">Estado</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={loading}
                    className="select"
                  >
                    <option value="ABIERTO">ABIERTO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="EN_PROCESO">EN PROCESO</option>
                    <option value="RESUELTO">RESUELTO</option>
                    <option value="CERRADO">CERRADO</option>
                  </select>
                </div>

                <div className="field">
                  <label className="label">Prioridad</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    disabled={loading}
                    className="select"
                  >
                    <option value="BAJA">BAJA</option>
                    <option value="MEDIA">MEDIA</option>
                    <option value="ALTA">ALTA</option>
                    <option value="CRITICA">CRITICA</option>
                  </select>
                </div>
              </div>

              {/* CATEGORIA */}
              <div className="field">
                <label className="label">Categoría</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={loading}
                  className="select"
                >
                  <option value="">Seleccione categoría</option>
                  <option value="1">Hardware</option>
                  <option value="2">Software</option>
                  <option value="3">Red</option>
                  <option value="4">Seguridad</option>
                  <option value="5">Mantenimiento</option>
                  <option value="6">Otros</option>
                </select>
              </div>

              {/* BOTONES */}
              <div className="actions">

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  disabled={loading}
                  className="btn btn-back"
                >
                  <ArrowLeft className="btn-icon" />
                  Atrás
                </button>

                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="btn btn-primary"
                >
                  <PlusCircle className="btn-icon" />
                  {loading ? "Guardando..." : "Crear Ticket"}
                </button>

              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
}