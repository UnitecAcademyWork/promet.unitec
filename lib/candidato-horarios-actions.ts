"use server";

import { cookies } from "next/headers";

const API_URL = "https://backend-promet.unitec.academy/horario";

export type Horario = {
  id: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  descricao?: string;
};

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

// 🔹 Criar novo horário (admin ou gestor)
export async function createHorario(horarioData: Partial<Horario>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(horarioData),
    });
    const data = await res.json();
    return { success: res.ok, ...data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// 🔹 Escolher um horário (candidato)
// 🔹 Escolher um horário (candidato)
export async function chooseHorario(idHorario: string, idCandidatura: string): Promise<ApiResponse> {
  try {
  const token = (await cookies()).get("auth_token")?.value;
    if (!token) return { success: false, message: "Token não encontrado" };

    const res = await fetch(`${API_URL}/choose`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idHorario, idCandidatura }),
    });

    const data = await res.json();
    return { success: res.ok, ...data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


// 🔹 Listar horários de um candidato autenticado
export async function getHorariosCandidato(): Promise<ApiResponse<{ horario: Horario[] }>> {
  try {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return { success: false, message: "Token não encontrado" };

    const res = await fetch(`${API_URL}/candidato`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return { success: res.ok, data }; // data: { horario: [...] }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// 🔹 Listar todos os horários
export async function listHorarios(): Promise<ApiResponse<Horario[]>> {
  try {
    const res = await fetch(`${API_URL}`);
    const data = await res.json();
    return { success: res.ok, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// 🔹 Obter um horário específico
export async function getHorario(id: string): Promise<ApiResponse<Horario>> {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { success: res.ok, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// 🔹 Atualizar um horário
export async function updateHorario(id: string, horarioData: Partial<Horario>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(horarioData),
    });
    const data = await res.json();
    return { success: res.ok, ...data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// 🔹 Excluir um horário
export async function deleteHorario(id: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const data = await res.json();
    return { success: res.ok, ...data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
