// routes.horarios.ts

import { routes } from "../config/routes";

export interface Horario {
  id: string;
  periodo: string;
  hora_inicio: string;
  hora_fim: string;
  createdAt: string;
  updatedAt: string;
}

// READ: Listar todos os horários
export async function getHorarios(): Promise<Horario[] | null> {
  try {
    const response = await fetch(routes.horario, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar horários");
    }

    const data: Horario[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao carregar horários:", error);
    return null;
  }
}

// CREATE: Adicionar um novo horário
export async function createHorario(newHorario: Omit<Horario, "id" | "createdAt" | "updatedAt">): Promise<Horario | null> {
  try {
    const response = await fetch(routes.horarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHorario),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar horário");
    }

    const data: Horario = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao criar horário:", error);
    return null;
  }
}

// UPDATE: Atualizar um horário existente
export async function updateHorario(id: string, updatedHorario: Partial<Omit<Horario, "id" | "createdAt" | "updatedAt">>): Promise<Horario | null> {
  try {
    const response = await fetch(`${routes.horarios}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHorario),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar horário");
    }

    const data: Horario = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar horário:", error);
    return null;
  }
}

// DELETE: Remover um horário
export async function deleteHorario(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${routes.horarios}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar horário");
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar horário:", error);
    return false;
  }
}
