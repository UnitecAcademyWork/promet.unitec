"use server";

import { routes } from "../config/routes";

export async function registerUser(userData: {
  nome: string;
  apelido: string;
  email: string;
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(routes.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erro ao registrar usuário");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no registerUser:", error);
    throw error;
  }
}
