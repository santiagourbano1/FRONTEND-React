import { http } from "./http";

export type LoginDto = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  type: string;

  id: number;

  username: string;
  email: string;

  nombre: string;
  apellido: string;

  role: string;
};

export const authApi = {

  login: (dto: LoginDto) =>
    http<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
    }),

};