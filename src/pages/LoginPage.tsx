import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";

import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFormValid = username.trim() !== "" && password.trim() !== "";

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setError(null); 

        try {
            const data = await authApi.login({ username, password });

            login({
                token: data.token,
                id: data.id,
                username: data.username,
                email: data.email,
                nombre: data.nombre,
                apellido: data.apellido,
                role: data.role,
            });

            navigate("/dashboard", { replace: true });
        } catch (err: any) {
            // 1. Log para ver qué llega realmente en la consola del navegador
            console.error("DEBUG LOGIN ERROR:", err);

            // 2. Lógica de respaldo: buscamos el mensaje en varios niveles
            let errorMessage = "Credenciales inválidas. Por favor, verifica tu usuario o contraseña.";

            if (err.response) {
                // Si el servidor respondió con un error (401, 403, 500, etc.)
                errorMessage = err.response.data?.message || err.response.data || errorMessage;
            } else if (err.message) {
                // Si el error fue de red (timeout, CORS, etc.)
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Bienvenido de nuevo</h1>
                    <h2>Iniciar sesión en el sistema de tickets</h2>
                    <p>Ingresa tus credenciales para acceder a tu cuenta</p>
                </div>

                {/* Este div solo se mostrará si 'error' tiene un valor */}
                {error && (
                    <div className="error-message">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Usuario</label>
                        <div className="input-wrapper">
                            <div className="input-icon">
                                <User size={20} />
                            </div>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="tu_usuario"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-wrapper">
                            <div className="input-icon">
                                <Lock size={20} />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="toggle-password"
                                disabled={loading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="btn-primary"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="spinner" />
                                Ingresando...
                            </>
                        ) : (
                            "Ingresar al Dashboard"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}