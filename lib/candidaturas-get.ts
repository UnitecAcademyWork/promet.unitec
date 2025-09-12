import Cookies from "js-cookie";

export interface Candidatura {
  id: string;
  status: string;
  idCandidato: string;
  idEdicao: string;
  idCurso: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * @returns Lista de candidaturas
 */
export const getCandidaturas = async (): Promise<Candidatura[]> => {
  try {
    const token = Cookies.get("auth_token");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch(
      `https://backend-promet.unitec.academy/candidaturas-candidato`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar candidaturas");
    }

    const data: Candidatura[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
