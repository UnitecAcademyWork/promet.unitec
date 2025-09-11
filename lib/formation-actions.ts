"use server";

import { cookies } from "next/headers";
import { routes } from "../config/routes";

export type Formation = {
  id?: string;
  local: string;
  nome: string;
  descricao?: string;
  duracao: string; // ex: "2 meses"
  dataInicio: string; // formato YYYY-MM-DD
  dataFim?: string;   // formato YYYY-MM-DD
};

const API_URL = routes.backend_url;

// Função para pegar headers com token
async function authHeaders() {
  const token = (await cookies()).get("auth_token")?.value;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// ➕ Adicionar formação
export async function addFormation(data: Formation) {
  try {
    const res = await fetch(routes.adicionarformacao, {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao adicionar formação");

    return await res.json();
  } catch (err) {
    console.error("addFormation error:", err);
    throw err;
  }
}

// 📋 Listar todas formações
export async function getFormations() {
  try {
    const res = await fetch(routes.formacoescandidato, {
      method: "GET",
      headers: await authHeaders(),
    });

    if (!res.ok) throw new Error("Erro ao buscar formações");

    return await res.json();
  } catch (err) {
    console.error("getFormations error:", err);
    throw err;
  }
}

// ✏️ Atualizar formação
export async function updateFormation(id: string, data: Formation) {
  try {
    const res = await fetch(`${API_URL}/actualizar-formacao/${id}`, {
      method: "PUT",
      headers: await authHeaders(),
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao atualizar formação");

    return await res.json();
  } catch (err) {
    console.error("updateFormation error:", err);
    throw err;
  }
}

// ❌ Deletar formação
export async function deleteFormation(id: string) {
  try {
    const res = await fetch(`${API_URL}/formacao/${id}`, {
      method: "DELETE",
      headers: await authHeaders(),
    });

    if (!res.ok) throw new Error("Erro ao deletar formação");

    return { success: true };
  } catch (err) {
    console.error("deleteFormation error:", err);
    throw err;
  }
}
