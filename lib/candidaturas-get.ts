import Cookies from "js-cookie";
import { routes } from "../config/routes";

export interface Curso {
  id: string;
  nome: string;
  preco: number;
  precoTeste: number;
  descricao: string | null;
  imgUrl: string | null;
  desconto: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Candidatura {
  id: string;
  status: string;
  idCandidato: string;
  idEdicao: string;
  idCurso: string;
  idHorario?: string; // Adicionado campo para horário
  createdAt: string;
  updatedAt: string;
  cursos: Curso;
}

export interface ApiResponseError {
  message: string;
}

export interface UpdateCandidaturaResponse {
  success: boolean;
  error?: string;
  data?: Candidatura;
}

/**
 * @returns Lista de candidaturas ou erro da API
 */
export const getCandidaturas = async (): Promise<Candidatura[]> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(routes.candidaturascandidato,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const apiError = data as ApiResponseError;
      throw new Error(apiError.message || "Erro ao buscar candidaturas");
    }

    return data as Candidatura[];
  } catch (error: any) {
    console.error("Erro ao buscar candidaturas:", error.message || error);
    throw new Error(error.message || "Erro desconhecido");
  }
};

/**
 * Deleta uma candidatura pelo ID
 * @param id ID da candidatura a ser deletada
 */
export const deleteCandidatura = async (
  id: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(
      `https://backend-promet.unitec.academy/candidatura/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Se retornar 200, 201 ou 204 -> sucesso
    if ([200, 201, 204].includes(response.status)) {
      return { success: true };
    }

    // Caso contrário, tenta pegar mensagem de erro
    let errorMsg = "Erro ao deletar candidatura";
    try {
      const data = await response.json();
      if (data?.message) errorMsg = data.message;
    } catch {
      // se não for JSON válido, mantém mensagem padrão
    }

    throw new Error(errorMsg);
  } catch (error: any) {
    console.error("Erro ao deletar candidatura:", error.message || error);
    return { success: false, message: error.message || "Erro desconhecido" };
  }
};

/**
 * Atualiza o horário de uma candidatura
 * @param candidaturaId ID da candidatura a ser atualizada
 * @param horarioId ID do horário selecionado
 */
export const updateCandidaturaHorario = async (
  candidaturaId: string,
  horarioId: string
): Promise<UpdateCandidaturaResponse> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await fetch(
      `https://backend-promet.unitec.academy/candidatura/${candidaturaId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idHorario: horarioId
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const apiError = data as ApiResponseError;
      throw new Error(apiError.message || "Erro ao atualizar horário da candidatura");
    }

    return {
      success: true,
      data: data as Candidatura
    };
  } catch (error: any) {
    console.error("Erro ao atualizar horário da candidatura:", error.message || error);
    return {
      success: false,
      error: error.message || "Erro desconhecido ao atualizar horário"
    };
  }
};

/**
 * Busca uma candidatura específica pelo ID
 * @param id ID da candidatura
 */
export const getCandidaturaById = async (
  id: string
): Promise<{ success: boolean; data?: Candidatura; error?: string }> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(
      `https://backend-promet.unitec.academy/candidatura/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const apiError = data as ApiResponseError;
      throw new Error(apiError.message || "Erro ao buscar candidatura");
    }

    return {
      success: true,
      data: data as Candidatura
    };
  } catch (error: any) {
    console.error("Erro ao buscar candidatura:", error.message || error);
    return {
      success: false,
      error: error.message || "Erro desconhecido"
    };
  }
};