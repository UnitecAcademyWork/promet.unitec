"use server"
import { cookies } from "next/headers";
import { routes } from "../config/routes";

export type Idioma = {
  id: number;
  nome: string;
  fluencia: string;
};

export type UserIdioma = {
  idiomaId: number;
  nivel: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

const API_URL = routes.backend_url;

// POST idioma do usuário
export async function addUserIdioma(userIdioma: UserIdioma): Promise<ApiResponse<UserIdioma>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    const res = await fetch(`${API_URL}/user-idiomas`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userIdioma),
    });

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);

    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    console.error("addUserIdioma error:", err);
    return { success: false, data: {} as UserIdioma, error: err.message || "Erro ao adicionar idioma do usuário" };
  }
}

// GET todos os idiomas
export async function getIdiomas(): Promise<ApiResponse<Idioma[]>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    const res = await fetch(`${API_URL}/idiomas`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    console.error("getIdiomas error:", err);
    return { success: false, data: [], error: err.message || "Erro ao buscar idiomas" };
  }
}

// ADD ou UPDATE idioma
export async function updateIdioma(idioma: Partial<Idioma> & { id?: number }): Promise<ApiResponse<Idioma>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    const method = idioma.id ? "PUT" : "POST";
    const url = idioma.id ? `${API_URL}/idiomas/${idioma.id}` : `${API_URL}/idiomas`;

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idioma),
    });

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return { success: true, data };
  } catch (err: any) {
    console.error("updateIdioma error:", err);
    return { success: false, data: {} as Idioma, error: err.message || "Erro ao atualizar idioma" };
  }
}

// DELETE idioma
export async function deleteIdioma(id: number | string): Promise<ApiResponse<{}>> {
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
