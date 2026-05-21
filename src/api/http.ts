export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function http<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
    throw new Error("Sesión expirada");
  }

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `HTTP ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const json = await res.json();
  return json.data as T; // 👈 aquí está la clave
}
