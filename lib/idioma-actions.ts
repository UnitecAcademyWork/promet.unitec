"use server";

import { cookies } from "next/headers";
import { routes } from "../config/routes";

export type Idioma = {
  id: number;
  nome: string;
  fluencia: string;
};

export type NovoIdioma = {
  nome: string;
  fluencia: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

const API_URL = routes.backend_url;

// GET - Lista de idiomas do candidato
export async function getIdiomas(): Promise<ApiResponse<Idioma[]>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    const res = await fetch(`${API_URL}/candidatoIdiomas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
    const data: Idioma[] = await res.json();
    return { success: true, data };
  } catch (err: any) {
    console.error("getIdiomas error:", err);
    return { success: false, data: [], error: err.message || "Erro ao carregar idiomas" };
  }
}
// POST - Adicionar idiomas ao usuário (array)
export async function addUserIdiomas(idiomas: { nome: string; fluencia: string }[]): Promise<ApiResponse<Idioma[]>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    const res = await fetch(`${API_URL}/candidatoIdiomas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idiomas }),
    });

    if (!res.ok) 
      throw new Error(`Erro ${res.status}: ${res.statusText}`);
    const data: Idioma[] = await res.json();
    return { success: true, data };
  } catch (err: any) {
    console.error("addUserIdiomas error:", err);
    return { success: false, data: [], error: err.message || "Erro ao adicionar idiomas do usuário" };
  }
}

// DELETE - Remover idioma por id
export async function deleteIdioma(id: number | string): Promise<ApiResponse<Record<string, never>>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    const res = await fetch(`${API_URL}/idiomas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
    return { success: true, data: {} };
  } catch (err: any) {
    console.error("deleteIdioma error:", err);
    return { success: false, data: {}, error: err.message || "Erro ao deletar idioma" };
  }
}
