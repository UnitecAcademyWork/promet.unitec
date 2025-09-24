import Cookies from "js-cookie";
export interface Pagamento {
  id: string;
  status: "processando" | "concluido" | "falhado";
  itemNome: "curso" | "teste";
  valor: number;
  comprovativo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candidatura {
  id: string;
  status: string;
  idCandidato: string;
  idEdicao: string;
  idCurso: string;
  createdAt: string;
  updatedAt: string;
  cursos: Curso;
  pagamentos?: Pagamento[]; 
}

export interface ApiResponseError {
  message: string;
}

/**
 * @returns Lista de candidaturas ou erro da API
 */
export const getCandidaturas = async (): Promise<Candidatura[]> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(
      `https://backend-promet.unitec.academy/candidaturas-candidato`,
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
export const deleteCandidatura = async (id: string): Promise<{ success: boolean; message?: string }> => {
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

    const data = await response.json();

    if (!response.ok) {
      const apiError = data as ApiResponseError;
      throw new Error(apiError.message || "Erro ao deletar candidatura");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Erro ao deletar candidatura:", error.message || error);
    return { success: false, message: error.message || "Erro desconhecido" };
  }
};
