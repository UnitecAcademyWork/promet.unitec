import Cookies from "js-cookie";

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
  createdAt: string;
  updatedAt: string;
  cursos: Curso;
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
      // Retorna o erro vindo da API
      const apiError = data as ApiResponseError;
      throw new Error(apiError.message || "Erro ao buscar candidaturas");
    }

    return data as Candidatura[];
  } catch (error: any) {
    console.error("Erro ao buscar candidaturas:", error.message || error);
    throw new Error(error.message || "Erro desconhecido");
  }
};
